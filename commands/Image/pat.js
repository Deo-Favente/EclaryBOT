const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "pat",
  aliases: ["caresse"],
  category: "image",
  description: "Fait une caresse virtuelle à l'utilisateur mentionné",
  usage: "e/pat <<@!549298602854318132>>",
  statut: "on",
  run: async (client, message, args) => {
    let member = message.mentions.users.first() || message.author;
    let msg = await message.channel.send("**Chargement...**");

    fetch("https://some-random-api.ml/animu/pat")
      .then(res => res.json())
      .then(body => {
        if (!body || !body.link)
          return message.reply(
            "Je n'ai pas réussi à trouver une image de baffe réessayez plus tard !"
          );

        let embed = new Discord.RichEmbed()
          .setColor("e85317")
          .setDescription(
            `${message.author}` +
              " donne une caresse à " +
              `<@${member.id}>` +
              " !"
          )
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setImage(body.link)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL)
          .setTitle(":raised_back_of_hand: CARESSE");

        msg.edit(embed);
      });
  }
};
