import "@twilio-labs/serverless-runtime-types";

import { TextMessageHandler } from "../lib/twilio";
import { getContactName } from "../lib/airtable";

export const handler: TextMessageHandler = async function (context, event, callback) {
  if (
    !event ||
    !event.From ||
    event.From.length == 0 ||
    !event.Body ||
    event.Body.length == 0
  ) {
    callback("Missing arguments");
    return;
  }

  const contactName = await getContactName(context, event.From);

  const message = `From ${contactName}: ${event.Body}`

  const tmiwl = new Twilio.twiml.MessagingResponse();

  tmiwl.message({
    to: context.CLIENT_PHONE,
  }, message);

  callback(null, tmiwl);
};
