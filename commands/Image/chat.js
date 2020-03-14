const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "chat",
  category: "image",
  description: "Génére une image aléatoire de chat",
  usage: "e/chat",
  statut: "on",
  run: async (client, message, args) => {
    let msg = await message.channel.send("**Chargement...**");

    fetch("http://aws.random.cat/meow")
      .then(res => res.json())
      .then(body => {
        if (!body || !body.file)
          return message.reply(
            "Je n'ai pas réussi à trouver une image de chat réessayez plus tard !"
          );

        let embed = new Discord.RichEmbed()
          .setColor("e85317")
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setImage(body.file)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL)
          .setTitle(":frame_photo: GÉNÉRATION D'IMAGE");
        msg.edit(embed);
      });
  }
};
