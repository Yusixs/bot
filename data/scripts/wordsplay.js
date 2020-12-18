module.exports = async function wordsplay(bot, message) {

	const channel = '604764172411994123';
	if (message.channel.id !== channel) return;
	if (message.author.bot) return;

	const array = () => {
		message.content.toLowerCase();
		message.content.toCharArray();
	};


	console.log(array);
	console.log(`Length of array is ${array.length}`);

	if (array.length > 20) {
		const botmsg = message.reply('Please write a word less than 20 characters!');
		await message.delete();
		await botmsg.delete(6000);
		return;
	}

	// Works
	const match = message.content.match(/^[a-zA-Z]+$/);
	if (!match) {
		const botmsg = 	message.reply('Your word can only contain **English Alphabets!**');
		await message.delete();
		await botmsg.delete(6000);
		return;

	}

	const lastMsg = channel.messages.fetch({ limit: 1 });

	const lastMsgArray = () => {
		message.content.toLowerCase();
		lastMsg.content.toCharArray();
	};

	if (lastMsgArray.pop() !== array.shift()) {
		const botmsg = 	message.reply('Your word should start with the last letter of previous word');
		await message.delete();
		await botmsg.delete(6000);
		return;

	}


};
