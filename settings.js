/*
      * Created By ArxzyDev
      * Forget For Donate
      
      * Notes:
      - Kalau Mau Run Script Di Enc Dulu
*/
const fs = require('fs')

// APIKEY OPEN AI
global.jeropenai  = "gatadios" // ISI APIKEY LU

// Api
global.APIs = {
	alfa: 'https://api.zeeoneofc.my.id', // GAK USAH UBAH LOL
}

// APIKEY \\
global.APIKeys = {
	'https://api.zeeoneofc.my.id': 'gatadios', // ISI APIKEY LU
}

global.namabot = "ARI-BOT" // UBAH JADI NAMA LU
global.namaowner = "ARI VPN STORE" // NAMA OWNER
global.footer_text = "© ARI-BOT" + namabot // NAMA BOT
global.pp_bot = fs.readFileSync("./image/allmenubot.jpg") // FOTO BOT MAX 50KB BIAR GA DELAY
global.qris = fs.readFileSync("./image/qris.jpg") // FOTO QRIS MAX 50KB BIAR GA DELLAY
global.owner = ['6281327393959'] // UBAH NOMOR YANG MAU DI JADIKAN OWNER
// - \\
global.sessionName = 'session' // GAK USAH UBAH
global.prefa = ['', '!', '.', '🐦', '🐤', '🗿'] // GAK USAH UBAH
global.sewabot = ("SEWA CHAT OWNER") // ISI HARGA SEWA BOT LU
global.fakelink = "-"
global.grubbot = (`https://chat.whatsapp.com/C3MmpDbhnxs551jQLnMg2Y`) 
// -- \\
// FALSE OR TRUE \\
global.autoTyping = false // ARI-BOT
global.welcome = true // KALO MAU AUTO WELCOME UBAH JADI true
global.left = true // KALO MAU AUTO LEFT UBAH JADI true
global.anticall = false // ARI-BOT
global.autoblok212 = false // ARI-BOT
global.autoread = false // ARI-BOT
global.autorespon = false // ARI-BOT
global.onlyprem = false // ARI-BOT
global.onlygrub = false // ARI-BOT
global.onlypc = false // ARI-BOT
// - \\
// PEMISAH \\
global.packname = '© ARI-BOT' //sticker wm ubah
global.author = 'ARI-BOT' //sticker wm ganti nama kalian

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
