const Discord = require("discord.js");

module.exports = {
  name: "backup",
  aliases: ["édit"],
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

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);

    message.channel.send(
      "**Backup créee avec succès, gardez la précieusement ! <:yes:648627916690685962>**",
      {
        files: ["./json.sqlite", "./db/inventory/inventory.sqlite", "./db/inventory/inventory.sqlite-wal"]
      }
    );
  }
};
