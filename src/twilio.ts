import {
  ServerlessFunctionSignature,
  Context,
} from "@twilio-labs/serverless-runtime-types/types";

export type EnvironmentVariables = {
  CLIENT_PHONE: string;
  TWILIO_PHONE: string;
  VOICEMAIL_MESSAGE: string;
};

export type CallEvent = {
  Direction: "inbound" | "outbound" | string;
  From: string;
  To: string;
};

export type CallHandler = ServerlessFunctionSignature<
  EnvironmentVariables,
  CallEvent
>;

export type VoicemailEvent = {
  From: string;
  TranscriptionStatus: "completed" | "failed";
  TranscriptionText: string;
  RecordingUrl: string;
};

export type VoicemailHandler = ServerlessFunctionSignature<
  EnvironmentVariables,
  VoicemailEvent
>;

export type TextMessageEvent = {
  From: string;
  Body: string;
};

export type TextMessageHandler = ServerlessFunctionSignature<
  EnvironmentVariables,
  TextMessageEvent
>;

export function GetFromPhoneNumber(
  context: EnvironmentVariables,
  event: { From: string }
) {
  if (event.From && event.From.length > 0) {
    return event.From;
  }

  return context.TWILIO_PHONE;
}

export function SendTextMessage(
  context: Context<EnvironmentVariables>,
  event: { From: string },
  message: string
) {
  const from = GetFromPhoneNumber(context, event);

  context
    .getTwilioClient()
    .messages.create({
      from,
      to: context.CLIENT_PHONE,
      body: message,
    })
    .catch((ex) => console.error(ex));
}
