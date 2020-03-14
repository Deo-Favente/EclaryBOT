const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "user-info",
  aliases: ["userinfo", "user_info", "user"],
  category: "Info",
  description:
    "Affiche les informations importantes de l'utilisateur mentionné",
  usage: "e/user-info <@user>",
  statut: "on",
  run: async (client, message, args) => {
    // TO DO
    let member = message.mentions.users.first() || message.author;
    let statut = member.presence.status;
    let game = member.presence.game;
    if (!game) game = "Aucun jeu";
    let Stats = new Discord.RichEmbed()
      .setTitle(":man_detective: USER-INFO")
      .setThumbnail(member.displayAvatarURL)
      .setAuthor(member.tag, member.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setColor(member.displayHexColor)
      .setDescription(member)
      .addField("ID de l'utilisateur :", member.id)
      .addField("Statut :", member.presence.status)
      .addField("Jeu actuel", game)
      .addField("Compte crée le :", moment.utc(member.createdAt).format("LL"))
      .addField(
        "À rejoint le serveur le :",
        moment.utc(member.joinedAt).format("LL")
      )
      .addField("Nickname :", message.guild.members.get(member.id).displayName)
      .addField(
        "Rôle le plus haut",
        message.guild.members.get(member.id).highestRole
      )
     // .addField(
     //   "Permissions :",
     //   message.guild.members.get(member.id).permissions
     // );

    message.channel.send(Stats);
    //console.log(message.guild.members.get(member.id).roles)
  }
};
