const Discord = require("discord.js");

module.exports = {
  name: "voice",
  aliases: ["channel", "salon"],
  category: "Rp",
  description:
    "Modifier votre salon vocal (<:warn:654704623231434752> Tout abus sera sanctionné !",
  usage: "e/voice max <Nombre> ||",
  statut: "off",
  run: async (client, message, args) => {
    const NullE = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous n'avez pas l'autorisation de faire ça, bien tenté ! <:no:648627916317392936>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
    const Null = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Usage invalide ! Vous devez préciser un argument <:no:648627916317392936> \nPlus d'information avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const Connected = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez être connecté dans un salon pour faire ça <:no:648627916317392936> \nPlus d'information avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const Propriétaire = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez être le propriétaire du salon pour faire ça <:no:648627916317392936> \nPlus d'information avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!args[0]) return message.channel.send(Null);

    if (args[0] == "lock") {
      if (!message.member.voiceChannel) return message.channel.send(Connected);
      if (message.member.voiceChannel.name.includes(message.author.username)) {
        let channelId = message.member.voiceChannel.id;
        let channel = client.channels.get(channelId);

        channel.overwritePermissions(
          message.guild.roles.find("name", "@everyone"),
          {
            // Disallow Everyone to see, join, invite, or speak
            CREATE_INSTANT_INVITE: false,
            VIEW_CHANNEL: true,
            CONNECT: false,
            SPEAK: false
          }
        );
      } else return message.channel.send(Propriétaire);
    }
    message.reply("150"); // ?
  }
};
