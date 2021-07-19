import "@twilio-labs/serverless-runtime-types";
import { VoicemailHandler, SendTextMessage } from "../twilio";

export const handler: VoicemailHandler = function (context, event, callback) {
  if (
    !event ||
    !event.From ||
    event.From.length == 0 ||
    !event.RecordingUrl ||
    event.RecordingUrl.length == 0
  ) {
    callback("Missing arguments");
    return;
  }

  let message;
  if (event.TranscriptionStatus == "completed") {
    message = `Voicemail from ${event.From}: "${event.TranscriptionText}". ${event.RecordingUrl}`;
  } else {
    message = `New voicemail from ${event.From}: ${event.RecordingUrl}`;
  }

  // TODO V2: Log this voicemail message to Airtable

  SendTextMessage(context, event, message);
  callback(null, "OK");
};
