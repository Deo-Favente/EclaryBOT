const Discord = require("discord.js");

module.exports = {
  name: "about",
  aliases: ["site", "eclary"],
  category: "info",
  description: "Affiche les informations importantes d'Éclary",
  usage: "e/about",
  statut: "on",
  run: async (client, message, args) => {
    const AboutEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setColor("17ace8")
      .setTitle(" <:red_pin:657283187965165598> ABOUT")
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .addField(
        " <:searching:657293789844602918> Mais Éclary, c'est quoi ?",
        "<:bot:656104681222963205> Un **serveur Discord** basé sur sa propre **économie** et son propre **bot** \n<:HappyNitro:656522093831389198> Un **générateur** de **Discord Nitro** Uncheked\n<:friend:657286761000730638> Une communauté **active** et **soudée** \n<:confetti:655560168485945357> Des **giveaways** et **évenements fréquents** \n<:update:657289109739536384> Des **mises à jours** fréquentes et des **nouveautés** à gogo \n <:policeman:657289799211810817> Un **staff compétent** et **à votre écoute**"
      )
      .addField(
        "<:http:657294144208764948> Liens utiles",
        "\n<:update:657289109739536384> **Serveur de backup :** https://discord.gg/y5sRg6d" //<:website:661620359522549772> **Site internet : **https://eclary.tk/
      );
    message.channel.send(AboutEmbed);
  }
};
