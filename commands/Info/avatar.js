const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["photo", "profil"],
  category: "info",
  description: "Affiche la photo de profil de l'utilisateur mentionné",
  usage: "e/avatar <@user>",
  statut: "on",
  run: async (client, message, args) => {
    if (!message.mentions.users.first()) {
      const ErrorEmbed = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(
          "Vous devez mentionner un utilisateur <:no:648627916317392936>\nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
        )
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL);

      message.channel.send(ErrorEmbed).then(msg => {
        msg.delete(15000);
      });
    }

    const member = message.mentions.members.first();

    const AvatarEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTitle(":bust_in_silhouette: AVATAR")
      .setImage(member.user.displayAvatarURL + "?size=2048")
      .setDescription(
        `Voici l'avatar de ${member} ! Il est bien beau dit donc :smile:`
      )
      .setTimestamp()
      .setColor("17ace8")
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    message.channel.send(AvatarEmbed);
  }
};
