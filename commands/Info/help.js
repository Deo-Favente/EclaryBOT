const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
  name: "help",
  aliases: ["h", "list"],
  category: "info",
  description: "Afficher la liste des commandes du bot Éclary",
  usage: "e/help",
  statut: "on",
  run: async (client, message, args) => {
    const HelpEmbed = new RichEmbed()
      .setColor("17ace8")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTitle(":handshake: HELP")
      .setDescription(
        "Voici les commandes du bot Éclary 🤖 \nBesoin d'aide sur une commande spécifique ? `e/info <nom>`"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .addField("📋 **Préfix :**", "`e/`")
      .addField(
        "📎 **Utilitaire :**",
        "`about`, `help`, `ping`, `info`, `staff`, `suggestion`, `avatar`, `bvn`, `color`, `user-info`, `pub`"
      )
      .addField(
        "🎉 **Mini-Jeu / Fun :**",
        "`question`, `roulette`, `amour`, `amitié`, `bigtext`, `bingo`,"
      )
      .addField(
        "🐶 **Images et gifs :**",
        "`canard`, `alpaga`, `chat`, `chien`, `lama`, `meme`, `phoque`, `lézard`, `oiseau`, `loup`, `pikachu`, `panda`, `renard`, `chameau`, `wink`, `hug`, `pat`, `cookie`, `skin`"
      )
      .addField(
        "👮 **Staff :**",
        "`backup`, `edit`, `prefix`, `prefixreset`, `say`, `embed`, `spam`, `mp`"
      )
      .addField(
        "💰 **Économie :**",
        "`money`, `xp`, `invite`, `leaderboard`, `shop`, `daily`, `flip`, `shifumi`, `slot`, `dice`, `nitro`, `buy`, `claim`, `give`, `inv`, `open`, `pay` , `trade`"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    message.author.send(HelpEmbed);

    let chathelp = new RichEmbed()
      .setTitle(":handshake: HELP")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setColor("17ace8")
      .setDescription("La liste des commandes vous a été envoyée en MP")
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setTimestamp();

    message.channel.send(chathelp);
  }
};
