const Discord = require("discord.js");

module.exports = {
  name: "dm",
  aliases: ["mp"],
  category: "staff",
  description:
    "Envoie le message indiqué a l'utilisateur mentionné [Staff only]",
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
        "Vous devez indiquer un message à envoyer <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const MentionEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez mentionner un utilisateur <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);
    let membre = message.guild.member(message.mentions.users.first());
    if (!membre) return message.channel.send(MentionEmbed);
    let things = message.content.trim().split(/ +/g);
    if (!args[1]) return message.channel.send(SayEmbed);
    const botmessage = things.slice(2).join(" ");
    message.delete().catch();
    membre.send(botmessage);
    const mpembed = new Discord.RichEmbed()
      .setTitle("<:invitation:658293015055564811> DM")
      .setColor("NAVY")
      .setDescription(
        "Action effectuée avec succés <:yes:648627916690685962> \n " +
          membre +
          ' a bien reçu le message "**' +
          botmessage +
          '**" en mp'
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);
    message.channel.send(mpembed);
  }
};
