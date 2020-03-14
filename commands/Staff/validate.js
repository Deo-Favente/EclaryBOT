const Discord = require("discord.js");
const db = require('quick.db')

module.exports = {
  name: "validate",
  category: "Rp",
  description: "Crée une backup de l'économie actuelle du serveur [Staff Only]",
  usage: "e/xp [@user]",
  statut: "on",
  run: async (client, message, args) => {
    const PermEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous n'avez pas l'autorisation de faire ça, bien tenté ! <:no:648627916317392936>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(PermEmbed);
    if(!args[1] || !args[2] || !message.mentions.users.first()) return;
    let user = message.mentions.users.first()
    let url = args[1]
    let amount = parseInt(args[2])
    let userID = args[0].slice(3, -1);

    message.channel.send(`**__Suggestion de ${user}:__**\n${url}\n<:yes:648627916690685962> Idée accepté elle sera mis en place prochainement !
Merci a lui ! Il gagne **${amount}** <:eclair:639106499515514910> pour sa suggestion :tada:`);
    
    if(isNaN(args[2])) return;
    db.add(`money_${message.guild.id}_${userID}`, parseInt(args[2]))
    
    message.delete()
  }
};
/***Récapitulatif Suggestion :tada:**
**__Suggestion de @Days#9722:__** https://discordapp.com/channels/583756963586768897/606836989458776074/663138458574913567
:no: Idée pas assez précise..


**__Suggestion de @Zellyo#0001:__** https://discordapp.com/channels/583756963586768897/606836989458776074/663138709193097257
:yes: Idée accepté elle sera mis en place prochainement !
Merci a lui ! Il gagne **250** :eclair: pour sa suggestion :tada:*/