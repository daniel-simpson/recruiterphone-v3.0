import "@twilio-labs/serverless-runtime-types";

import { CallHandler } from "../lib/twilio";

export const handler: CallHandler = async function (context, event, callback) {

  const from = event.From && event.From.length > 0 ? event.From : context.TWILIO_PHONE;
  if(from !== context.TWILIO_PHONE) {
    // TODO: v3: add caller ID to incoming calls

    await context
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
