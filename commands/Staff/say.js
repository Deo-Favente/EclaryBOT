const Discord = require("discord.js");

module.exports = {
  name: "say",
  aliases: ["repeat"],
  category: "staff",
  description: "Répète le message indiqué [Staff only]",
  usage: "e/say <message>",
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
        "Vous devez indiquer un message à répéter <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);
    if (!args[1]) return message.channel.send(SayEmbed);
    let channel = client.channels.get(args[0]);
    if(!channel) return;
    let botmessage = args.slice(1).join(" ");
    message.delete();
    channel.send(botmessage);
  }
};
