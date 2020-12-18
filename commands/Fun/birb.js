const request = require('request');

module.exports.run = async (bot, message, args) => {
	request('http://random.birb.pw/tweet.json', (error, response, body) => {
		const { file } = JSON.parse(body);
		message.channel.send({ files: [`http://random.birb.pw/img/${file}`] });
	});
};

module.exports.help = {
	name: 'bird',
	aliases: ['birdie', 'birb', 'birds'],
	description: 'Sends a random birb',
	guildOnly: false,
	args: false,
	usage: '',
	cooldown: 3,
};
