const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "meme",
  category: "image",
  description: "Génére une image aléatoire de meme",
  usage: "e/meme",
  statut: "on",
  run: async (client, message, args) => {
    let msg = await message.channel.send("**Chargement...**");

    fetch("https://apis.duncte123.me/meme")
      .then(res => res.json())
      .then(body => {
        if (!body || !body.data.image)
          return message.reply(
            "Je n'ai pas réussi à trouver un meme réessayez plus tard !"
          );

        let embed = new Discord.RichEmbed()
          .setColor("e85317")
          .setAuthor(message.author.tag, message.guild.iconURL)
          .setImage(body.data.image)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL)
          .setTitle(":frame_photo: GÉNÉRATION D'IMAGE");

        if (body.data.title) {
          embed.setTitle(body.data.title).setURL(body.data.url);
        }
        msg.edit(embed);
      });
  }
};
