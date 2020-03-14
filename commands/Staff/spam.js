const Discord = require("discord.js");

module.exports = {
  name: "spam",
  aliases: ["debout"],
  category: "staff",
  description: "Commande un peu cancer, mais ça réveille bien ! [Staff only]",
  usage: "e/spam <nombre> <message>",
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

    const SayEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez indiquer un message à spammer <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const SpamEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez indiquer le nombre de fois que le message va être envoyé <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);
    if (isNaN(args[0])) return message.channel.send(SpamEmbed);
    if (!args[1]) return message.channel.send(SayEmbed);
    let botmessage = args.slice(1).join(" ");
    let nb = parseInt(args[0]);
    message.delete();

    for (var i = 0; i < nb; i++) {
      message.channel.send(botmessage);
    }
  }
};
