const Discord = require("discord.js");

module.exports = {
  name: "boost",
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
    
    let booster = message.mentions.users.first()
    if(!booster) return;
    
    const BoostEmbed = new Discord.RichEmbed()
    .setTitle("<a:Boosting:661258026614915073> BOOST")
    .setColor("ff66e2")
    .setDescription(
      booster +
        " viens de booster le serveur ! Merci à lui <a:Pepe_NitroBoost:635137208474664961>"
    )
    .setTimestamp()
    .setFooter("ÉclaryBOT", message.guild.iconURL)
    .setImage(
      "https://support.discordapp.com/hc/article_attachments/360013500032/nitro_gif.gif"
    );
  message.channel.send(BoostEmbed);
  }
};