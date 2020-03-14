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
  name: "xp",
  aliases: ["rank", "level"],
  category: "Rp",
  description: "Affiche votre level d'xp ou celle du membre mentionné",
  usage: "`e/xp [@user]`",
  statut: "on",
  run: async (client, message, args) => {
    let pUser =
      message.mentions.users.first() || message.guild.members.get(args[1]);

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
        "Vous devez indiquer une somme d'xp valide à give <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const NegatifEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous ne pouvez pas entrer un nombre négatif <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
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
      .setTitle("<:chat:657696244570783754> XP")
      .setDescription(
        message.author +
          " a mis l'xp de " +
          pUser +
          " à **" +
          args[2] +
          "** avec succès <:yes:648627916690685962> \nUtilisez `e/xp` pour voir le nombre total d'xp <:chat:657696244570783754>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const AddEmbed = new Discord.RichEmbed()
      .setColor("f9ff03")
      .setTitle("<:chat:657696244570783754> XP")
      .setDescription(
        message.author +
          " a ajouté **" +
          args[2] +
          "** à l'xp de " +
          pUser +
          " avec succès <:yes:648627916690685962> \nUtilisez `e/xp` pour voir le nombre total d'xp <:chat:657696244570783754>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    let user = message.mentions.users.first() || message.author;

    let xp = db.fetch(`xp_${message.guild.id}_${user.id}`);
    let lvl = db.fetch(`xp_${message.guild.id}_${user.id}_lvl`);
    let exp = db.fetch(`xp_${message.guild.id}_${user.id}_xp`);
    let msg = db.fetch(`message_${message.guild.id}_${user.id}`);
    if (xp == null) xp = 0;
    if (lvl == null) lvl = 0;
    
          let LogsSet = [
            "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Xp consulté__ <:chat:657696244570783754> \n**Nom du joueur :** " +
              message.author +
              " \n**Commande entière :** `" +
              message +
              "`\n**Level actuel de l'utilisateur :** " +
              lvl +
              "\n**Xp actuel de l'utilisateur :** " +
              xp +
              " \n**Date de l'action :** " +
              moment()
                .utc(message.createdAt)
                .tz("Europe/Paris")
                .format("LLLL") +
              "\n**Channel de l'action : **" +
              message.channel +
              "\n**━━━━━━━━━━━━━━━━━━**"
          ];
          client.channels.get(`639429893406457896`).send(LogsSet);

    if (args[0] === "set") {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (parseInt(args[2]) == args[2] && parseInt(args[3]) == args[3]) {
          if (isNaN(args[2]) || isNaN(args[3]))
            return message.channel.send(MoneyEmbed);
          if (!pUser) return message.channel.send(UsageEmbed);

          if (args[2] < 0) return message.channel.send(NegatifEmbed);

          for (let i = 1; i < args[2]; i++) {
            if (!Xp) var Xp = 0;
            Xp = i * 150 + Xp;
          }
          let curentXp = Math.floor(Math.random() * 80) + 20;
          Xp = Xp + curentXp;
          db.set(`xp_${message.guild.id}_${pUser.id}`, parseInt(curentXp));
          db.set(`xp_${message.guild.id}_${pUser.id}_lvl`, parseInt(args[2]));
          db.set(`xp_${message.guild.id}_${pUser.id}_xp`, parseInt(Xp));
          db.set(`message_${message.guild.id}_${pUser.id}`, parseInt(args[3]));
          db.set(
            `money_${message.guild.id}_${pUser.id}`,
            500 * parseInt(args[2])
          );
          message.channel.send(SetEmbed);
          let lvl = db.fetch(`xp_${message.guild.id}_${user.id}_lvl`);
          let xp = db.fetch(`xp_${message.guild.id}_${user.id}`);
          let LogsSet = [
            "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Set d'xp réalisé__ <:chat:657696244570783754> \n**Nom du donneur :** " +
              message.author +
              "\n**Nom du receveur :** " +
              pUser +
              " \n**Commande entière :** `" +
              message +
              "`\n**Level final de l'utilisateur :** " +
              lvl +
              "\n**Xp final de l'utilisateur :** " +
              xp +
              " \n**Date de l'action :** " +
              moment()
                .utc(message.createdAt)
                .tz("Europe/Paris")
                .format("LLLL") +
              "\n**Channel de l'action : **" +
              message.channel +
              "\n**━━━━━━━━━━━━━━━━━━**"
          ];
          client.channels.get(`639429893406457896`).send(LogsSet);
        } else return message.channel.send(MoneyEmbed);
      } else return message.channel.send(PermEmbed);
    } else if (args[0] === "add") {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (parseInt(args[2]) == args[2]) {
          if (isNaN(args[2])) return message.channel.send(MoneyEmbed);
          if (!pUser) return message.channel.send(UsageEmbed);
          let lvl = db.fetch(`xp_${message.guild.id}_${user.id}_lvl`);
          let xp = db.fetch(`xp_${message.guild.id}_${user.id}`);

          db.add(`xp_${message.guild.id}_${pUser.id}`, parseInt(args[2]));
          message.channel.send(AddEmbed);
          let lvl1 = db.fetch(`xp_${message.guild.id}_${user.id}_lvl`);
          let xp1= db.fetch(`xp_${message.guild.id}_${user.id}`);
          let LogsAdd = [
            "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Add d'xp réalisé__ <:chat:657696244570783754> \n**Nom du donneur :** " +
              message.author +
              "\n**Nom du receveur :** " +
              pUser +
              " \n**Commande entière :** `" +
              message +
              "`\n**Level final de l'utilisateur :** " +
              lvl1 +
              "\n**Xp final de l'utilisateur :** " +
              xp1 +
              " \n**Date de l'action :** " +
              moment()
                .utc(message.createdAt)
                .tz("Europe/Paris")
                .format("LLLL") +
              "\n**Channel de l'action : **" +
              message.channel +
              "\n**━━━━━━━━━━━━━━━━━━**"
          ];
          client.channels.get(`639429893406457896`).send(LogsAdd);
        } else return message.channel.send(MoneyEmbed);
      } else return message.channel.send(PermEmbed);
    } else {
      const buffer = await profile(user, xp, lvl);
      const filename = `xp-${message.author.id}.jpg`;
      const attachment = new Attachment(buffer, filename);
      await message.channel.send(attachment);
    }

    //NE PAS TOUCHER Génération de l'image
    async function profile(member, xp, level) {
      Canvas.registerFont("./font/GROBOLD.ttf", { family: "Square" });
      const result = await fetch(
        member.displayAvatarURL.replace(imageUrlRegex, "?size=128")
      );
      if (!result.ok) throw new Error("Failed to get the avatar.");
      const avatar = await result.buffer();
      const name = member.username;

      return (
        new Canvas(400, 180)
          .setColor("#7289DA")
          .addRect(84, 0, 316, 180)
          .setColor("#2C2F33")
          .addRect(0, 0, 84, 180)
          .addRect(169, 26, 231, 46)
          .addRect(224, 108, 176, 46)
          .setShadowColor("rgba(22, 22, 22, 1)") // This is a nice colour for a shadow.
          .setShadowOffsetY(5) // Drop the shadow by 5 pixels.
          .setShadowBlur(10) // Blur the shadow by 10.
          // This circle is 2 pixels smaller in the radius to prevent a pixel border.
          .addCircle(84, 90, 62)
          .addCircularImage(avatar, 84, 90, 64)
          .save()
          .createBeveledClip(20, 138, 128, 32, 5)
          .setColor("#23272A")
          .fill()
          .restore()
          .setTextAlign("center")
          .setTextFont('22px"Square"')
          .setColor("#FFFFFF")
          .addText(name, 285, 54)
          .addText(`Level: ${level}`, 84, 162)
          .setTextAlign("left")
          .addText(`Xp: ${xp}`, 241, 136)
          .toBuffer()
      );
    }
  }
};
