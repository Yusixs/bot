module.exports.run = async (bot, message, args) => {
	const msg = await message.channel.send('Rolling Dice!');
	const randomizer = Math.floor((Math.random() * 6) + 1);
	setTimeout(() => msg.edit(`It's a ${randomizer}!`), 5000);
};

module.exports.help = {
	name: 'dice',
	aliases: ['roll'],
	description: 'Rolls a random dice!',
	guildOnly: false,
	args: false,
	usage: '',
	cooldown: 1,
};