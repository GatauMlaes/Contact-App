// const readline = require("readline");
const fs = require("fs");
const validator = require("validator");
const chalk = require('chalk')
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync("data");
}

const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '{"users":[] }', "utf-8");
}

// const writeQuestion = (question) => {
//   return new Promise((resolve, reject) => {
//     rl.question(question, (nama) => {
//       resolve(nama);
//     });
//   });
// };

const saveContacts = (nama, email, noTelp) => {
  const contact = { nama, email, noTelp };
  const file = fs.readFileSync("data/contact.json", "utf-8");

  const contacts = JSON.parse(file);

  //Validasi Nama Kontak
  const duplikat = contacts.users.find((kontak) => kontak.nama === nama);
  const duplikatNo = contacts.users.find((kontak) => kontak.noTelp === noTelp);
  if (duplikat) {
    console.log(chalk.inverse.bgRed(`Maaf Nama ${nama} Sudah Ada Di Kontak Gunakan Yang Lain`));
    return false;
  }
  //Validasi Email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold(`Masukkan Email Dengan Benar`));
      return false;
    }
  }

  //Validasi Nomor Kontak
  if (!validator.isMobilePhone(noTelp, "id-ID")) {
    console.log(chalk.red.inverse.bold(`Masukkan Nomor Kontak Dengan Benar `));
    return false;
  } else if (duplikatNo) {
    console.log(chalk.red.inverse.bold(`Maaf Nama ${noTelp} Sudah Ada Di Kontak `));
    return false;
  }
  contacts.users.push(contact);

  fs.writeFileSync("data/contact.json", JSON.stringify(contacts, null, 2));
  console.log(`Thank you ${nama} `);
};

module.exports = { saveContacts };
