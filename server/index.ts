import express from 'express';
import dotenv from 'dotenv';
import twilio from 'twilio';
import cors from 'cors';
import { checkJwt } from './middleware/auth';
import * as firebase from './firebase';
import type { Request, Response } from 'express';

// Load environment variables first
dotenv.config();

const {
  PORT = 3000,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  AUTH0_ISSUER_BASE_URL,
  VITE_AUTH0_AUDIENCE
} = process.env;

// Validate required environment variables
const requiredEnvVars = {
  AUTH0_ISSUER_BASE_URL,
  VITE_AUTH0_AUDIENCE
};

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Twilio client if credentials are available
const twilioClient = TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN
  ? twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  : null;

// Health check endpoint
app.get('/health', (_, res) => res.send('OK'));

// Protected routes
app.use('/api/nags', checkJwt);
app.use('/api/user', checkJwt);
app.use('/api/sms', checkJwt);

// User routes
app.get('/api/user', async (req: Request, res: Response) => {
  try {
    const auth0Id = req.auth?.payload.sub;
    if (!auth0Id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await firebase.getUser(auth0Id);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/api/user', async (req: Request, res: Response) => {
  try {
    const auth0Id = req.auth?.payload.sub;
    if (!auth0Id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { email, phoneNumber, timezone, smsOptIn } = req.body;
    const user = await firebase.updateUser(auth0Id, {
      email,
      phoneNumber,
      timezone,
      smsOptIn
    });

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Nag routes
app.get('/api/nags', async (req: Request, res: Response) => {
  try {
    const auth0Id = req.auth?.payload.sub;
    if (!auth0Id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const nags = await firebase.getNags(auth0Id);
    res.json(nags);
  } catch (error) {
    console.error('Error fetching nags:', error);
    res.status(500).json({ error: 'Failed to fetch nags' });
  }
});

app.post('/api/nags', async (req: Request, res: Response) => {
  try {
    const auth0Id = req.auth?.payload.sub;
    if (!auth0Id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const nagData = { ...req.body, userId: auth0Id };
    const nag = await firebase.createNag(nagData);
    res.json(nag);
  } catch (error) {
    console.error('Error creating nag:', error);
    res.status(500).json({ error: 'Failed to create nag' });
  }
});

// SMS routes
app.post('/api/sms/send', async (req: Request, res: Response) => {
  if (!twilioClient || !TWILIO_PHONE_NUMBER) {
    return res.status(503).json({
      success: false,
      error: 'SMS service not configured'
    });
  }

  try {
    const { to, message, nagId, requireFollowUp } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        success: false,
        error: 'Phone number and message are required'
      });
    }

    const twilioMessage = await twilioClient.messages.create({
      body: message,
      to,
      from: TWILIO_PHONE_NUMBER,
      statusCallback: '/api/sms/status'
    });

    res.json({
      success: true,
      messageId: twilioMessage.sid,
      nagId,
      requireFollowUp,
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send SMS'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});