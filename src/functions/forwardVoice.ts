import "@twilio-labs/serverless-runtime-types";

import { CallHandler, SendTextMessage } from "../lib/twilio";
import { getContactName } from "../lib/airtable";

export const handler: CallHandler = async function (context, event, callback) {

  const contactName = await getContactName(context, event.From);

  if(contactName !== event.From) {
    await SendTextMessage(context, {
      to: context.CLIENT_PHONE.replace("+",""),
      body: `New incoming call from ${contactName}`,
    })
  }

  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.dial(context.CLIENT_PHONE);

  callback(null, twiml);
};
