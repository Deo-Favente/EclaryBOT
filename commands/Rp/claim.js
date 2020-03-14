const Discord = require("discord.js");
const moment = require("moment");
const Utils = require("../../utils.js")

module.exports = {
  name: "claim",
  aliases: ["take"],
  category: "Rp",
  description:
    "Permet de récupérer un item gagné auparavant (dans une box par exemple)",
  usage: "e/claim <item>",
  statut: "on",
  run: async (client, message, args) => {
    // Fetch Inventory DB
    let userInv = client.getInv.get(message.author.id, message.guild.id)
    if (!userInv) {
      userInv = { id: `${message.author.id}-${message.guild.id}`, user: message.author.id, guild: message.guild.id, rolekey: 0, v4box: 0, customrole: 0, legende: 0, prestige: 0, rainbowrole: 0, animaterole: 0 }
    }

    const NoItemNameEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez indiquer un nom d'item a récupérer <:no:648627916317392936> \nListe de vos items obtensible avec la commande `e/inventory` <:inventory:655552298852024330>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
    if (!args[0]) return message.channel.send(NoItemNameEmbed);

    const DejaEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous possédez déja l'item `" +
        args[0] +
        "` <:no:648627916317392936> \nListe de vos items obtensible avec la commande `e/inventory` <:inventory:655552298852024330>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    let joueur = message.author.username;
    let things = message.content.trim().split(/ +/g);
    let item = things.slice(1, 3).join(" ");
    let ItemName = item.toLowerCase();
    let ItemNameCustom = args[0];
    let ItemCustom = ItemNameCustom.toLowerCase();

    const NoEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        " Vous n'avez pas d'item `" +
        args[0] +
        "` à récupérer, bien tenté ! <:no:648627916317392936> \nListe de vos items obtensible avec la commande `e/inventory` <:inventory:655552298852024330>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const ColorEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez spécifier une couleur valide pour votre rôle personnalisé <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>\n[Cliquez ici pour obtenir la liste des couleurs valides](https://pastebin.com/ie48zmxW)"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const NameEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez spécifier un préfix et un nom de votre rôle personnalisé  <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)

    const ItemNameEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "L'argument `" +
        args[0] +
        "` n'est pas valide <:no:648627916317392936> \nListe de vos items obtensible avec la commande `e/inventory` <:inventory:655552298852024330>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const ItemEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous possédez déja l'item `" +
        args[0] +
        "` <:no:648627916317392936> \nListe de vos items obtensible avec la commande `e/inventory` <:inventory:655552298852024330>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const BuyEmbed = new Discord.RichEmbed()
      .setColor("f9ff03")
      .setTitle("<:truck:657197113448333323> CLAIM")
      .setDescription(
        "Vous récupérez l'item `" +
        args[0] +
        "` avec succès <:yes:648627916690685962> \nPlus d'informations sur cet item avec la commande `e/shop` <:shop:652202101719695453>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (
      ItemName === "Legende" ||
      ItemName === "legende" ||
      ItemName === "Légende" ||
      ItemName === "légende"
    ) {
      if (message.member.roles.has("631496069200740403"))
        return Utils.sendCustomEmbed(message, `Vous possédez déja l'item \`${args[0]}\` <:no:648627916317392936>, vous ne pouvez pas l'acheter 2 fois \nListe de vos items obtensible avec la commande \`e/inventory\` <:inventory:655552298852024330>`);
      if (userInv.legende >= 1) {
        userInv.legende -= 1;

        const membre = message.member;
        membre.addRole("631496069200740403");
        membre.addRole("658328081215389696");
        membre.setNickname("[🚀] " + joueur);

        message.channel.send(BuyEmbed);

        moment.locale("fr");
        let Logs = [
          "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Claim réalisé__ <:truck:657197113448333323> \n**Nom du joueur :** " +
          message.author.tag + " (" + message.author.id +
          ") \n**Commande entière :** `" +
          message +
          "` \n**Item récupéré : **" +
          args[0] +
          "\n**Date de l'action :** " +
          moment()
            .utc(message.createdAt)
            .tz("Europe/Paris")
            .format("LLLL") +
          "\n**Channel de l'action : **" +
          message.channel + `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}` + "\n**━━━━━━━━━━━━━━━━━━**"
        ];

        client.channels.get(`639429893406457896`).send(Logs);
      } else return message.channel.send(NoEmbed);
    } else {
      if (
        ItemName === "Prestige" ||
        ItemName === "prestige" ||
        ItemName === "Préstige" ||
        ItemName === "préstige"
      ) {
        if (message.member.roles.has("605475764422443023"))
          return message.channel.send(DejaEmbed);
        if (userInv.prestige >= 1) {
          userInv.prestige -= 1

          const membre = message.member;
          membre.addRole("605475764422443023");
          membre.addRole("658328081215389696");
          membre.setNickname("[🌟] " + joueur);
          moment.locale("fr");
          let Logs = [
            "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Claim réalisé__ <:truck:657197113448333323> \n**Nom du joueur :** " +
            message.author +
            " \n**Commande entière :** `" +
            message +
            "` \n**Item récupéré : **" +
            args[0] +
            "\n**Date de l'action :** " +
            moment()
              .utc(message.createdAt)
              .tz("Europe/Paris")
              .format("LLLL") +
            "\n**Channel de l'action : **" +
            message.channel + `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}` + "\n**━━━━━━━━━━━━━━━━━━**"
          ];

          client.channels.get(`639429893406457896`).send(Logs);

          message.channel.send(BuyEmbed);

          let CheckEmbed = new Discord.RichEmbed();
        } else return message.channel.send(NoEmbed);
      } else {
        if (
          ItemCustom === "CustomRole" ||
          ItemCustom === "Customrôle" ||
          ItemCustom === "Customrole" ||
          ItemCustom === "customrole" ||
          ItemCustom === "customrôle" ||
          ItemCustom === "Custom" ||
          ItemCustom === "custom" ||
          ItemCustom === "CustomRôle" ||
          ItemCustom === "rôlecustom" ||
          ItemCustom === "RôleCustom" ||
          ItemCustom === "RoleCustom" ||
          ItemCustom === "Rôlecustom" ||
          ItemCustom === "Rolecustom" ||
          ItemCustom === "rolecustom"
        ) {
          if (userInv.customrole >= 1) {
            Custom(message, args, client);
          } else return message.channel.send(NoEmbed);
        } else return message.channel.send(ItemNameEmbed);
      }
    }

    function Custom(message, args, client) {
      let things = message.content.trim().split(/ +/g);
      var color = args[1];
      var prefixMsg = args[2]
      var name = things.slice(4, 20).join(" ");
      if (!color) return message.channel.send(ColorEmbed);
      if (!name) return message.channel.send(NameEmbed);

      if (
        color === "AQUA" ||
        color === "GREEN" ||
        color === "BLUE" ||
        color === "PURPLE" ||
        color === "GOLD" ||
        color === "ORANGE" ||
        color === "RED" ||
        color === "GREY" ||
        color === "DARKER_GREY" ||
        color === "NAVY" ||
        color === "DARK_AQUA" ||
        color === "DARK_GREEN" ||
        color === "DARK_BLUE" ||
        color === "DARK_PURPLE" ||
        color === "DARK_GOLD" ||
        color === "DARK_ORANGE" ||
        color === "DARK_RED" ||
        color === "DARK_GREY" ||
        color === "LIGHT_GREY" ||
        color === "DARK_NAVY" ||
        color === "LUMINOUS_VIVID_PINK" ||
        color === "DARK_VIVID_PINK"
      ) {
        userInv.customrole -= 1

        message.guild
          .createRole({
            name: name,
            color: color,
            //  hoist: true,
            mentionable: false,
            position: 33
          })
          .then(role => {
            let roletoadd = message.guild.roles.find(r => r.id === role.id);
            const membre = message.member;
            membre.addRole(roletoadd);
            membre.addRole("665224811076780042");
            membre.setNickname("[" + prefixMsg + "] " + joueur);

          })
          .catch(console.error);
        message.channel.send(BuyEmbed);
      } else return message.channel.send(ColorEmbed);

      moment.locale("fr");
      let Logs = [
        "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Claim réalisé__ <:truck:657197113448333323> \n**Nom du joueur :** " +
        message.author +
        " \n**Commande entière :** `" +
        message +
        "` \n**Item récupéré : **" +
        args[0] +
        "\n**Date de l'action :** " +
        moment()
          .utc(message.createdAt)
          .tz("Europe/Paris")
          .format("LLLL") +
        "\n**Channel de l'action : **" +
        message.channel + `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}` + "\n**━━━━━━━━━━━━━━━━━━**"
      ];

      client.channels.get(`639429893406457896`).send(Logs);
    }

    client.setInv.run(userInv)
  }
};
