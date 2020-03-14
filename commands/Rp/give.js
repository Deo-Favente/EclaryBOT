const Discord = require("discord.js");
const Key = require("../DataBase/Datas/RP/Inventory/key.json");
const Role = require("../DataBase/Datas/RP/Inventory/role.json");
const fs = require("fs");
const moment = require("moment");

module.exports = {
  name: "give",
  category: "Rp",
  description: "Give un item a l'utilisateur mentionné [Staff Only]",
  usage: "e/give <@user> <item>",
  statut: "on",
  run: async (client, message, args) => {
    // Fetch Inventory DB
    let userInv = client.getInv.get(message.author.id, message.guild.id)
    if (!userInv) {
      userInv = { id: `${message.author.id}-${message.guild.id}`, user: message.author.id, guild: message.guild.id, rolekey: 0, v4box: 0, customrole: 0, legende: 0, prestige: 0, rainbowrole: 0, animaterole: 0 }
    }

    //Embed
    const PermEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous n'avez pas l'autorisation de faire ça, bien tenté ! <:no:648627916317392936>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);

    const MentionEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez mentionner un utilisateur <:no:648627916317392936>\nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const FalseEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez préciser un item à give <:no:648627916317392936>\nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
    if (!args[1]) return message.channel.send(FalseEmbed);

    let Args = message.content.split(" ");
    let roleArgs = Args.slice(1, 2);
    let item = args[1].toLowerCase();

    let roleID = roleArgs[0].slice(3, -1);
    let role = message.guild.roles.get(roleID);
    if (!role) {
      if (message.mentions.users.size == 0) {
        return message.channel.send(MentionEmbed);
      } else {
        let user = message.mentions.users.first();
        let joueur = user.id;
        let things = message.content.trim().split(/ +/g);

        const NoItem = new Discord.RichEmbed()
          .setColor("RED")
          .setDescription(
            "L'item `" +
            args[1] +
            "` n'existe pas <:no:648627916317392936> \nListe des items achetables obtensible avec la commande `e/shop` <:shop:652202101719695453>"
          )
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL);
        let Item = things.slice(1, 3).join("");
        let ItemId = things.slice(2, 4).join("");
        let ItemName = ItemId.toLowerCase();

        const OkEmbed = new Discord.RichEmbed()
          .setColor("f9ff03")
          .setTitle("<:give:657197625778503709> GIVE")
          .setDescription(
            "L'item **" +
            ItemName +
            "** a été donné avec succès à " +
            user +
            " <:yes:648627916690685962>"
          )
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL);

        moment.locale("fr");
        let Logs = [
          "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Give réalisé__ <:give:657197625778503709> \n**Nom du donneur :** " +
          message.author.tag +
          " (" +
          message.author.id +
          ")\n**Nom du receveur :** " +
          user.tag +
          " (" +
          user.id +
          ") \n**Commande entière :** `" +
          message +
          "` \n**Item donné : **" +
          args[1] +
          "\n**Date de l'action :** " +
          moment()
            .utc(message.createdAt)
            .tz("Europe/Paris")
            .format("LLLL") +
          "\n**Channel de l'action : **" +
          message.channel +
          `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}` +
          "\n**━━━━━━━━━━━━━━━━━━**"
        ];
        if (
          ItemName === "rolebox" ||
          ItemName === "rôlebox" ||
          ItemName === "rôlekey" ||
          ItemName === "rolekey" ||
          ItemName === "RoleKey" ||
          ItemName === "Rolekey" ||
          ItemName === "RôleKey" ||
          ItemName === "Rôlekey"
        ) {
          userInv.rolekey += 1
                          client.setInv.run(userInv)
          message.channel.send(OkEmbed);
          client.channels.get(`639429893406457896`).send(Logs);
        } else {
          if (ItemName === "customrôle" || ItemName === "customrole") {
            userInv.customrole += 1
                            client.setInv.run(userInv)
            message.channel.send(OkEmbed);
            client.channels.get(`639429893406457896`).send(Logs);
          } else {
            if (ItemName === "légende" || ItemName === "legende") {
              userInv.legende += 1
                              client.setInv.run(userInv)
              message.channel.send(OkEmbed);
              client.channels.get(`639429893406457896`).send(Logs);
            } else {
              if (ItemName === "préstige" || ItemName === "prestige") {
                userInv.prestige += 1
                                client.setInv.run(userInv)
                message.channel.send(OkEmbed);
                client.channels.get(`639429893406457896`).send(Logs);
              } else {
                if (ItemName === "rainbowrôle" || ItemName === "rainbowrole") {
                  userInv.rainbowrole += 1
                                  client.setInv.run(userInv)
                  message.channel.send(OkEmbed);
                  client.channels.get(`639429893406457896`).send(Logs);
                } else {
                  if (
                    ItemName === "animaterôle" ||
                    ItemName === "animaterole"
                  ) {
                    userInv.animaterole += 1
                                    client.setInv.run(userInv)
                    message.channel.send(OkEmbed);
                    client.channels.get(`639429893406457896`).send(Logs);
                  } else {
                    if (
                      ItemName === "v4box" ||
                      ItemName === "boxv4" ||
                      ItemName === "v4" ||
                      ItemName === "v4key" ||
                      ItemName === "keyv4"
                    ) {
                      userInv.v4box += 1
                                      client.setInv.run(userInv)
                      message.channel.send(OkEmbed);
                      client.channels.get(`639429893406457896`).send(Logs);
                    } else {
                      return message.channel.send(NoItem);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
