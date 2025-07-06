const settings = require("../settings");

async function aliveCommand(sock, chatId, message) {
  try {
    const botName = settings.botName || "KEITH-XMD";
    const version = settings.version || "1.0.0";
    const mode = settings.mode || "Public";

    const message1 = `╭───〔 *${botName} Status* 〕───⬣
│  *ping*  *${ping}ms*
│  *Status:* *Online*
│  *Version:* ${version}
│  *Mode:* ${mode}
│
│ 🛠️ Type *.menu* to explore commands!
│
╰───────────⬣`;

    await sock.sendMessage(chatId, {
      text: message1,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363418886120432@newsletter',
          newsletterName: 'KEITHTech Updates',
          serverMessageId: -1
        },
        externalAdReply: {
          title: `${botName} Alive & Online!`,
          body: `Version ${version}`,
          mediaType: 1,
          thumbnailUrl: 'https://files.catbox.moe/x36yev.png',
          sourceUrl: 'https://github.com/Kayboy15/KEITH-XMD'
        }
      }
    }, { quoted: message });
    
  } catch (error) {
    console.error('❌ Error in alive command:', error);
    await sock.sendMessage(chatId, { text: '*✅ Bot is running smoothly!*' }, { quoted: message });
  }
}

module.exports = aliveCommand;
