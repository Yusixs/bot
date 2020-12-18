const { Util } = require('discord.js');

module.exports.run = async (bot, message, args) => {
	async function errorMsg(text) {
		const msg = await message.channel.send(text);
		msg.delete({ timeout: 5000 });
	}

	if (!args[0]) return errorMsg('Please enter a custom emoji!');
	if (args[0].charAt(1) !== ':') return errorMsg('Please enter a **custom** emoji!');

	const id = Util.parseEmoji(args[0]).id;
	const { url } = message.guild.emojis.get(id);
	message.channel.send({ files: [url] });
};

module.exports.help = {
	name: 'emoji',
	aliases: ['emote', 'enlarge'],
	description: 'Enlarges a custom emoji!',
	guildOnly: true,
	args: true,
	usage: '<customemoji>',
	cooldown: 3,
};
