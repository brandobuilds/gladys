import { toast } from 'react-hot-toast';

interface SMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendSMS(
  to: string,
  message: string,
  nagId: string,
  requireFollowUp: boolean
): Promise<SMSResponse> {
  try {
    const response = await fetch('/api/sms/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAuthToken()}`
      },
      body: JSON.stringify({
        to,
        message,
        nagId,
        requireFollowUp,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send SMS');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to send SMS');
    }

    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    console.error('Error sending SMS:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send SMS';
    toast.error(errorMessage);
    return { 
      success: false,
      error: errorMessage
    };
  }
}

async function getAuthToken(): Promise<string> {
  // Get the current user's auth token
  const auth = (await import('firebase/auth')).getAuth();
  const token = await auth.currentUser?.getIdToken();
  if (!token) {
    throw new Error('Not authenticated');
  }
  return token;
}