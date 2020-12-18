const joke = require('one-liner-joke');

module.exports.run = async (bot, message, args) => {
	const randomJoke = joke.getRandomJoke({
		exclude_tags: ['dirty', 'racist', 'marriage'],
	});
	message.channel.send(randomJoke.body);
};

module.exports.help = {
	name: 'joke',
	aliases: ['telljoke'],
	description: 'Sends a random joke',
	guildOnly: false,
	args: false,
	usage: '',
	cooldown: 3,
};
