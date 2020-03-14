const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db");

module.exports = {
  name: "pay",
  category: "Rp",
  description: "Donne un montant d'argent a l'utilisateur mentionné",
  usage: "e/pay <@user> <montant>",
  statut: "on",
  run: async (client, message, args) => {
    const ErrorEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous n'avez pas assez d'argent pour en donner autant <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    const NumberEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez préciser un montant d'argent valide à donner <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    const MentionEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez mentionner un utilisateur <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    const YouEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous ne pouvez pas vous payer vous même <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    const BotEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous ne pouvez pas payer un bot <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    const NegatifEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous ne pouvez pas entrer un nombre négatif <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    if (isNaN(args[1])) return message.channel.send(NumberEmbed);
    if (!args[1]) return message.channel.send(NumberEmbed);

    let pUser =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[1]);
    if (!pUser) return message.channel.send(MentionEmbed);
    if (message.author.id === pUser.id) return message.channel.send(YouEmbed);
    if (pUser.user.bot) {
      return message.channel.send(BotEmbed);
    }

    let pCoins = db.fetch(`money_${message.guild.id}_${pUser.id}`);
    if (pCoins == null) pCoins = 0;
    let sCoins = db.fetch(`money_${message.guild.id}_${message.author.id}`);
    if (args[1] < 1) return message.channel.send(NegatifEmbed);
    if (sCoins < args[1]) return message.channel.send(ErrorEmbed);
    if (args[1] == parseInt(args[1])) {
      db.subtract(
        `money_${message.guild.id}_${message.author.id}`,
        parseInt(args[1])
      );
      db.add(`money_${message.guild.id}_${pUser.id}`, parseInt(args[1]));

          let Rcoins = db.fetch(`money_${message.guild.id}_${pUser.id}`);
       let Dcoins = db.fetch(`money_${message.guild.id}_${message.author.id}`);
      const PayEmbed = new Discord.RichEmbed()
        .setColor("f9ff03")
        .setTitle("<:pay:657277527156457482> PAY")
        .setDescription(
          message.author +
            " a donné **" +
            args[1] +
            "** <:eclair:639106499515514910> à " +
            pUser +
            " avec succès <:yes:648627916690685962>"
        )
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL)
        .setAuthor(message.author.tag, message.author.displayAvatarURL);
      message.channel.send(PayEmbed);
     moment.locale("fr");
        let Logs = [
          "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Transfert d'argent réalisé__ <:pay:657277527156457482> \n**Nom du donneur :** " +
            message.author + "\n**Nom du receveur :** " + pUser +
            " \n**Commande entière :** `" +
            message +
            "` \n**Montant donné : **" +
            args[1] + "<:eclair:639106499515514910>\n**Argent du donneur après le don : **" +
 Dcoins + "<:eclair:639106499515514910> \n**Argent du receveur après le don : **" + Rcoins + "<:eclair:639106499515514910>\n**Date de l'action :** " +
            moment()
              .utc(message.createdAt)
              .tz("Europe/Paris")
              .format("LLLL") +
            "\n**Channel de l'action : **" +
            message.channel + "\n**━━━━━━━━━━━━━━━━━━**"
        ];
      client.channels.get(`639429893406457896`).send(Logs);
    } else return message.channel.send(NumberEmbed);
  }
};
