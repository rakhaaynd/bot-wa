const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode');

const app = express();
let qrCodeData = '';

// Inisialisasi bot WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
});

// QR code muncul saat belum login
client.on('qr', async (qr) => {
    qrCodeData = await qrcode.toDataURL(qr);
    console.log('QR code diperbarui!');
});

// Saat bot siap digunakan
client.on('ready', () => {
    console.log('Bot WhatsApp siap digunakan!');
});

// Perintah otomatis saat pesan masuk
client.on('message', (message) => {
    if (message.body.toLowerCase() === '.list') {
        const pricelist = `
*APP PREMIUM ✅*

*REGION GLOBAL*
- Spotify 1 B: 14K
- Spotify 2 B: 24K
- Spotify 3 B: 32K

*REGION KOREA*
- Spotify 1 B: 10K
- Spotify 2 B: 16K
- Spotify 3 B: 25K

*BSTATION*
- 1B Share: 5K
- 1Y Share: 14K
- 1B Private: 30K

*YOUKU*
- 1B: 5K

*CAPCUT*
- 7D: 4K
- 1B: 8K

*AMAZON*
- 1D: 1K
- 3D: 2K
- 7D: 4K
- Share 4U1B: 7K
- Private: 13K

*VIU*
- 1B: 500 PERAK
- 3B: 900 PERAK
- 5B: 1K
- 1Y: 4K

*DISNEY+*
- 1D: 5K
- 7D: 13K
- 1B 10U: 19K

*WeTV*
- 1D: 3.5K
- 2D: 5.5K
- Share 1B: 7K

*V!D PLAT*
- 1D: 4K
- 7D: 7K
- All Dev 1B: 13K
- Mobile 1B: 12K

*NETFLIX*
- 1U1D: 3K
- 1U3D: 6K
- 1U7D: 8K
- 1U1B: 19K
- 2U7D: 7K
- 2U1B: 13K
- Semi Private: 23K
- Private: 92K

*CANVA*
- 1D: 500 PERAK
- 3D: 600 PERAK
- 7D: 900 PERAK
- 1B: 1K
- 3B: 3.5K
- 6B: 5.5K
- 1Y: 7K

*YT FAMILY PLAN*
- 1B: 2K
- 2B: 4K
- 3B: 6K

Untuk order, silakan chat admin langsung ya!
        `;
        message.reply(pricelist);
    }
});

// Web server untuk QR code
app.get('/', (req, res) => {
    if (qrCodeData) {
        res.send(`<h2>Scan QR WhatsApp:</h2><img src="${qrCodeData}" />`);
    } else {
        res.send('QR belum tersedia. Silakan refresh beberapa detik lagi.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Web server aktif di http://localhost:${PORT}`);
});

client.initialize();
