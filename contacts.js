const fs = require("fs").promises;
const path = require("path");
// const nId = require("nanoid");
const shortid = require("shortid");
const id = shortid.generate();

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  return contacts.find((contact) => contact.id == contactId) || null;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = { id, name, email, phone };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const deleteByIndex = contacts.findIndex(
    (contact) => contact.id == contactId
  );

  const deleteContact = contacts.splice(deleteByIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));

  return deleteContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
