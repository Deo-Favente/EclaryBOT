const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "hug",
  aliases: ["calin"],
  category: "image",
  description: "Fait un calin virtuel a l'utilisateur mentionné",
  usage: "e/hug <@user>",
  statut: "on",
  run: async (client, message, args) => {
    if (!message.mentions.users.first()) {
      let member = message.mentions.users.first() || message.author;
      let msg = await message.channel.send("**Chargement...**");

      fetch("https://some-random-api.ml/animu/hug")
        .then(res => res.json())
        .then(body => {
          if (!body || !body.link)
            return message.reply(
              "Je n'ai pas réussi à trouver une image de calin réessayez plus tard !"
            );

          let embed = new Discord.RichEmbed()
            .setColor("e85317")
            .setDescription(
              `<@${message.author.id}>` +
                " fait un calin à " +
                `<@${member.id}>` +
                " !"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setImage(body.link)
            .setTimestamp()
            .setFooter("ÉclaryBOT", message.guild.iconURL)
            .setTitle(":hugging: CALIN");

          msg.edit(embed);
        });
    }
  }
};
