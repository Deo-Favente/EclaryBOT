const Discord = require("discord.js");

module.exports = {
  name: "amitié",
  aliases: ["amitie", "friendship", "ami"],
  category: "fun",
  description:
    "Calcule (aléatoirement) votre compatibilité amicale avec le membre mentionné",
  usage: "e/amour [@user]",
  statut: "on",
  run: async (client, message, args) => {
    const member = message.mentions.users.first() || message.author;
    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "🤞".repeat(loveIndex) + "🖐️".repeat(10 - loveIndex);

    const embed = new Discord.RichEmbed()
      .setTitle("🤞 AMITIÉ")
      .setColor("17e81f")
      .setDescription(
        `<@${message.author.id}> est compatible à ${Math.floor(
          love
        )}% en amitié avec <@${member.id}>\n\n${loveLevel}`
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    message.channel.send(embed);
  }
};
