const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "refresh",
  aliases: ["reload", "fix"],
  category: "Rp",
  description: "Crée une backup de la DataBase du site [Staff Only]",
  usage: "e/refresh",
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

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);

    message.channel
      .send("**Reload réussi <:yes:648627916690685962>**")
      .then(() => {
        process.exit(1);
      });
  }
};
