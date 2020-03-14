const { RichEmbed } = require("discord.js");
const chooseArr = ["🌑", "📰", "✂"];
const fs = require("fs");
const db = require("quick.db");
const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "shifumi",
  alisases: ["chifoumi"],
  category: "RP",
  description:
    "Permet de parier de l'argent <:eclair:639106499515514910> sur une partie de pierre feuille ciseaux",
  usage: "e/shifumi <somme>",
  statut: "cooldown",

  run: async (client, message, args) => {
    const Moneyembed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez entrer un montant valide d'éclairs a parier <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const NoEmbed = new Discord.RichEmbed()
      .setColor("RED") // n'a pas assez d'argent pour en parier autant
      .setDescription(
        "Vous n'avez pas assez d'argent pour en parier autant, bien tenté ! <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!args[0]) return message.channel.send(Moneyembed);
    if (isNaN(args[0])) return message.channel.send(Moneyembed);
    let coins = db.fetch(`money_${message.guild.id}_${message.author.id}`);
    if (coins == null) coins = 0;
    if (parseInt(args[0]) == args[0]) {
      if (coins < args[0]) return message.channel.send(NoEmbed);

      let embed = new Discord.RichEmbed()
        .setColor("f9ff03")
        .setTitle("<:shifumi:656520204569935892> SHIFUMI")
        .addField(
          "🌑: Pierre \n📰: Feuille \n✂: Ciseaux",
          "**Utilisez les réactions sous ce message pour jouer !**"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL);
      const m = await message.channel.send(embed);
      const reacted = await promptMessage(m, message.author, 30, chooseArr);

      const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

      const result = await getResult(reacted, botChoice, args, coins);
      m.edit(result);
      return m.clearReactions();

      async function getResult(me, clientChosen, args, coins) {
        if (
          (me === "🌑" && clientChosen === "✂") ||
          (me === "📰" && clientChosen === "🌑") ||
          (me === "✂" && clientChosen === "📰")
        ) {
          db.add(
            `money_${message.guild.id}_${message.author.id}`,
            parseInt(args[0])
          );
         let coins = db.fetch(`money_${message.guild.id}_${message.author.id}`);
 moment.locale("fr");
            let Logs = [
              "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Partie de flip réalisée__ <:flip:652204956283174942> \n**Nom du joueur :** " +
                message.author +
                " \n**Commande entière :** `" +
                message +
                "` \n**Montant d'argent misé : **" +
                args[0] +
                " <:eclair:639106499515514910> \n**Résultat :** Victoire \n**Argent final après la partie : **" +
                coins +
                " <:eclair:639106499515514910>\n**Date de l'action :** " +
                moment()
                  .utc(message.createdAt)
                  .tz("Europe/Paris")
                  .format("LLLL") +
                "\n**Channel de l'action : **" +
                message.channel +
                "\n**━━━━━━━━━━━━━━━━━━**"
            ];
            client.channels.get(`639429893406457896`).send(Logs);
          let Newembed = new Discord.RichEmbed()
            .setTitle("<:shifumi:656520204569935892> SHIFUMI")
            .addField(
              "Vous avez misé **" + args[0] + "** <:eclair:639106499515514910>",
              "En jouant " + reacted
            )
            .addField(
              "Je choisis " + botChoice,
              "Vous gagnez **" + args[0] + "** <:eclair:639106499515514910>"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("ÉclaryBOT", message.guild.iconURL)
            .setColor("f9ff03");

          return Newembed;
        } else if (me === clientChosen) {
          let Newembed = new Discord.RichEmbed()
            .setTitle("<:shifumi:656520204569935892> SHIFUMI")
            .addField(
              "Vous avez misé **" + args[0] + "** <:eclair:639106499515514910>",
              "En jouant " + reacted
            )
            .addField(
              "Je choisis " + botChoice,
              "C'est une égalité il n'y a pas de perdants/gagnants"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("ÉclaryBOT", message.guild.iconURL)
            .setColor("f9ff03");

          return Newembed;
        } else {
          db.subtract(
            `money_${message.guild.id}_${message.author.id}`,
            parseInt(args[0])
          );

           let coins = db.fetch(`money_${message.guild.id}_${message.author.id}`);

            moment.locale("fr");
            let Logs = [
              "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Partie de flip réalisée__ <:flip:652204956283174942> \n**Nom du joueur :** " +
                message.author +
                " \n**Commande entière :** `" +
                message +
                "` \n**Montant d'argent misé : **" +
                args[0] +
                " <:eclair:639106499515514910> \n**Résultat :** Défaite \n**Argent final après la partie : **" +
                coins +
                " <:eclair:639106499515514910>\n**Date de l'action :** " +
                moment()
                  .utc(message.createdAt)
                  .tz("Europe/Paris")
                  .format("LLLL") +
                "\n**Channel de l'action : **" +
                message.channel +
                "\n**━━━━━━━━━━━━━━━━━━**"
            ];
            client.channels.get(`639429893406457896`).send(Logs);

          let Newembed = new Discord.RichEmbed()
            .setTitle("<:shifumi:656520204569935892> SHIFUMI")
            .addField(
              "Vous avez misé **" + args[0] + "** <:eclair:639106499515514910>",
              "En jouant " + reacted
            )
            .addField(
              "Je choisis " + botChoice,
              "Vous perdez **" + args[0] + "** <:eclair:639106499515514910>"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("ÉclaryBOT", message.guild.iconURL)
            .setColor("f9ff03");

          return Newembed;
        }
      }
      async function promptMessage(message, author, time, validReactions) {
        // We put in the time as seconds, with this it's being transfered to MS
        time *= 1000;

        // For every emoji in the function parameters, react in the good order.
        for (const reaction of validReactions) await message.react(reaction);

        // Only allow reactions from the author,
        // and the emoji must be in the array we provided.
        const filter = (reaction, user) =>
          validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // And ofcourse, await the reactions
        return message
          .awaitReactions(filter, { max: 1, time: time })
          .then(collected => collected.first() && collected.first().emoji.name);
      }
    }
    return message.channel.send(Moneyembed);
  }
};
