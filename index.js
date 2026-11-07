const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN || '7034471027:AAGY36QWHIPDFCtXD1JacStY2rmlg4hzlM';
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Senabot iniciado com sucesso!');

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const texto = msg.text;

  if (!texto) return;

  if (texto === '/start') {
    return bot.sendMessage(chatId, '🚀 **Bem-vindo ao Senabot!**\n\nEnvie-me o link de um produto para eu formatar a oferta automaticamente.', { parse_mode: 'Markdown' });
  }

  if (texto.includes('http://') || texto.includes('https://')) {
    const mensagemFormatada = `
🚨 **OFERTA IMPERDÍVEL ENCONTRADA!**

📦 **Produto:** Confira os detalhes no link abaixo!
🔥 **Desconto exclusivo aplicado**

🔗 **Compre aqui com segurança:**
${texto}

⚠️ *Atenção: Os preços podem alterar a qualquer momento.*
    `;

    await bot.sendMessage(chatId, mensagemFormatada, { parse_mode: 'Markdown' });
  } else {
    bot.sendMessage(chatId, 'Envie-me um link de produto para formatar!');
  }
});
