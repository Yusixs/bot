const Canvas = require('canvas');

module.exports.run = async (bot, message, args) => {
	async function meme(link, x, y, avatarSize) {
		const image = new Canvas.Image();
		image.src = `./data/memes/${link}`;
		const member = message.guild.member(message.mentions.users.first() || message.author);
		const canvas = Canvas.createCanvas(image.naturalWidth, image.naturalHeight);
		const ctx = canvas.getContext('2d');

		const background = await Canvas.loadImage(image.src);
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		const avatar = await Canvas.loadImage(member.user.avatarURL({ format: 'png' }));
		ctx.drawImage(avatar, canvas.width * x, canvas.height * y, avatarSize, avatarSize);

		message.channel.send({
			files: [{
				attachment: canvas.toBuffer(),
				name: 'meme.png',
			}],
		});
	}

	const repository = [
		() => meme('brickdrop.jpg', 0.375, 0.775, 125),
		() => meme('itscaresme.jpg', 0.34, 0.64, 650),
	];

	const randomizer = Math.floor(Math.random() * repository.length);
	repository[randomizer]();
};
module.exports.help = {
	name: 'meme',
};
