const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// Gantikan 'YOUR_TELEGRAM_BOT_TOKEN' dengan token bot yang Anda dapatkan dari BotFather

// const token = '7368378129:AAFyFLKlwNf4O_ffXdQ5dFmzTBGqwQdnnTs';
const token = process.env.TELEGRAM_BOT_TOKEN || '7368378129:AAFyFLKlwNf4O_ffXdQ5dFmzTBGqwQdnnTs';
const bot = new TelegramBot(token, { polling: true });

// Membuat aplikasi express
const app = express();
app.use(bodyParser.json());


const URL = process.env.URL || 'https://bot-wellcome.vercel.app';


app.post('/webhook', (req, res) => {
    try {
        bot.processUpdate(req.body)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error)
    }
})


// Menyambut anggota baru
bot.on('new_chat_members', (msg) => {
    const chatId = msg.chat.id;
    const newMember = msg.new_chat_member;

    bot.sendMessage(chatId, `WELCOME TO PAVOCOIN, ${newMember.first_name}!`);
});

// Fungsi untuk memulai bot dengan perintah /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello! Im a Welcome Bot.');
});

// Fungsi untuk menampilkan informasi Web
bot.onText(/\/web/, (msg) => {
    const chatId = msg.chat.id;
    const webMessage = 'Our Official Website : https://pavocoin.xyz/';
    bot.sendMessage(chatId, webMessage);
});

// Fungsi untuk menampilkan informasi Twitter
bot.onText(/\/twitter/, (msg) => {
    const chatId = msg.chat.id;
    const twitterMessage = 'Our Official X : https://x.com/PavoCoint';
    bot.sendMessage(chatId, twitterMessage);
});

// Fungsi untuk menampilkan informasi Telegram
bot.onText(/\/telegram/, (msg) => {
    const chatId = msg.chat.id;
    const telegramMessage = 'Our Official Telegram : https://t.me/+c2z_F35p-CIxZGU5';
    bot.sendMessage(chatId, telegramMessage);
});

// Fungsi untuk menampilkan informasi Pump
bot.onText(/\/pump/, (msg) => {
    const chatId = msg.chat.id;
    const telegramMessage = 'Pump PavoCoin : https://pump.fun/ECxVCgBYZz6jqwJdnEwWTgByeSR9YXrtyGcr5TLyZ85t';
    bot.sendMessage(chatId, telegramMessage);
});

// Fungsi untuk menampilkan informasi Martket NFT
bot.onText(/\/market/, (msg) => {
    const chatId = msg.chat.id;
    const telegramMessage = 'Market NFT PavoCoin : https://market.pavocoin.xyz/';
    bot.sendMessage(chatId, telegramMessage);
});

// Menyediakan route untuk vercel
app.get('/', (req, res) => {
    res.send('Bot is running...');
});

// Favicon route untuk menghindari 404
app.get('/favicon.ico', (req, res) => res.status(204));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log('Bot is running...');
