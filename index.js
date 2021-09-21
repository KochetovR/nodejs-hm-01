const { Command } = require('commander');
const chalk = require('chalk')
const {listContacts, getContactById, removeContact, addContact} = require('./contacts')
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        listContacts().then(contacts => console.table(contacts)).catch(console.error)
      break;

    case 'get':
      // ... id
      break;

    case 'add':
        addContact(name, email, phone).then(contact => {
            
            console.log(contact)}).catch(console.error)
      break;

    case 'remove':
      // ... id
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);


// const argv = require('yargs').argv;

// // TODO: рефакторить
// function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case 'list':
//       // ...
//       break;

//     case 'get':
//       // ... id
//       break;

//     case 'add':
//       // ... name email phone
//       break;

//     case 'remove':
//       // ... id
//       break;

//     default:
//       console.warn('\x1B[31m Unknown action type!');
//   }
// }

// invokeAction(argv);