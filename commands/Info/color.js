const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "color",
  aliases: ["hex", "hexa", "couleur"],
  category: "info",
  description:
    "Permet d'obtenir des informations sur une couleur hexa et de générer un aperçu de celle-ci",
  usage: "e/color <HexaCode>",
  statut: "on",
  run: async (client, message, args) => {
    let ColorEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez préciser une couleur valide <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    if (!args[0]) return message.channel.send(ColorEmbed);
    var color = args[0];
    if (!message.content.includes("#")) return message.channel.send(ColorEmbed);
    color = args[0].slice("1");
    let msg = await message.channel.send("**Chargement...**");

    fetch(`https://www.thecolorapi.com/id?hex=${color}`)
      .then(res => res.json())
      .then(body => {
        if (!body || !body.image.bare)
          return message.reply(
            "Je n'ai pas réussi à trouver votre couleur veuillez réessayez plus tard !"
          );

        let embed = new Discord.RichEmbed()
          .setColor("17ace8")
          .setTitle(":art: COULEUR")
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setImage(
            `https://www.colorbook.io/imagecreator.php?hex=${body.hex.clean}&width=512&height=512`
          )
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL)
          .addField("Hex", body.hex.value)
          .addField(
            "RGB",
            `**Rouge:** ${body.rgb.fraction.r}\n**Bleu:** ${body.rgb.fraction.b}\n**Vert:** ${body.rgb.fraction.g}`
          );
        msg.edit(embed);
      });
  }
};
