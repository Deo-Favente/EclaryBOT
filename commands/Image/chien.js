const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "chien",
  category: "image",
  description: "Génére une image aléatoire de chien",
  usage: "e/chien",
  statut: "on",
  run: async (client, message, args) => {
    let msg = await message.channel.send("**Chargement...**");

    fetch("https://dog.ceo/api/breeds/image/random")
      .then(res => res.json())
      .then(body => {
        if (!body || !body.message)
          return message.reply(
            "Je n'ai pas réussi à trouver une image de chien réessayez plus tard !"
          );

        let embed = new Discord.RichEmbed()
          .setColor("e85317")
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setImage(body.message)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL)
          .setTitle(":frame_photo: GÉNÉRATION D'IMAGE");

        msg.edit(embed);
      });
  }
};
