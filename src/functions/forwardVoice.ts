import "@twilio-labs/serverless-runtime-types";

import { CallHandler, GetFromPhoneNumber, SendTextMessage } from "../twilio";

export const handler: CallHandler = function (context, event, callback) {

  const from = GetFromPhoneNumber(context, event);
  if(from !== context.TWILIO_PHONE) {
    // TODO: v3: add caller ID to incoming calls
    SendTextMessage(context, event, `New incoming call from ${from}`)
  }

  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.dial(context.CLIENT_PHONE);

  callback(null, twiml);
};
