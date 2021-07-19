import "@twilio-labs/serverless-runtime-types";

import { TextMessageHandler } from "../twilio";

export const handler: TextMessageHandler = function (context, event, callback) {
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

  const tmiwl = new Twilio.twiml.MessagingResponse();

  const from = event.From && event.From.length > 0 ? event.From : context.TWILIO_PHONE;
  
  tmiwl.message({
    to: context.CLIENT_PHONE,
  }, `FWD ${event.From}: ${event.Body}`);

  // TODO V2: Log this message to Airtable

  callback(null, tmiwl);
};
