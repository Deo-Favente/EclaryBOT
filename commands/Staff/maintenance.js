const Discord = require("discord.js");
const db = require('quick.db')

module.exports = {
  name: "maintenance",
  category: "Rp",
  description: "Crée une backup de l'économie actuelle du serveur [Staff Only]",
  usage: "e/xp [@user]",
  statut: "on",
  run: async (client, message, args) => {
    message.react('648627916690685962')
    db.on('maitenance')
    const PermEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous n'avez pas l'autorisation de faire ça, bien tenté ! <:no:648627916317392936>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(PermEmbed);
    if(!args[1]) return;
    /*let user = message.mentions.users.first()
    let url = args[1]

    message.channel.send(`**__Suggestion de ${user}:__**\n${url}\n<:no:648627916317392936> Merci à lui mais son idée n'est pas accepté ou n'est pas assez précise...\nVous pouvez retenter votre chance en faisant une nouvvel suggestion avec la commande \`e/suggestion\``);
    
    message.delete()*/
  }
};
/***Récapitulatif Suggestion :tada:**
**__Suggestion de @Days#9722:__** https://discordapp.com/channels/583756963586768897/606836989458776074/663138458574913567
:no: Idée pas assez précise..


**__Suggestion de @Zellyo#0001:__** https://discordapp.com/channels/583756963586768897/606836989458776074/663138709193097257
:yes: Idée accepté elle sera mis en place prochainement !
Merci a lui ! Il gagne **250** :eclair: pour sa suggestion :tada:*/