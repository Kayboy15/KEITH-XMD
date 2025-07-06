const os = require('os');
const settings = require('../settings.js');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds % (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds = seconds % (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function pingCommand(sock, chatId, message) {
    try {
        const start = Date.now();
        await sock.sendMessage(chatId, { text: 'Pinging...' }, { quoted: message });
        const end = Date.now();
        const ping = Math.round((end - start) / 2);

        const uptimeInSeconds = process.uptime();
        const uptimeFormatted = formatTime(uptimeInSeconds);

        const botInfo = `
        
🏓 \`_Response Time\`_ :  ${ping} \`ms\`


💡 \`_Uptime_\` : ${uptimeFormatted}
📌 \`_Version_\`  : ${settings.version}
💻 \`_Developer_\` : Keith
🤖 \`_Bot Name_\` : *KEITH-XMD*


> 🌟 *Don't forget to star & fork the repo!*
🔗 https://github.com/Kayboy15/KEITH-XMD
`.trim();

        // Reply to the original message with the bot info
        await sock.sendMessage(chatId, { text: botInfo},{ quoted: message });

    } catch (error) {
        console.error('Error in ping command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to get bot status.' });
    }
}

module.exports = pingCommand;
