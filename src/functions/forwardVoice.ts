import "@twilio-labs/serverless-runtime-types";

import { CallHandler } from "../twilio";

export const handler: CallHandler = function (context, event, callback) {

  const from = event.From && event.From.length > 0 ? event.From : context.TWILIO_PHONE;
  if(from !== context.TWILIO_PHONE) {
    // TODO: v3: add caller ID to incoming calls

    const from = event.From && event.From.length > 0 ? event.From : context.TWILIO_PHONE;

    context
      .getTwilioClient()
      .messages.create({
        from,
        to: context.CLIENT_PHONE,
        body: `New incoming call from ${from}`,
      })
      .catch((ex) => console.error(ex));
  }

  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.dial(context.CLIENT_PHONE);

  callback(null, twiml);
};
