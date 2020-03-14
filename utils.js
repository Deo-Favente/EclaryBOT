const moment = require("moment")

/**
 * Returns a Number that is the timestamp formated for discord.js
 * @returns {Date} - Actual timestamp
 */
const getTimestamp = function () {
    let time = moment().format()
    return time;
};

/**
 * Send a discord.js Rich Embed
 * @returns {Message} - Return Message Object
 */
const sendInfoEmbed = async function (message, text) {
    if (!message || !text) return;

    return await message.channel.send({
        "embed": {
            "color": 15158332,
            "author": {
                "name": message.author.tag,
                "icon_url": message.author.displayAvatarURL
            },
            "description": text + "\nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>",
            "footer": {
                "icon_url": message.guild.iconURL,
                "text": "ÉclaryBOT"
            },
            "timestamp": this.getTimestamp()
        }
    });
}

/**
 * Send a discord.js Rich Embed
 * @returns {Message} - Return Message Object
 */
const sendCustomEmbed = async function (message, text) {
    if (!message || !text) return;

    return await message.channel.send({
        "embed": {
            "color": 15158332,
            "author": {
                "name": message.author.tag,
                "icon_url": message.author.displayAvatarURL
            },
            "description": text,
            "footer": {
                "icon_url": message.guild.iconURL,
                "text": "ÉclaryBOT"
            },
            "timestamp": this.getTimestamp()
        }
    });
}

module.exports.getTimestamp = getTimestamp
module.exports.sendInfoEmbed = sendInfoEmbed
module.exports.sendCustomEmbed = sendCustomEmbed