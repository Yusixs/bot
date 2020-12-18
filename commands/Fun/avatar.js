module.exports.run = async (bot, message, args) => {
	const user = message.mentions.users.first() || message.author;
	message.channel.send({
		files: [user.avatarURL()],
	});
};

module.exports.help = {
	name: 'avatar',
	aliases: ['icon'],
	description: 'Sends an enlarged image of your or another person\'s avatar!',
	guildOnly: true,
	args: false,
	usage: '<@member>',
	cooldown: 3,
};
