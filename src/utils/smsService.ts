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
    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { 
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send SMS'
    };
  }
}