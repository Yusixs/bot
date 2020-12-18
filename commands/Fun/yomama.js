const yoMamma = require('yo-mamma').default;

module.exports.run = async (bot, message, args) => {
	message.channel.send(`**${yoMamma()}**`);
};

module.exports.help = {
	name: 'yomama',
	aliases: ['yomamma', 'yo-mama'],
	description: 'Returns a random yo mama joke!',
	guildOnly: false,
	args: false,
	usage: '',
	cooldown: 1,
};
