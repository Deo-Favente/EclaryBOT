const { RichEmbed } = require("discord.js");
const { writeFile } = require("fs");
const Daily = require("../DataBase/Assets/Time/daily.json");
const Embed = require("../../handlers/embed.js");
const Init = require("../../handlers/init.js");
const Stats = require("../../handlers/stats.js");
const db = require("quick.db");
const moment = require("moment-timezone");
let timeout = 86400000;

module.exports = {
  name: "daily",
  aliases: ["day"],
  category: "Rp",
  description:
    "Donne une récompense quotidienne (toutes les 24h), qui se situe entre 20 et 100 <:eclair:639106499515514910>",
  usage: "e/daily",
  statut: "on",
  run: async (client, message, args) => {
    //Init
    Init(message.author);

    //Function
    if (Daily[message.author.id].time > Date.now()) {
      let milliseconds = Daily[message.author.id].time - Date.now();

      //Time Format
      var hours = milliseconds / (1000 * 60 * 60);
      var absoluteHours = Math.floor(hours);
      var h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

      var minutes = (hours - absoluteHours) * 60;
      var absoluteMinutes = Math.floor(minutes);
      var m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

      var seconds = (minutes - absoluteMinutes) * 60;
      var absoluteSeconds = Math.floor(seconds);
      var s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

      //Info
      let time = h + "h " + m + "m " + s + "s ";
      message.channel.send(Embed("AlreadyDaily", message, time))
    } else {
      //Info + DB
      let amount = Math.floor(Math.random() * 80) + 20;
      message.channel.send(Embed("DailyReward", message, amount));

      Daily[message.author.id].time = Date.now() + timeout;
      writeFile("./commands/DataBase/Assets/Time/daily.json", JSON.stringify(Daily), err => { if (err) console.log(err); });

      db.add(`money_${message.guild.id}_${message.author.id}`, amount);

      //Stats
      Stats("DailyReward", message.author.id, amount);

      //Logs obsoléte
       let money = db.fetch(`money_${message.guild.id}_${message.author.id}`);
       let Logs = [
        "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Daily réalisé__ <:truck:657197113448333323> \n**Nom du joueur :** " +
          message.author.tag + " (" + message.author.id +
          ") \n**Commande entière :** `" +
          message +
          "` \n**Montant d'argent récupéré : **" +
          amount +
          " <:eclair:639106499515514910> \n**Argent final :** " +
          money +
          " <:eclair:639106499515514910> \n**Date de l'action :** " +
          moment()
            .utc(message.createdAt)
            .tz("Europe/Paris")
            .format("LLLL") +
          "\n**Channel de l'action : **" +
          message.channel + `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id} \n **━━━━━━━━━━━━━━━━━━**`
      ];
       client.channels.get(`639429893406457896`).send(Logs);

    }
  }
};
