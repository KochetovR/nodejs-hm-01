const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const contactsPath = async () => {
    const res = await fs.readFile(path.join(__dirname, 'db/contacts.json'), 'utf8')
    try {
        const contacts = JSON.parse(res);
        return contacts
    } catch (error) {
        console.log(error)
    }
};

// TODO: задокументировать каждую функцию
function listContacts() {
    return contactsPath()
  }
  
  function getContactById(contactId) {
    // ...твой код
  }
  
  function removeContact(contactId) {
    // ...твой код
  }
  
  async function addContact(name, email, phone) {
    const contacts = await contactsPath()
    const newContact = {id: uuidv4(), name, email, phone}
    contacts.push(newContact);
    await fs.writeFile(path.join(__dirname, 'db/contacts.json'),JSON.stringify(contacts, null, 2))
    return newContact
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }