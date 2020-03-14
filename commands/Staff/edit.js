const Discord = require("discord.js");

module.exports = {
  name: "edit",
  aliases: ["édit"],
  category: "Rp",
  description:
    "Modifie le message indiqué par le nouveau contenu (<:warn:654704623231434752> Ne fonctionne qu'avec les messages du bot) [Staff Only]",
  usage: "e/édit [@user]",
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

    const Idembed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez entrer l'id du message que vous voulez éditer <:no:648627916317392936> \nPlus d'information avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);

    const TextEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez entrer le nouveau contenu du message que vous voulez éditer <:no:648627916317392936> \nPlus d'information avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);

    let things = message.content.trim().split(/ +/g);
    if (!args[0]) return message.channel.send(Idembed);
    if (isNaN(args[0])) return message.channel.send(Idembed);
    if (!args[1]) return message.channel.send(TextEmbed);
    let msgId = args[0];
    let embedchat = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setColor("RANDOM")
      .setDescription(`${things.slice(2).join(" ")}`)
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setTimestamp();

    message.channel.fetchMessages({ around: msgId, limit: 1 }).then(msg => {
      const fetchedMsg = msg.first();
      fetchedMsg.edit(embedchat);
    });

    message.delete();
  }
};
