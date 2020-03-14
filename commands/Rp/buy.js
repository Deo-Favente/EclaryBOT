const Discord = require("discord.js");
const db = require("quick.db");
var moment = require("moment");
const Utils = require("../../utils.js")

module.exports = {
  name: "buy",
  category: "Rp",
  description:
    "Permet d'acheter un item dans la boutique contre des éclairs <:eclair:639106499515514910>",
  usage: "e/buy <Item>",
  statut: "on",
  run: async (client, message, args) => {
    // Fetch Inventory DB
    let userInv = client.getInv.get(message.author.id, message.guild.id)
    if (!userInv) {
      userInv = { id: `${message.author.id}-${message.guild.id}`, user: message.author.id, guild: message.guild.id, rolekey: 0, v4box: 0, customrole: 0, legende: 0, prestige: 0, rainbowrole: 0, animaterole: 0 }
    }

    // Fetch Money DB
    let money = db.fetch(`money_${message.guild.id}_${message.author.id}`);
    if (!args[0]) return Utils.sendInfoEmbed(message, "Vous devez spécifier le nom de l'item que vous voulez acheter <:no:648627916317392936>");

    //Switch Function
    switch (args[0].toLowerCase()) {
      case "rolekey":
      case "rôlekey":
      case "rolebox":
      case "gradebox":
      case "boxrole":
      case "boxgrade":
        buy("RoleKey", 7500);
        break;
      case "customrole":
      case "customrôle":
      case "rôlecustom":
      case "rolecustom":
      case "custom":
        buy("CustomRole", 12500);
        break;
      case "préstige":
      case "prestige":
        if (!userInv.prestige) buy("Préstige", 5000);
        if (
          userInv.prestige >= 1 ||
          message.member.roles.has("605475764422443023") ||
          message.member.roles.has("658330871593697281")
        )
          return Utils.sendCustomEmbed(message, `Vous possédez déja l'item \`${args[0]}\` <:no:648627916317392936>, vous ne pouvez pas l'acheter 2 fois \nListe de vos items obtensible avec la commande \`e/inventory\` <:inventory:655552298852024330>`);
        buy("Préstige", 5000);
        break;
      case "légende":
      case "legende":
        if (
          userInv.legende >= 1 ||
          message.member.roles.has("631496069200740403") ||
          message.member.roles.has("658330868590444583")
        )
          return Utils.sendCustomEmbed(message, `Vous possédez déja l'item \`${args[0]}\` <:no:648627916317392936>, vous ne pouvez pas l'acheter 2 fois \nListe de vos items obtensible avec la commande \`e/inventory\` <:inventory:655552298852024330>`);
        if (
          message.member.roles.has("605475764422443023") ||
          userInv.prestige >= 1
        ) {
          buy("Légende", 10000);
        } else {
          buy("Légende", 15000);
        }
        break;
      default:
        return Utils.sendCustomEmbed(message, `L'item  \`${args[0]}\` n'existe pas <:no:648627916317392936> \nListe des items achetables obtensible avec la commande \`e/shop\` <:shop:652202101719695453>`);
    }

    async function buy(item, price) {
      //Check
      const errorembed = new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(
          "Vous n'avez pas assez d'argent pour acheter cet item <:no:648627916317392936> \nVotre solde actuel est de **" +
          money +
          "** <:eclair:639106499515514910> \nListe des items achetables obtensible avec la commande `e / shop` <:shop:652202101719695453>"
        )
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL)
        .setAuthor(message.author.tag, message.author.displayAvatarURL);

      //Fetch DB
      if (money == null) money = 0;

      if (money >= price) {
        //Function
        switch (item) {
          case "RoleKey":
            userInv.rolekey += 1;

            let Keyembed = new Discord.RichEmbed()
              .setColor("f9ff03")
              .setTitle("<:buy:657196271022374912> ACHAT")
              .setTimestamp()
              .setFooter("ÉclaryBOT", message.guild.iconURL)
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setDescription(
                "Vous avez acheté une **Clé de box grade** <:boxkey:652202101862170624> pour **7500** <:eclair:639106499515514910> <:yes:648627916690685962> \nListe des vos items obtensible avec la commande `e / inventory` \nOuvrez votre clé avec la commande `e / open <item>`"
              );

            message.channel.send(Keyembed);
            break;
          case "CustomRole":
            userInv.customrole += 1;

            let embed = new Discord.RichEmbed()
              .setColor("f9ff03")
              .setTitle("<:buy:657196271022374912> ACHAT")
              .setTimestamp()
              .setFooter("ÉclaryBOT", message.guild.iconURL)
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setDescription(
                "Vous avez acheté un **Grade personnalisé** <:role:652202102537322497> pour **12500** <:eclair:639106499515514910> <:yes:648627916690685962> \nListe des vos items obtensible avec la commande `e / inventory` \nRécupérez votre grade avec la commande `e / claim <item>`"
              );

            message.channel.send(embed);
            break;
          case "Légende":
            userInv.legende += 1;
            let Embed = new Discord.RichEmbed()
              .setColor("f9ff03")
              .setTitle("<:buy:657196271022374912> ACHAT")
              .setTimestamp()
              .setFooter("ÉclaryBOT", message.guild.iconURL)
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setDescription(
                `Vous avez acheté un ** Grade <@& 631496069200740403 >** <: legende: 655486269102620712 > pour ** ${price}** <: eclair: 639106499515514910 > <: yes: 648627916690685962 > \nListe des vos items obtensible avec la commande \`e/inventory\` \nRécupérez votre grade avec la commande \`e/claim <Item>\``
              );

            message.channel.send(Embed);
            break;
          case "Préstige":
            userInv.prestige += 1;

            let Buyembed = new Discord.RichEmbed()
              .setColor("f9ff03")
              .setTitle("<:buy:657196271022374912> ACHAT")
              .setTimestamp()
              .setFooter("ÉclaryBOT", message.guild.iconURL)
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setDescription(
                "Vous avez acheté un **Grade <@&605475764422443023>** <:prestige:655486268783722537> pour **5000** <:eclair:639106499515514910> <:yes:648627916690685962> \nListe des vos items obtensible avec la commande `e/inventory` \nRécupérez votre grade avec la commande `e/claim <Item>`"
              );

            message.channel.send(Buyembed);
            break;
          default:
            message.reply(
              "Oops an internal error has occured... Please try again later"
            );
        }

        //Enregistrer dans la db
        db.subtract(`money_${message.guild.id}_${message.author.id}`, price);

        client.setInv.run(userInv)
        let moneyAft = db.fetch(
          `money_${message.guild.id}_${message.author.id}`
        );

        moment.locale("fr");
        let Logs = [
          "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Achat réalisé__ <:buy:657196271022374912> \n**Nom du joueur :** " +
          message.author.tag + " (" + message.author.id +
          ") \n**Commande entière :** `" +
          message +
          "` \n**Montant d'argent dépensé :**"
          + [money - moneyAft] +
          " <:eclair:639106499515514910> \n**Date de l'action :** " +
          moment()
            .utc(message.createdAt)
            .tz("Europe/Paris")
            .format("LLLL") +
          "\n**Channel de l'action : **" +
          message.channel + `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}` + "\n**━━━━━━━━━━━━━━━━━━**"
        ];

        return client.channels.get(`639429893406457896`).send(Logs);

        //Check
      } else return message.channel.send(errorembed);
    }
  }
};
