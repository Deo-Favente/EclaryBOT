const Discord = require("discord.js");

module.exports = {
  name: "roulette",
  category: "fun",
  description:
    "Mini jeu fun dans lequel le bot choisis (aléatoirement) une personne parmis le staff et les grades payants",
  usage: "e/roulette <action>",
  statut: "on",
  run: async (client, message, args) => {
    const ErrorEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setDescription(
        "Vous devez indiquer une action à réaliser (ou un autre argument) <:no:648627916317392936>\nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
    let RoleId = "587388700670033921"
    let things = message.content.trim().split(/ +/g);
    let person = message.guild.roles.get(RoleId).members.map(m=>m.user);
    let random = person[Math.floor(Math.random() * person.length)];

    if (!things[1]) return message.channel.send(ErrorEmbed);
    let roulette = things.slice(1).join(" ");
    let roulettechat = new Discord.RichEmbed()
      .setTitle(":busts_in_silhouette: ROULETTE")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setColor("17e81f")
      .addField("Action :", roulette) //
      .addField("Le hasard est formel, c'est :", random)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    message.channel.send(roulettechat);
  }
};
