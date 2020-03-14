const Discord = require("discord.js");

module.exports = {
  name: "pub",
  aliases: ["publicity", "publicité"],
  category: "Info",
  description:
    "Affiche la publicité officielle du discord, travaillée dans le but d'être très attractive",
  usage: "e/pub",
  statut: "on",
  run: async (client, message, args) => {
    const Pub = new Discord.RichEmbed()
      .setColor("17ace8")
      .setTitle("<:pub:660898620614246401> NOTRE PUB")
      .addField(
        "<:france:660899973545721867> Version française - Sans Nitro :",
        "[Cliquez ici pour obtenir la pub](https://pastebin.com/2ncQMjhD)"
      )
      .addField(
        "<:france:660899973545721867> Version française - Avec Nitro :",
        "[Cliquez ici pour obtenir la pub](https://pastebin.com/kdRAfQ0w)"
      )
      .addField(
        "<:unitedstates:660899973537464330> English Version - Without nitro :",
        "[Cliquez ici pour obtenir la pub](https://pastebin.com/CTVDN0Vj)"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
    message.channel.send(Pub);
  }
};
