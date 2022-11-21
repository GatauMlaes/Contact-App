const validator = require("validator");
const { writeQuestion, saveContacts, rl } = require("./contacts");

const contactApp = async () => {
  const nama = await writeQuestion("Masukkan Nama : ");
  const email = await writeQuestion("Masukkan email : ");
  if (validator.isEmail(email)) {
    const noTelp = await writeQuestion("Masukkan No.Telp : ");
    if (validator.isMobilePhone(noTelp, "id-ID")) {
      saveContacts(nama, email, noTelp);
    } else {
      console.log("Masukkan No.Telp Dengan Benar");
      rl.close();
    }
  } else {
    console.log("Masukkan Email Dengan Benar");
    rl.close();
  }
};

contactApp();
