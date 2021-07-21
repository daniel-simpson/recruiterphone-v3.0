import "@twilio-labs/serverless-runtime-types";

import { CallHandler } from "../lib/twilio";

// V1: take voicemail if function is running, redirect to main phone (no need for two phones) if not
export const handler: CallHandler = function (context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();

  // Ask for voicemail input
  twiml.say(
    context.VOICEMAIL_MESSAGE ||
      "Please leave a message stating your name and number after the beep"
  );

  // Record voicemail + provide callback fn for notifying
  twiml.record({
    maxLength: 20,
    transcribeCallback: "/voicemailNotify",
  });

  // Hangup
  twiml.hangup();

  callback(null, twiml);
};
