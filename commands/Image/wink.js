const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "wink",
  category: "image",
  description: "Fait un clin d'oeil virtuel a l'utilisateur mentionné",
  usage: "e/wink <<@!549298602854318132>>",
  statut: "on",
  run: async (client, message, args) => {
    let member = message.mentions.users.first() || message.author;
    let msg = await message.channel.send("**Chargement...**");

    fetch("https://some-random-api.ml/animu/wink")
      .then(res => res.json())
      .then(body => {
        if (!body || !body.link)
          return message.reply(
            "Je n'ai pas réussi à trouver une image de clin d'oeil réessayez plus tard !"
          );

        let embed = new Discord.RichEmbed()
          .setColor("e85317")
          .setDescription(
            `<@${message.author.id}>` +
              " fait un clin d'oeil à " +
              `<@${member.id}>` +
              " !"
          )
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setImage(body.link)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL)
          .setTitle(":wink: CLIN D'OEIL");

        msg.edit(embed);
      });
  }
};
