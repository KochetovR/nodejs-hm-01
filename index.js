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
      getContactById(id).then(contact => {
        if(contact.length > 0) {
          console.log(chalk.blue('Contact found'))
          console.log(contact)
        } else {
          console.log(chalk.yellow('Contact not found lol(:'))
        }
      }).catch(console.error)
      break;

    case 'add':
        addContact(name, email, phone).then(contact => {
            console.log(chalk.green('Add new contact'))
            console.log(contact)}).catch(console.error)
      break;

    case 'remove':
      removeContact(id).then(contacts => {
        if(contacts) {
          console.log(chalk.white('contact deleted'))
          console.log(contacts)
        } else {
          console.log(chalk.yellow('Contact not found'))
        }
      }).catch(console.error)
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