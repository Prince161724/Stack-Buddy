import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.js";

const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<h1>${body}</h1>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "This is the text format email",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

const run = async (subject, body, toEmailId) => {
  const sendEmailCommand = createSendEmailCommand(
    toEmailId,
    "support@stackbuddy.projectwork.tech",
    subject,
    body
  );

  try {
    const result = await sesClient.send(sendEmailCommand);
    return {
      success: true,
      messageId: result.MessageId,
      requestId: result.$metadata.requestId,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
export { run };
