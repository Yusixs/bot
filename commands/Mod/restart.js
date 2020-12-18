const { token } = require('../../config.json');
module.exports.run = async (bot, message, args) => {
	const validID = ['175823751894532097', '484707086807334934', '144051124272365569', '231463189487943690'];
	if (!validID.includes(message.author.id)) return;

	message.channel.send('Resetting bot...');
	await bot.destroy();
	await bot.login(token);
};

module.exports.help = {
	name: 'restart',
	aliases: [],
	description: 'Restart bot (Dev only)',
	guildOnly: false,
	args: false,
	usage: '',
	cooldown: 1,
};
