const Discord = require('discord.js');

module.exports = async function ShoobNotify(bot, message) {

	const sendTo = '626749195318984704';
	const monitor = '635780188021456896';
	const SHOOB_ID = '530197265902731264';

	function getSpawnInfo(msg) {
		const spawnEmbed = msg.embeds[0];
		if (!spawnEmbed || !spawnEmbed.title || !spawnEmbed.image) return;
		const titleMatch = spawnEmbed.title.match(/^(.*) Tier: (\d) Issue#: (\d+)$/);
		if (!titleMatch) return;
		return spawnEmbed;
	}

	function generateEmbed(embed, channel) {
		const notifyEmbed = new Discord.MessageEmbed()
			.setColor(embed.color)
			.setTitle(embed.title)
			.setDescription(`spawned in ${channel}!
			Donate or invite get access!`.replace(/\n\s+/gm, '\n')
			);
		return notifyEmbed;
	}

	if (message.author.id !== SHOOB_ID || monitor !== message.channel.id) return;
	const spawnEmbed = getSpawnInfo(message);
	if (!spawnEmbed) return;

	try {
		const embed = generateEmbed(spawnEmbed, message.channel);
		await bot.channels.get(sendTo).send(embed);
	}
	catch (e) {
		console.error(e);
	}


};