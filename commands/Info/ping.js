const Discord = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["p", "latency", "latence"],
  category: "info",
  description: "Connaître la latence de l'API et du bot Éclary",
  usage: "e/ping",
  statut: "on",
  run: async (client, message, args) => {
    const m = await message.channel.send("**Calcul du ping en cours...**");

    const PingEmbed = new Discord.RichEmbed()
      .setColor("17ace8")
      .setTitle("<:bot:656104681222963205> PING")
      .setDescription(
        `Pong ! Lantence du bot : **${m.createdTimestamp -
          message.createdTimestamp}ms**. Latence de l'API : **${Math.round(
          client.ping
        )}ms**`
      )
      .setTimestamp()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    m.edit(PingEmbed);
  }
};
