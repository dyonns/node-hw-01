const logger = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await logger.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await logger.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await logger.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await logger.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
