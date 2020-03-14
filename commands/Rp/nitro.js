const Discord = require("discord.js");
const fs = require("fs");
const Nitro = require("../DataBase/Assets/Time/nitro.json");
const Stats = require("../DataBase/Datas/RP/Stats/nitro.json");
const Init = require("../../handlers/init.js");
const moment = require("moment");


module.exports = {
  name: "nitro",
  aliases: ["nitrogen", "gennitro"],
  category: "Rp",
  description:
    "Génère un code nitro aléatoire qui a une chance d'être valide ! \n(<:warn:654704623231434752> Avantage payant des <@&605475764422443023> et <@&631496069200740403>, ne fonctionne qu'en <#628956032420282388> )",
  usage: "e/nitro",
  statut: "on",
  run: async (client, message, args) => {
    if (!Nitro[message.author.id]) {
      Nitro[message.author.id] = {
        time: 0,
      }
    }

    if (
      message.member.roles.has("605475764422443023") ||
      message.member.roles.has("658330871593697281") ||
      message.member.roles.has("631496069200740403") ||
      message.member.roles.has("658330868590444583") ||
      message.member.roles.has("634768128127139840") ||
      message.member.hasPermission("ADMINISTRATOR")
    ) {
      if (message.channel.id === "628956032420282388") {
        Init(message.author);

        if (
          message.member.roles.has("605475764422443023") ||
          message.member.roles.has("658330871593697281")
        ) {
          var timeout = 21600000;
        }

        if (
          message.member.roles.has("631496069200740403") ||
          message.member.roles.has("658330868590444583")
        ) {
          var timeout = 1800000;
        }
        if (
          message.member.roles.has("631496069200740403") ||
          message.member.roles.has("658330868590444583")
        ) {
          var timeout = 1800000;
        }
        if (
          message.member.hasPermission("ADMINISTRATOR")
        ) {
          var timeout = 0;
        }

        if (Nitro[message.author.id].time > Date.now()) {
          let milliseconds = Nitro[message.author.id].time - Date.now();

          //Get hours from milliseconds
          var hours = milliseconds / (1000 * 60 * 60);
          var absoluteHours = Math.floor(hours);
          var h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

          //Get remainder from hours and convert to minutes
          var minutes = (hours - absoluteHours) * 60;
          var absoluteMinutes = Math.floor(minutes);
          var m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

          //Get remainder from minutes and convert to seconds
          var seconds = (minutes - absoluteMinutes) * 60;
          var absoluteSeconds = Math.floor(seconds);
          var s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

          var time = h + "h " + m + "m " + s + "s ";

          const TimeEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
              "Vous avez déja utilisé cette commande <:no:648627916317392936> \nVous devez encore attendre **" +
              time +
              "** pour la faire à nouveau <:time:656498169718505492>"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("ÉclaryBOT", message.guild.iconURL);

          message.channel.send(TimeEmbed).then(msg => {
            msg.delete(15000);
          });
        } else {
          var ntr = timeout + Date.now();
          Nitro[message.author.id].time = ntr;
          console.log(ntr)
          nitro(message, client);
        }

        fs.writeFile(
          "./commands/DataBase/Assets/Time/nitro.json",
          JSON.stringify(Nitro),
          err => {
            if (err) console.log(err);
          }
        );
      } else {
        const ErrorEmbed = new Discord.RichEmbed()
          .setColor("RED")
          .setDescription(
            "Vous faites cette commande de le mauvais channel <:no:648627916317392936>\nIl faut vous rendre dans le channel <#628956032420282388> pour exécuter celle-ci <:here:657187989742419978>"
          )
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL);

        message.channel.send(ErrorEmbed);
      }
    } else {
      const RoleEmbed = new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(
          "Vous ne pouvez plus exécuter cette commande <:no:648627916317392936>\n Il faut être <@&605475764422443023> ou <@&631496069200740403> pour la refaire à l'infini"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL);

      message.channel.send(RoleEmbed);
    }
  }
};

function nitro(message, client) {
  Stats.nitro = Stats.nitro + 1;
  fs.writeFile(
    "./commands/DataBase/Datas/RP/Stats/nitro.json",
    JSON.stringify(Stats),
    err => {
      if (err) console.log(err);
    }
  );

  let member = message.guild.member(message.author.id);

  let nitrochat = new Discord.RichEmbed()
    .setTitle("<:HappyNitro:656522093831389198> NITRO")
    .setColor("f9ff03")
    .setDescription(
      "Lien envoyé en MP, éspérons que vous ayez gagné un code nitro valide ! <:yes:648627916690685962>"
    )
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setTimestamp()
    .setFooter("ÉclaryBOT", message.guild.iconURL);

  let nitro = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];
  let nitroembed =
    "https://discord.gift/" +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)] +
    nitro[Math.floor(Math.random() * nitro.length)];

  moment.locale("fr")
  let Logs = [
    "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Nitro généré__ <:HappyNitro:656522093831389198> \n**Nom du joueur :** " +
    message.author.tag + " (" + message.author.id +
    ") \n**Commande entière :** `" +
    message +
    "`\n**Date de l'action :** " +
    moment()
      .utc(message.createdAt)
      .tz("Europe/Paris")
      .format("LLLL") +
    "\n**Channel de l'action : **" +
    message.channel + `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
    +
    "\n**━━━━━━━━━━━━━━━━━━**"
  ];

  message.channel.send(nitrochat);
  message.delete();
  message.author.send(
    "<:warn:654704623231434752> **CECI EST UN GEN NITRO __UNCHEKED__, NOUS NE VÉRIFIONS PAS LA VALIDITÉ DES CODES** <:warn:654704623231434752> \n*Merci de ne donc pas crier au fake* \n" +
    nitroembed
  );
  member.removeRole(`634768128127139840`);

  client.channels.get(`633748381654581261`).send(Logs);
}
