const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "skin",
  aliases: ["mc", "mcskin", "minecraft"],
  category: "Info",
  description: "Génére un aperçu du skin Minecraft du pseudo précisé",
  usage: "e/skin <pseudo>",
  statut: "on",
  run: async (client, message, args) => {
    const PseudoEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez préciser un nom d'utilisateur Minecraft <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    const InvalidPseudoEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Le pseudo `" +
          args +
          "` n'est pas valide <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    if (!args[0]) return message.channel.send(PseudoEmbed);
    let content = message.content.trim().split(/ +/g);
    let user = content.slice(1).join(" ");

    let msg = await message.channel.send(`**Chargement...**`);

    fetch(`https://some-random-api.ml/mc?username=${user}`)
      .then(res => res.json())
      .then(body => {
        if (!body || !body.trimmed_uuid)
          return message.channel.send(InvalidPseudoEmbed);

        const uuid = body.trimmed_uuid;

        let embed = new Discord.RichEmbed()
          .setColor("e85317")
          .setTitle(":bust_in_silhouette: AVATAR")
          .setDescription(
            `Voici le skin de  \`${user}\` ! Il  est bien beau dit donc :smile: \n[Télécharger le skin](https://visage.surgeplay.com/skin/${uuid}.png)`
          )
          .setTimestamp()
          .setImage(`https://visage.surgeplay.com/full/512/${uuid}.png`)
          .setFooter("ÉclaryBOT", message.guild.iconURL);

        msg.edit(embed);
      });
  }
};
