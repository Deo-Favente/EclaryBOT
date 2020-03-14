const Discord = require("discord.js");

module.exports = {
  name: "bvn",
  aliases: ["welcome", "bienvenue"],
  category: "Info",
  description:
    "Affiche un message de bienvenue aux nouveaux arrivants (<:warn:654704623231434752> Attention ne fonctionne qu'en <#583768375608475795>)",
  usage: "e/bvn",
  statut: "on",
  run: async (client, message, args) => {
    if (message.channel.id === "583768375608475795") {
      const member = message.mentions.users.first() || message.author;
      const welcome = new Discord.RichEmbed()
        .setAuthor(member.tag, member.displayAvatarURL)
        .setDescription(
          message.author +
            " vous souhaite la bienvenue ! <a:Welcome1:635137207736336384><a:Welcome2:635137207614570516>"
        )
        .setTitle(":wave: BIENVENUE")
        .setColor("17ace8")
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL);
      message.channel.send(welcome);
      message.delete();
    } else {
      const errorembed = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(
          "Vous faites cette commande de le mauvais channel <:no:648627916317392936>\nIl faut te rendre dans le channel <#583768375608475795> pour éxécuter celle-ci <:here:657187989742419978>"
        )
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL);

      message.channel.send(errorembed).then(msg => {
        msg.delete(15000);
      });
    }
  }
};
