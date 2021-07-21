import { Context } from "@twilio-labs/serverless-runtime-types/types";
import { EnvironmentVariables } from "./twilio";

import Airtable from "airtable";

export type Contact = {
  Name: string;
  Phone: string;
  Email: string;
}

export type Communication = {
  Date: string;
  Direction: "Incoming" | "Outgoing";
  Type: "SMS" | "Email" | "Phone";
  Outline: string;
  Phone: string;
  //Contact: Record<string, Contact>
}

export const getContactsByPhone = async (context: Context<EnvironmentVariables>, phone : string) => {
  const contacts = await Airtable.base(context.AIRTABLE_BASE_ID)<Contact>(context.AIRTABLE_CONTACTS_TABLE_NAME)
    .select({ filterByFormula: `{${context.AIRTABLE_CONTACTS_PHONE_FIELD_NAME}} = '${phone}'` })
    .all()

  return contacts;
}

export const getContactName = async (context: Context<EnvironmentVariables>, phone: string) => {
  const contacts = await getContactsByPhone(context, phone);

  return contacts.length > 0
    ? `${contacts.map(x => x.fields.Name).join()} (${phone})`
    : phone;
}

export const getCommunication = async (context: Context<EnvironmentVariables>, phone: string) => {
  const comms = await Airtable
    .base(context.AIRTABLE_BASE_ID)
    <Communication>
    (context.AIRTABLE_CONTACTS_TABLE_NAME)
    .select({ filterByFormula: `{${/* TODO: rename this */ context.AIRTABLE_CONTACTS_PHONE_FIELD_NAME}} = '${phone}'` })
    .all();

  return comms;
}

export const addCommunication = async (context: Context<EnvironmentVariables>, x: Communication[]) => {
  var records = await Airtable
    .base(context.AIRTABLE_BASE_ID)
    <Communication>
    (context.AIRTABLE_CONTACTS_TABLE_NAME)
    .create(x)

  return records;
}