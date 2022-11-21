// const readline = require("readline");
const fs = require("fs");
const validator = require("validator");
const chalk = require("chalk");
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
const loadContact = () => {
  const file = fs.readFileSync("data/contact.json", "utf-8");
  const kontak = JSON.parse(file);
  return kontak;
};

const alertError = (kata) => {
  console.log(chalk.red.inverse.bold(kata));
};

const saveContacts = (nama, email, noTelp) => {
  const contact = { nama, email, noTelp };
  const contacts = loadContact();

  //Validasi Nama Kontak
  const duplikat = contacts.users.find((kontak) => kontak.nama === nama);
  const duplikatNo = contacts.users.find((kontak) => kontak.noTelp === noTelp);
  const duplikatE = contacts.users.find((kontak) => kontak.email === email);
  if (duplikat) {
    alertError(`Maaf Nama "${nama}" Sudah Ada Di Kontak Gunakan Yang Lain`);
    return false;
  }
  //Validasi Email
  if (email) {
    if (duplikatE) {
      alertError(`Maaf Email "${email}" Sudah Ada Di Kontak `);
      return false;
    }
    if (!validator.isEmail(email)) {
      alertError("Masukkan Email Dengan Benar");
      return false;
    }
  }

  //Validasi Nomor Kontak
  if (!validator.isMobilePhone(noTelp, "id-ID")) {
    alertError(`Masukkan Nomor Kontak Dengan Benar `);
    return false;
  } else if (duplikatNo) {
    alertError(`Maaf Nomor "${noTelp}" Sudah Ada Di Kontak `);
    return false;
  }
  contacts.users.push(contact);

  fs.writeFileSync("data/contact.json", JSON.stringify(contacts, null, 2));
  console.log(`Thank you ${nama} `);
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.black.bgCyan(`Daftar Kontak : `));
  contacts.users.forEach((namaKontak, i) => {
    console.log(`${i + 1}. ${namaKontak.nama} - ${namaKontak.noTelp}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const cariNama = contacts.users.find(
    (kontak) => kontak.nama.toLowerCase() === nama.toLowerCase()
  );
  if (!cariNama) {
    alertError(`Maaf Nama "${nama}" Tidak Ada Di Kontak`);
    return false;
  }
  console.log(chalk.green.inverse.bold(`Detail Kontak ${cariNama.nama} :`));
  console.log(`Nama : ${cariNama.nama} `);
  if (cariNama.email) {
    console.log(`Email: ${cariNama.email} `);
  }
  console.log(`No.Telp : ${cariNama.noTelp} `);
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const contactOld = contacts.users;
  const newContacts = contacts.users.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  const newwContactstr = JSON.stringify(newContacts, null, 2);
  if (contactOld.length === newContacts.length) {
    alertError(`Maaf Nama "${nama}" Tidak Ada Di Kontak`);
    return false;
  }
  fs.writeFileSync(dataPath, `{"users":${newwContactstr} } `);
  console.log(`Delete Contact ${nama} is Success`);
};

module.exports = { saveContacts, listContact, detailContact, deleteContact };
