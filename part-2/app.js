const yargs = require("yargs");
const { saveContacts } = require("./contact");

yargs.command({
    command:'add',
    describe:'Untuk Menambah Nomor Kontak HP',
    builder:{
        nama :{
            describe:'Nama Lengkap',
            demandOption : true ,
            type : 'string'
        },
        email:{
            describe:'Email',
            demandOption : false ,
            type : 'string'
        },
        noTelp:{
            describe:'Nomor Telepon',
            demandOption : true ,
            type : 'string'
        }
            
        
    },
    handler(argv) {
    saveContacts(argv.nama,argv.email,argv.noTelp)
        
    }
})

yargs.parse()