const fs = require("fs");
const { Canvas } = require("canvas-constructor");
const { resolve, join } = require("path");
const { Attachment } = require("discord.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const imageUrlRegex = /\?size=2048$/g;
const moment = require("moment");
const db = require("quick.db");

module.exports = {
  name: "money",
  aliases: [
    "coins",
    "bank",
    "balance",
    "stpeclarybotlemeuilleuretleplusbeaupuisjeconnaitremamoney" //easter egg :kek:
  ],
  category: "Rp",
  description:
    "Affiche votre nombre d'éclairs <:eclair:639106499515514910> ou celui du membre mentionné",
  usage: "`e/money [@user]`",
  statut: "on",
  run: async (client, message, args) => {
    let pUser =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[1]);

    const UsageEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez mentionner un utilisateur <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const MoneyEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez indiquer une somme d'argent valide à donner <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const PermEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous n'avez pas l'autorisation de faire ça, bien tenté ! <:no:648627916317392936>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const SetEmbed = new Discord.RichEmbed()
      .setColor("f9ff03")
      .setTitle("<:bag:648629855847579658> MONEY")
      .setDescription(
        message.author +
          " a mis l'argent de " +
          pUser +
          " à **" +
          args[2] +
          "** <:eclair:639106499515514910> avec succès <:yes:648627916690685962> \nUtilisez `e/money` pour voir le nombre total d'éclairs <:bag:648629855847579658>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const AddEmbed = new Discord.RichEmbed()
      .setColor("f9ff03")
      .setTitle("<:bag:648629855847579658> MONEY")
      .setDescription(
        message.author +
          " a ajouté **" +
          args[2] +
          "** <:eclair:639106499515514910> à l'argent de " +
          pUser +
          " avec succès <:yes:648627916690685962> \nUtilisez `e/money` pour voir le nombre total d'éclairs <:bag:648629855847579658>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
    let user = message.mentions.users.first() || message.author;
    let coins = db.fetch(`money_${message.guild.id}_${user.id}`);
    if (coins == null) coins = 0;

    if (args[0] === "set") {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (parseInt(args[2]) == args[2]) {
          if (isNaN(args[2])) return message.channel.send(UsageEmbed);
          if (!pUser) return message.channel.send(UsageEmbed);

          if (args[2] < 0) return message.channel.send(MoneyEmbed);
          let coins = db.fetch(`money_${message.guild.id}_${user.id}`);
          moment.locale("fr");
          let LogsSet = [
            "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Set de money réalisé__ <:bag:648629855847579658> \n**Nom du donneur :** " +
              message.author.tag +
              " (" +
              message.author.id +
              ")\n**Nom du receveur :** " +
              user.tag +
              " (" +
              user.id +
              ") \n**Commande entière :** `" +
              message +
              "`\n**Argent final :** " +
              args[2] +
              " <:eclair:639106499515514910>\n**Date de l'action :** " +
              moment()
                .utc(message.createdAt)
                .tz("Europe/Paris")
                .format("LLLL") +
              "\n**Channel de l'action : **" +
              message.channel +
              `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}` +
              "\n**━━━━━━━━━━━━━━━━━━**"
          ];
          client.channels.get(`639429893406457896`).send(LogsSet);
          db.set(`money_${message.guild.id}_${pUser.id}`, parseInt(args[2]));
          message.channel.send(SetEmbed);
        } else return message.channel.send(MoneyEmbed);
      } else return message.channel.send(PermEmbed);
    } else if (args[0] === "add") {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (parseInt(args[2]) == args[2]) {
          if (isNaN(args[2])) return message.channel.send(MoneyEmbed);
          if (!pUser) return message.channel.send(UsageEmbed);

          db.add(`money_${message.guild.id}_${pUser.id}`, parseInt(args[2]));
          message.channel.send(AddEmbed);
          let coins = db.fetch(`money_${message.guild.id}_${user.id}`);
          moment.locale("fr");
          let LogsAdd = [
            "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Add de money réalisé__ <:bag:648629855847579658> \n**Nom du donneur :** " +
              message.author.tag +
              " (" +
              message.author.id +
              "\n**Nom du receveur :** " +
              user.tag +
              " (" +
              user.id +
              " \n**Commande entière :** `" +
              message +
              "` \n**Montant donné : **" +
              args[1] +
              " <:eclair:639106499515514910>\n**Argent final :** " +
              coins +
              " <:eclair:639106499515514910>\n**Date de l'action :** " +
              moment()
                .utc(message.createdAt)
                .tz("Europe/Paris")
                .format("LLLL") +
              "\n**Channel de l'action : **" +
              message.channel +
              `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}` +
              "\n**━━━━━━━━━━━━━━━━━━**"
          ];
          client.channels.get(`639429893406457896`).send(LogsAdd);
        } else return message.channel.send(MoneyEmbed);
      } else return message.channel.send(PermEmbed);
    } else {
      const buffer = await profile(user, coins);
      const filename = `coins-${message.author.id}.jpg`;
      const attachment = new Attachment(buffer, filename);
      await message.channel.send(attachment);
    }

    //NE PAS TOUCHER Génération de l'image
    async function profile(member, coins) {
      Canvas.registerFont("./font/GROBOLD.ttf", { family: "Square" });
      let result = await fetch(
        member.displayAvatarURL.replace(imageUrlRegex, "?size=128")
      );
      if (!result.ok) {
        result = await fetch(
          "https://cdn.discordapp.com/avatars/549298602854318132/d6fa4c2a1c90ae5490edb7c8e786bb38.png?size=2048".replace(
            imageUrlRegex,
            "?size=128"
          )
        );
      }
      const avatar = await result.buffer();
      const name = member.username;
      moment.locale("fr");
      let Logs = [
        "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Money consutlée__ <:bag:648629855847579658> \n**Nom du joueur :** " +
          user.tag +
          " (" +
          user.id +
          ") \n**Commande entière :** `" +
          message +
          "`\n**Argent actuel :** " +
          coins +
          " <:eclair:639106499515514910>\n**Date de l'action :** " +
          moment()
            .utc(message.createdAt)
            .tz("Europe/Paris")
            .format("LLLL") +
          "\n**Channel de l'action : **" +
          message.channel +
          `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}` +
          "\n**━━━━━━━━━━━━━━━━━━**"
      ];
      client.channels.get(`639429893406457896`).send(Logs);

      return new Canvas(400, 180)
        .setColor("#7289DA")
        .addRect(84, 0, 316, 180)
        .setColor("#2C2F33")
        .addRect(0, 0, 84, 180)
        .addRect(169, 26, 231, 46)
        .addRect(224, 108, 176, 46)
        .setShadowColor("rgba(22, 22, 22, 1)")
        .setShadowOffsetY(5)
        .setShadowBlur(10)
        .addCircle(84, 90, 62)
        .addCircularImage(avatar, 84, 90, 64)
        .setTextAlign("center")
        .setTextFont('22px"Square"')
        .setColor("#FFFFFF")
        .addText(name, 285, 54)
        .setTextAlign("left")
        .addText(`Éclairs: ${coins}`, 240, 140)
        .toBuffer();
    }
  }
};
