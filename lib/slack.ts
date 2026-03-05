// lib/slack.ts
export async function sendSlackNotification(email: string, name: string | null, userType: string, position: number) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log('Slack webhook not configured');
    return;
  }

  const message = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🎉 New Waitlist Signup!",
          emoji: true
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Email:*\n${email}`
          },
          {
            type: "mrkdwn",
            text: `*Name:*\n${name || 'Not provided'}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Type:*\n${userType}`
          },
          {
            type: "mrkdwn",
            text: `*Position:*\n#${position}`
          }
        ]
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Total signups: ${position}`
          }
        ]
      }
    ]
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
  } catch (error) {
    console.error('Failed to send Slack notification:', error);
  }
}