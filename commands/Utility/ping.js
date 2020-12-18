module.exports.run = async (bot, message, args) => {
	message.channel.send(`Pong! [**${Math.round(bot.ping)}ms**]`);
};

module.exports.help = {
	name: 'ping',
	aliases: [],
	description: 'Pings the bot',
	guildOnly: false,
	args: false,
	usage: '',
	cooldown: 1,
};
