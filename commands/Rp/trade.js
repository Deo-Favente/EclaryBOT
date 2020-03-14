const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db");

module.exports = {
  name: "trade",
  category: "Rp",
  description:
    "Permet d'échanger un grade préstige/légende en double contre 75% de sa valeur en éclairs <:eclair:639106499515514910>",
  usage: "e/buy <Item>",
  statut: "on",
  run: async (client, message, args) => {
    // Fetch Inventory DB
    let userInv = client.getInv.get(message.author.id, message.guild.id)
    if (!userInv) {
      userInv = { id: `${message.author.id}-${message.guild.id}`, user: message.author.id, guild: message.guild.id, rolekey: 0, v4box: 0, customrole: 0, legende: 0, prestige: 0, rainbowrole: 0, animaterole: 0 }
    }

    let things = message.content.trim().split(/ +/g);
    let ItemId = things.slice(1).join("");
    let Nom = things.slice(1).join(" ");
    let ItemName = ItemId.toLowerCase();
    let coins = db.fetch(`money_${message.guild.id}_${message.author.id}`);
    if (coins == null) coins = 0;

    const NoItemEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setDescription(
        "Vous n'avez pas d'item `" +
        ItemName +
        "` à échanger, bien tenté ! <:no:648627916317392936> \nListe de vos items obtensible avec la commande `e/inventory` <:inventory:655552298852024330>"
      );

    const DoubleEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setDescription(
        "Vous ne pouvez pas échanger d'item `" +
        ItemName +
        "` car vous ne l'avez pas en double <:no:648627916317392936> Récupérez votre Item `" +
        ItemName +
        "` à l'aide de la commande `e/claim <item>` <:truck:657197113448333323>"
      );

    const NoEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez spécifier le nom de l'item que vous voulez échanger <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const NomEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "L'item `" +
        ItemName +
        "` n'existe pas <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!args[0]) return message.channel.send(NoEmbed);

    if (ItemName === "légende" || ItemName === "legende") {
      if (userInv.legende >= 1) {
        if (
          message.member.roles.has("631496069200740403") ||
          message.member.roles.has("658330871593697281")
        ) {
          userInv.legende -= 1
          db.add(`money_${message.guild.id}_${message.author.id}`, 11250);

          const TradeEmbed = new Discord.RichEmbed()
            .setTitle("TRADE <:trade:659775105823408148>")
            .setColor("f9ff03")
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("ÉclaryBOT", message.guild.iconURL)
            .setDescription(
              "Vous avez échangé un **Grade <@&631496069200740403>** <:legende:655486269102620712> contre **11250** <:eclair:639106499515514910> <:yes:648627916690685962> \nListe des vos items obtensible avec la commande `e/inventory`"
            );
          message.channel.send(TradeEmbed);
          let LogsEmbed = new Discord.RichEmbed()
            .setColor("a600ff")
            .setTitle("<:logs:661684612409589780> LOGS")
            .addField("Action réalisée :", "Trade de " + args[0])
            .addField("Nom du joueur :", message.author)
            .addField("Channel de l'action :", message.channel)
            .addField(
              "Date de l'action :",
              moment.utc(message.createdAt).format("LL")
            )
            .setTimestamp()
            .setFooter("ÉclaryBOT", message.guild.iconURL)
            .setAuthor(message.author.tag, message.author.displayAvatarURL);

          client.channels.get(`639429893406457896`).send(LogsEmbed);
        } else return message.channel.send(DoubleEmbed);
      } else return message.channel.send(NoItemEmbed);
    } else {
      if (ItemName === "préstige" || ItemName === "prestige") {
        if (userInv.prestige >= 1) {
          if (
            message.member.roles.has("605475764422443023") ||
            message.member.roles.has("658330871593697281")
          ) {
            userInv.prestige -= 1
            db.add(`money_${message.guild.id}_${message.author.id}`, 3750);

            const TradeEmbed = new Discord.RichEmbed()
              .setTitle("TRADE <:trade:659775105823408148>")
              .setColor("f9ff03")
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setTimestamp()
              .setFooter("ÉclaryBOT", message.guild.iconURL)
              .setDescription(
                "Vous avez échangé un **Grade <@&605475764422443023>** <:prestige:655486268783722537> contre **3750** <:eclair:639106499515514910> <:yes:648627916690685962> \nListe des vos items obtensible avec la commande `e/inventory`"
              );
            message.channel.send(TradeEmbed);
            let coins = db.fetch(
              `money_${message.guild.id}_${message.author.id}`
            );
            let LogsEmbed = new Discord.RichEmbed()
              .setColor("a600ff")
              .setTitle("<:logs:661684612409589780> LOGS")
              .addField("Action réalisée :", "Trade de " + args[0])
              .addField("Nom du joueur :", message.author)
              .addField(
                "Argent final :",
                coins + " <:eclair:639106499515514910>"
              )
              .addField("Channel de la partie :", message.channel)
              .addField(
                "Date de la partie :",
                moment.utc(message.createdAt).format("LL")
              )
              .setTimestamp()
              .setFooter("ÉclaryBOT", message.guild.iconURL)
              .setAuthor(message.author.tag, message.author.displayAvatarURL);

            moment.locale("fr");
            let Logs = [
              "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Trade réalisé__ <:trade:659775105823408148> \n**Nom du donneur :** " +
              message.author +
              " \n**Commande entière :** `" +
              message +
              "` \n**Item échangé : **" +
              args[0] + " \n**Argent final :** " +
              coins + " <:eclair:639106499515514910>\n**Date de l'action :** " +
              moment()
                .utc(message.createdAt)
                .tz("Europe/Paris")
                .format("LLLL") +
              "\n**Channel de l'action : **" +
              message.channel + "\n**━━━━━━━━━━━━━━━━━━**"
            ];

            client.channels.get(`639429893406457896`).send(Logs);
          } else return message.channel.send(DoubleEmbed);
        } else return message.channel.send(NoItemEmbed);
      } else return message.channel.send(NomEmbed);
    }

    client.setInv.run(userInv)
  }
};
