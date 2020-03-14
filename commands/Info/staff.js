const Discord = require("discord.js");

module.exports = {
  name: "staff",
  aliases: ["team", "teams"],
  category: "info",
  description: "Affiche la liste complète et détailée des membres du staff",
  usage: "e/staff",
  statut: "on",
  run: async (client, message, args) => {
    const StaffEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setColor("17ace8")
      .setTitle(":cop: STAFF")
      .setDescription(`**Liste complète et détaillée du staff !** \n\n<@&583759314527715331> 👑 : \n<@561608587143806989> : Grand dieu d'Éclary, admin du serveur, mettez vous tous à genoux.\n\n<@&583759864535318550> 🏆 : \n<@!437979906912026626> : Responsable de qualité ++, est présent pour répondre à vos questions et actif pour discuter <a:seizure_hyper:615969003055349771> \n\n<@&589108231461273600> 💻 : \n <@!490461455741747200> : Error 204 No Content
        at description.find(name => name.description == "Rakox")
        at new Script (index.js:80:7) \n\n<@&605095409810931742> :police_officer: \n<@391576446457348098> : ou Girl, super-modératrice active, sympa, mature, adore aider les gens. \n\n<@&583760442216808474> 👮 : 
 \n<@323472943751364610> : Farmeur  en tout genre allant du jeu vidéo aux animés en passant par la musique. Mais attention la nuit il change de casquette et part modérer :sunglasses: PS: Team pain au chocolat !\n\n<@457275250162401291> : Modo de qualité, a de grandes ambitions : etre grand dieu. PS : TG zultek avec le debat pain au chocolat/chocolatine \n\n<@462564598168420352> : Daron de 40 piges au foyer avec la voix plus grave que Vador, aussi connu sous le nom de Beau gosse
`);

    message.channel.send(StaffEmbed);
  }
};
