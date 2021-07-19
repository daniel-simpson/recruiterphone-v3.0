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
