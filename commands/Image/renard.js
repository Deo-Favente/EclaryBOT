const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "renard",
  category: "image",
  description: "Génére une image aléatoire de renard",
  usage: "e/renard",
  statut: "on",
  run: async (client, message, args) => {
    let msg = await message.channel.send("**Chargement...**");

    fetch("https://apis.duncte123.me/animal/fox")
      .then(res => res.json())
      .then(body => {
        if (!body || !body.data.file)
          return message.reply(
            "Je n'ai pas réussi à trouver une image de renard réessayez plus tard !"
          );

        let embed = new Discord.RichEmbed()
          .setColor("e85317")
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setImage(body.data.file)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL)
          .setTitle(":frame_photo: GÉNÉRATION D'IMAGE");

        msg.edit(embed);
      });
  }
};
