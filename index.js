const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let rp = JSON.parse(fs.readFileSync('./rp.json', 'utf8'));
const prefix = "&";

bot.on('message', (message) => {
    if (!message.content.startsWith(prefix)) {
        return;
    }
    if (message.author.bot) {
        return;
    }

    let command = message.content.slice(1);
    if (command.startsWith('havoc')) {
        message.reply('Hello, nice to meet you. I\'m havoc. https://github.com/Araly/havoc. Type `help` for more information');
    } else if (command.startsWith('ping')) {
        message.reply('pong\n```guild:' + message.guild.id + '```');
    } else if (command.startsWith('r')) {
        var args = command.split(' ').slice(1);
        if (args.length == 0) {
            var rand = Math.floor(Math.random() * 100) + 1;
            if (rand <= 5) {
                message.reply(rand + ' https://cdn.discordapp.com/attachments/139834630755844096/412260452891099136/Victory-Baby-Meme-05.png');
            }
            else if (rand > 95) {
                message.reply(rand + ' http://i0.kym-cdn.com/photos/images/original/000/001/582/picard-facepalm.jpg?1240934151');
            }
            else {
                message.reply(rand);
            }
            return;
        }
        var sum = 0;
        for (var i = 0; i < args.length; i++) {
            args[i] = Math.floor(Math.random() * args[i]) + 1;
            sum += args[i];
        }
        message.reply(sum + ' = (' + args.join(' + ') + ')');
    } else if (command.startsWith('help')) {
        let args = command.split(' ').slice(1);
        if (args.length == 0) {
            var response = 'Here is the help menu, type *' + prefix + 'help command* to know more about the command.';
            var commandsAndDescriptions = ['help|Brings this very help menu.', 'ping|pong', 'roll|Rolls a king dice, 10 by default. You can specify as many dice as you want.|roll 6 4', 'char|A quick resume of the characters'];
            for (var i = 0; i < commandsAndDescriptions.length; i++) {
                response += '\n**' + prefix + commandsAndDescriptions[i].split('|')[0] + ' :** ' + commandsAndDescriptions[i].split('|')[1];
                if (commandsAndDescriptions[i].split('|').length == 3) {
                    response += ' *(' + prefix + commandsAndDescriptions[i].split('|')[2] + ')*';
                }
            }
            message.reply(response);
        }
    } else if (command.startsWith('char')) {
        let args = command.split(' ').slice(1);
        /*if (args.length == 3) {
            switch (args[1]) {
                case 'hp':
                case 'pv':
                    rp[args[0]].hp += Number(args[2]);
                    if (rp[args[0]].hp < 0) {
                        rp[args[0]].hp = 0;
                    } else if (rp[args[0]].hp > rp[args[0]].hpmax) {
                        rp[args[0]].hp = rp[args[0]].hpmax;
                    }
                    break;
                case 'mp':
                case 'mana':
                    rp[args[0]].mp += args[2];
                    if (rp[args[0]].mp < 0) {
                        rp[args[0]].mp = 0;
                    } else if (rp[args[0]].mp > rp[args[0]].mpmax) {
                        rp[args[0]].mp = rp[args[0]].mpmax;
                    }
                    break;
                case 'd':
                case 'des':
                case 'desc':
                case 'description':
                    rp[args[0]].description = args[2];
                    break;
                case 'inventory':
                case 'i':
                    rp[args[0]].inventory = args[2];
                    break;
                case 'gold':
                case 'g':
                    rp[args[0]].money += Number(args[2]);
            }
        }*/
        var text = '';
        for (character in rp) {
			if (rp[character].guild == message.guild.id) {
				text += '\n**' + rp[character].name + '**\nDex Con Men Soc: ' + rp[character].specs + '\nDescription: ' + rp[character].description + '\nInventory: ' + rp[character].inventory + '\n';
				//text += '**' + rp[character].name + '**\nHP: ' + rp[character].hp + '/' + rp[character].hpmax + '\n' + relativeBar(rp[character].hp, rp[character].hpmax) + '\nMP: ' + rp[character].mp + '/' + rp[character].mpmax + '\n' + relativeBar(rp[character].mp, rp[character].mpmax) + '\nSpecs: ' + rp[character].specs + '\nDescription: ' + rp[character].description + '\nInventory: ' + rp[character].inventory + '\nGold: ' + rp[character].money + '\n\n';
			}
        }
        message.reply(text);
    } /*else if (command.startsWith('vjoin')) {
        if (!message.guild) {
            message.reply('Sorry, you need to be in a server for voice to work.');
        } else if (!message.member.voiceChannel) {
            message.reply('Sorry, you need to be in a voice channel for voice to work');
        } else {
            message.member.voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.play('D:\Projects\Code\Node\havoc\AurelionSol_Login_Music.mp3');
                    message.reply('Voice channel joined, and playing music !');
                });
        }
    }*/
})

bot.on('ready', () => {
    console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

bot.login('MjMyMTI2MDAxMzAyMzM5NTg0.C07bcQ.T6dMGB12dlbcuk6FQsZtrv_bxVs');

function relativeBar(value, max) {
    let text = '`[';
    for (let i = 0; i < 20; i++) {
        if (i < (value / max) * 20) {
            text += '#';
        } else {
            text += ' ';
        }
    }
    return text + ']`';
}
