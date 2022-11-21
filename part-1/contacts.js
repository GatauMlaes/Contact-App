const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync("data");
}

const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '{"users":[] }', "utf-8");
}

const writeQuestion = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (nama) => {
      resolve(nama);
    });
  });
};

const saveContacts = (nama, email, noTelp) => {
  const contact = { nama, email, noTelp };
  const file = fs.readFileSync("data/contact.json", "utf-8");

  const contacts = JSON.parse(file);

  contacts.users.push(contact);

  fs.writeFileSync("data/contact.json", JSON.stringify(contacts, null, 2));
  console.log(`Thank you ${nama} `);
  rl.close();
};

module.exports = { writeQuestion, saveContacts ,rl };

