const { RichEmbed } = require("discord.js");
const Embed = require("../../handlers/embed.js");
const chooseArr = [
  "658007789490405393",
  "658007789377159168",
  "658007788856803354",
  "658007788622053439",
  "658007788836093962",
  "658007789607583775"
];
const moment = require("moment");
const db = require("quick.db");

module.exports = {
  name: "dice",
  aliases: ["dé"],
  category: "Rp",
  description:
    "Permet de parier des éclairs <:eclair:639106499515514910> sur un lancé de dé pour tenter de gagner le double ! (ou de tout perdre...)",
  usage: "e/dice <montant>",
  statut: "cooldown",
  run: async (client, message, args) => {
    let coins = db.fetch(`money_${message.guild.id}_${message.author.id}`);

    const Moneyembed = new RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez préciser un montant d'éclairs valide à parier <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    const NoEmbed = new RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous n'avez pas assez d'argent pour en parier autant <:no:648627916317392936> \nVotre solde actuel est de **" +
          coins +
          "** <:eclair:639106499515514910> \nPlus d'informations avec la commande `e/money` <:bag:648629855847579658>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    const TempsEmbed = new RichEmbed()
      .setColor("RED")
      .setDescription(
        message.author +
          ", vous avez mis trop de temps a choisir une réaction <:no:648627916317392936> \nLa partie est annulée <:stop:656500221727211520>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    //Money Check
    if (!args[0]) return message.channel.send(Moneyembed);
    if (isNaN(args[0])) return message.channel.send(Moneyembed);
    if (coins == null) coins = 0;
    if (parseInt(args[0]) == args[0]) {
      if (coins < args[0]) return message.channel.send(NoEmbed);

      let m = await message.channel.send(Embed("StartDice", message));

      //Mesage React
      m.react("658007789490405393").then(msg => {
        setTimeout(function() {
          m.react("658007789377159168").then(msg => {
            setTimeout(function() {
              m.react("658007788856803354").then(msg => {
                setTimeout(function() {
                  m.react("658007788622053439").then(msg => {
                    setTimeout(function() {
                      m.react("658007788836093962").then(msg => {
                        setTimeout(function() {
                          m.react("658007789607583775");
                        }, 500);
                      });
                    }, 500);
                  });
                }, 500);
              });
            }, 500);
          });
        }, 500);
      });

      //Reaction Listener
      let me = chooseArr[Math.floor(Math.random() * chooseArr.length)];
      // message.channel.send(me)

      const filter = (reaction, user) => {
        return (
          [
            "658007789490405393",
            "658007789377159168",
            "658007788856803354",
            "658007788622053439",
            "658007788836093962",
            "658007789607583775"
          ].includes(reaction.emoji.id) && user.id === message.author.id
        );
      };

      m.awaitReactions(filter, { max: 1, time: 3000000, errors: ["time"] })
        .then(collected => {
          const reaction = collected.first();
          if (reaction.emoji.id == me) {
            //Info + DB
            db.add(
              `money_${message.guild.id}_${message.author.id}`,
              parseInt(args[0]) * 4
            );
            m.edit(Embed("WinDice", message, [args[0], reaction.emoji]));
            return m.clearReactions();

            //LOgs Obsoléte
            let user = message.author;
            let coins1 = db.fetch(`money_${message.guild.id}_${user.id}`);

            moment.locale("fr");
            let Logs = [
              "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Partie de dice réalisé__ <:dices:658007789997785113> \n**Nom du joueur :** " +
                message.author.tag +
                "(" +
                message.author.id +
                ") \n**Commande entière :** `" +
                message +
                "` \n**Montant d'argent misé : **" +
                args[0] +
                " <:eclair:639106499515514910> \n**Résultat :** Victoire \n**Argent final après la partie : **" +
                coins1 +
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
          } else {
            //Lost
            db.subtract(
              `money_${message.guild.id}_${message.author.id}`,
              parseInt(args[0])
            );
            m.edit(Embed("LostDice", message, [args[0], reaction.emoji]));

            //LOgs Obsoléte
            let user = message.author;
            let coins1 = db.fetch(`money_${message.guild.id}_${user.id}`);

            moment.locale("fr");
            let Logs = [
              "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Partie de dice réalisée__ <:dices:658007789997785113> \n**Nom du joueur :** " +
                message.author.tag +
                " (" +
                message.author.id +
                ") \n**Commande entière :** `" +
                message +
                "` \n**Montant d'argent misé : **" +
                args[0] +
                " <:eclair:639106499515514910> \n**Résultat :** Défaite \n**Argent final après la partie : **" +
                coins1 +
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
            return m.clearReactions();
          }
        })
        .catch(collected => {
          message.channel.send(TempsEmbed);
        });
    } else return message.channel.send(Moneyembed);
  }
};

async function promptMessage(message, author, time, validReactions) {
  time *= 1000;

  for (const reaction of validReactions) await message.react(reaction);

  const filter = (reaction, user) =>
    validReactions.includes(reaction.emoji.name) && user.id === author.id;

  return message
    .awaitReactions(filter, { max: 1, time: time })
    .then(collected => collected.first() && collected.first().emoji.name);
}
