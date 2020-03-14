const Discord = require("discord.js");

module.exports = {
  name: "question",
  aliases: ["8ball"],
  category: "fun",
  description:
    "Mini jeu fun dans lequel le bot réponds (aléatoirement) à votre question",
  usage: "e/question <question>",
  statut: "on",
  run: async (client, message, args) => {
    let things = message.content.trim().split(/ +/g);

    const ErrorEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(message.author.tag, message.author.displayAvatarURL) //
      .setDescription(
        "Vous devez poser une question <:no:648627916317392936>\nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!things[1]) return message.channel.send(ErrorEmbed);
    let answers = [
      "Non :x:",
      "J'ai envie de dormir :zzz:",
      "Balec :face_palm:",
      "Peut être... :thinking:",
      "Absolument :interrobang:"
    ];
    let question = things.slice(1).join(" ");
    let questionchat = new Discord.RichEmbed()
      .setTitle(":interrobang: QUESTION")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setColor("17e81f")
      .addField("Votre question :", question)
      .addField(
        "Ma réponse : ",
        answers[Math.floor(Math.random() * answers.length)]
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    message.channel.send(questionchat);
  }
};
