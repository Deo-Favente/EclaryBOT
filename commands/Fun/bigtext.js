const Discord = require("discord.js");

module.exports = {
  name: "bigtext",
  aliases: ["big", "bigletters"],
  category: "fun",
  description:
    "Remplace votre message par en grosses lettres sous formes d'émojis (<:warn:654704623231434752> Attention certains caractères ne fonctionnent pas avec cette commande)",
  usage: "e/bigtext <Messsage>",
  statut: "on",
  run: async (client, message, args) => {
    const ErrorEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setDescription(
        "Vous devez entrer du texte a transformer <:no:648627916317392936>\nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const Symbolembed = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(message.author.tag, message.author.displayAvatarURL) // Un des caractères que tu as entré n'est pas valide
      .setDescription(
        "Un des caractères que vous avez entré n'est pas valide <:no:648627916317392936>\nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    message.delete();
    if (!args[0]) return message.channel.send(ErrorEmbed);

    let things = message.content.trim().split(/ +/g);
    if (!things) return message.channel.send(ErrorEmbed);

    let str = things
      .slice(1, 22)
      .join(" ")
      .toLowerCase();
    let maxi = str.length;
    var msg = "";

    for (var i = 0; i < maxi; i++) {
      var o = i + 1;
      let letter = str.substring(i, o);

      if (
        letter === "0" ||
        letter === "9" ||
        letter === "8" ||
        letter === "7" ||
        letter === "6" ||
        letter === "5" ||
        letter === "4" ||
        letter === "3" ||
        letter === "2" ||
        letter === "1" ||
        letter === "?" ||
        letter === "!" ||
        letter === "'" ||
        letter === "a" ||
        letter === "b" ||
        letter === "c" ||
        letter === "d" ||
        letter === "e" ||
        letter === "f" ||
        letter === "g" ||
        letter === "h" ||
        letter === "i" ||
        letter === "j" ||
        letter === "k" ||
        letter === "l" ||
        letter === "m" ||
        letter === "n" ||
        letter === "o" ||
        letter === "q" ||
        letter === "p" ||
        letter === "r" ||
        letter === "s" ||
        letter === "t" ||
        letter === "u" ||
        letter === "v" ||
        letter === "w" ||
        letter === "x" ||
        letter === "y" ||
        letter === "z" ||
        letter === " " ||
        letter === "é" ||
        letter === "è" ||
        letter === "à"
      ) {
        if (letter === "0") {
          let symbol = ":zero:";
          msg = msg + symbol;
        } else if (letter === "9") {
          let symbol = ":nine:";
          msg = msg + symbol;
        } else if (letter === "8") {
          let symbol = ":eight:";
          msg = msg + symbol;
        } else if (letter === "7") {
          let symbol = ":seven:";
          msg = msg + symbol;
        } else if (letter === "6") {
          let symbol = ":six:";
          msg = msg + symbol;
        } else if (letter === "5") {
          let symbol = ":five:";
          msg = msg + symbol;
        } else if (letter === "4") {
          let symbol = ":four:";
          msg = msg + symbol;
        } else if (letter === "3") {
          let symbol = ":three:";
          msg = msg + symbol;
        } else if (letter === "2") {
          let symbol = ":two:";
          msg = msg + symbol;
        } else if (letter === "1") {
          let symbol = ":one:";
          msg = msg + symbol;
        } else if (letter === "é") {
          let symbol = ":regional_indicator_e:";
          msg = msg + symbol;
        } else if (letter === "è") {
          let symbol = ":regional_indicator_e:";
          msg = msg + symbol;
        } else if (letter === "à") {
          let symbol = ":regional_indicator_a:";
          msg = msg + symbol;
        } else if (letter === " " || letter === "'") {
          let symbol = " ";
          msg = msg + symbol;
        } else if (letter === "?") {
          let symbol = ":grey_question:";
          msg = msg + symbol;
        } else if (letter === "!") {
          let symbol = ":grey_exclamation:";
          msg = msg + symbol;
        } else {
          let symbol = ":regional_indicator_" + letter + ":";
          msg = msg + symbol;
        }
      } else return message.channel.send(Symbolembed);
    }

    message.channel.send(msg);
  }
};
