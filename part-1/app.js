
const { writeQuestion, saveContacts } = require("./contacts");


const contactApp = async () => {
  const nama = await writeQuestion("Masukkan Nama : ");
  const email = await writeQuestion("Masukkan email : ");
  const noTelp = await writeQuestion("Masukkan No.Telp : ");
  
  saveContacts(nama, email, noTelp);
};

contactApp();
