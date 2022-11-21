const yargs = require("yargs");
const { saveContacts,listContact,detailContact,deleteContact } = require("./contact");

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
}).demandCommand();

yargs.command({
    command:'list',
    describe:'Untuk Menampilkan Nama Yang Sudah Terdaftar Di Kontak',
    builder:{},
    handler(){
        listContact();
    }
})

yargs.command({
    command:'detail',
    describe:'Untuk Menampilkan Detail Yang Sudah Terdaftar Di Kontak Berdasarkan Nama',
    builder:{
        nama :{
            describe:'Nama Lengkap',
            demandOption : true ,
            type : 'string'
        }
    },
    handler(argv){
      detailContact(argv.nama)
    }
})

yargs.command({
    command:'delete',
    describe:'Untuk Menghapus Kontak Berdasarkan Nama',
    builder:{
        nama :{
            describe:'Nama Lengkap',
            demandOption : true ,
            type : 'string'
        }
    },
    handler(argv){
      deleteContact(argv.nama)
    }
})

yargs.parse()