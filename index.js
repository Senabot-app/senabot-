const TelegramBot = require('node-telegram-bot-api');

const token = '9034471027:AAGY36QWHIPDFCtXD1JaqStYzrmlGg4hzLM';

const bot = new TelegramBot(token, { polling: true });

console.log("Bot senabot iniciado com sucesso!");

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const texto = msg.text;

  if (!texto) return;

  if (texto === '/start') {
    return bot.sendMessage(chatId, '🚀 Olá! O bot senabot está online e a funcionar.');
  }

  if (texto.includes('http://') || texto.includes('https://')) {
    return bot.sendMessage(chatId, `Link recebido: ${texto}`);
  }
});

