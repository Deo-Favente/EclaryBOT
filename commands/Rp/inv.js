const Discord = require("discord.js");
const Key = require("../DataBase/Datas/RP/Inventory/key.json");
const fs = require("fs");
const Role = require("../DataBase/Datas/RP/Inventory/role.json");
const moment = require("moment");
const Init = require("../../handlers/init.js");

module.exports = {
  name: "inv",
  aliases: ["inventory"],
  category: "Rp",
  description:
    "Affiche l'inventaire, avec tout les items possédés de l'utilisateur",
  usage: "e/inv [@user]",
  statut: "on",
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    // Fetch Inventory DB
    let userInv = client.getInv.get(message.author.id, message.guild.id)
    if (!userInv) {
      userInv = { id: `${message.author.id}-${message.guild.id}`, user: message.author.id, guild: message.guild.id, rolekey: 0, v4box: 0, customrole: 0, legende: 0, prestige: 0, rainbowrole: 0, animaterole: 0 }
    }

    let inventoryEmbed = new Discord.RichEmbed()
      .setColor("f9ff03")
      .setAuthor(user.tag, user.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setTitle("<:inventory:655552298852024330> INVENTAIRE")
      .addField(
        "**<:boxkey:652202101862170624> Clés de box <:boxkey:652202101862170624>**",
        "<:yellow_present:640144879044919299> Clé de box Grade : (`RoleKey`)** " +
        userInv.rolekey +
        "**\n<:blue_present:640144840461647902> Box V4 : (`V4Box`)** " +
        userInv.v4box +
        "** ",
        true
      )
      .addField(
        "**<:role:652202102537322497> Roles <:role:652202102537322497>**",
        `<:custom:657348326328500224> Grade Custom : (\`CustomRole\`) **` +
        userInv.customrole +
        "**\n<:legende:655486269102620712> Grade Légende : (`Légende`) **" +
        userInv.legende +
        "**\n<:prestige:655486268783722537> Grade Préstige : (`Préstige`) **" +
        userInv.prestige +
        "**\n<:rainbow:660926533371822120> Grade Rainbow : (`RainbowRole`) **" +
        userInv.rainbowrole +
        "**\n<:animation:660926789241274379> Grade Animé : (`AnimateRole`) **" +
        userInv.animaterole +
        "**"
      );

    message.channel.send(inventoryEmbed);

    /*moment.locale("fr");
    let Logs = [
      "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Inventaire consulté__ <:inventory:655552298852024330> \n**Nom du joueur :** " +
      user.tag +
      " (" +
      user.id +
      ") \n**Commande entière :** `" +
      message +
      "` \n**Inventaire actuel :** \nRole Key " +
      Key[user.id].RoleKey +
      "\nV4 Key " +
      Key[user.id].BoxV4 +
      "\nCustom Role " +
      Role[user.id].CustomRole +
      "\nLégende " +
      Role[user.id].Legende +
      "\nPréstige " +
      Role[user.id].Prestige +
      "\nRainbowRole " +
      Role[user.id].RainbowRole +
      "\nAnimateRole " +
      Role[user.id].AnimateRole +
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
    client.channels.get(`639429893406457896`).send(Logs);*/
  }
};
