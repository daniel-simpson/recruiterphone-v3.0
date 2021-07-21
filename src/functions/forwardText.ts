import "@twilio-labs/serverless-runtime-types";
import Airtable from "airtable";

import { TextMessageHandler } from "../lib/twilio";

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

  const contacts = await Airtable.base(context.AIRTABLE_BASE_ID)
    (context.AIRTABLE_CONTACTS_TABLE_NAME)
    .select({ filterByFormula: `{${context.AIRTABLE_CONTACTS_PHONE_FIELD_NAME}} = '${event.From}'` })
    .all()

  console.log("Contacts", contacts);

  const from = contacts.length > 0 ? `${contacts.map(x => x.fields.Name).join()} (${event.From})` : event.From;
  const message = `From ${from}: ${event.Body}`

  const tmiwl = new Twilio.twiml.MessagingResponse();

  tmiwl.message({
    to: context.CLIENT_PHONE,
  }, message);

  callback(null, tmiwl);
};
