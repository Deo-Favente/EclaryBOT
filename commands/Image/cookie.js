const Discord = require("discord.js");

module.exports = {
  name: "cookie",
  category: "image",
  description: "Donne un cookie virtuel a l'utilisateur mentionné",
  usage: "e/cookie <@user>",
  statut: "on",
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.member;
    const PermEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        //Vous n'avez
        "Vous n'avez pas l'autorisation de faire ça, bien tenté ! <:no:648627916317392936>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const ErrorEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setDescription(
        "Vous devez mentionner un utilisateur <:no:648627916317392936>\nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);

    if (message.mentions.users.size === 0) {
      return message.channel.send(ErrorEmbed);
    }
    let cookieimage = [
      "http://giphygifs.s3.amazonaws.com/media/sBs1ITniVp7tm/giphy.gif",
      "https://media.giphy.com/media/Z0lWsgfBeuv60/giphy.gif",
      "https://media.giphy.com/media/HGe4zsOVo7Jvy/giphy.gif",
      "https://media.giphy.com/media/xT9IgtKSaY1ScFA0ta/giphy.gif",
      "http://giphygifs.s3.amazonaws.com/media/nAErqE3k2C3fy/giphy.gif"
    ];

    let cookieembed = new Discord.RichEmbed()
      .setTitle(":cookie: COOKIE ")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setColor("e85317")
      .setDescription(
        `${message.author}` +
          ", tu donnes un cookie à " +
          `${member.user}` +
          " pour sa bonne action ! Bravo a lui (ﾉ◕ヮ◕)ﾉ :cookie: !"
      )
      .setImage(cookieimage[Math.floor(Math.random() * cookieimage.length)])
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    message.channel.send(cookieembed);
  }
};
