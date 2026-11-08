const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '9034471027:AAGY36QWHIPDFCtXD1JaqStYzrmlGg4hzLM';
const url = 'https://senabot-fz1s.onrender.com';
const port = process.env.PORT || 3000;

const bot = new TelegramBot(token);
const app = express();

app.use(express.json());

// Rota de Webhook para receber mensagens do Telegram
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Rota inicial para o Render confirmar que o serviço está online
app.get('/', (req, res) => {
  res.send('Bot senabot ativo via Webhook!');
});

app.listen(port, async () => {
  console.log(`Servidor rodando na porta ${port}`);
  try {
    await bot.setWebHook(`${url}/bot${token}`);
    console.log('Webhook configurado com sucesso no Telegram!');
  } catch (err) {
    console.error('Erro ao configurar Webhook:', err.message);
  }
});

// Lógica de resposta do bot
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
  
