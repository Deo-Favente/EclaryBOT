const { RichEmbed } = require("discord.js");
const chooseArr = ["647496774730252318", "647496774566674443"];
const db = require("quick.db");
const moment = require("moment");

module.exports = {
  name: "flip",
  aliases: ["coinflip"],
  category: "Rp",
  description:
    "Permet de parier des éclairs <:eclair:639106499515514910> sur une partie de pile ou face pour tenter de gagner le double ! (ou de tout perdre...)",
  usage: "e/flip <montant>",
  statut: "on",
  run: async (client, message, args) => {
    let coins = db.fetch(`money_${message.guild.id}_${message.author.id}`);
    const Moneyembed = new RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez préciser un montant d'éclairs valide à parier <:no:648627916317392936> \nPour plus d'informations utilise la commande `e/info <Commande>` <:info:651876257386201090>"
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

    if (!args[0]) return message.channel.send(Moneyembed);
    if (isNaN(args[0])) return message.channel.send(Moneyembed);
    if (coins == null) coins = 0;
    if (parseInt(args[0]) == args[0]) {
      if (coins < args[0]) return message.channel.send(NoEmbed);
      if (args[0] < 1) return message.channel.send(Moneyembed);

      let embed = new RichEmbed()
        .setColor("f9ff03")
        .setTitle("<:flip:652204956283174942> FLIP")
        .addField(
          "<:pile:647496774730252318>: Pile \n<:face:647496774566674443>: Face",
          "**Utilise les réactions sous ce message pour jouer !**"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL);

      const m = await message.channel.send(embed);

      m.react("647496774566674443");
      m.react("647496774730252318");

      const filter = (reaction, user) => {
        return (
          ["647496774730252318", "647496774566674443"].includes(
            reaction.emoji.id
          ) && user.id === message.author.id
        );
      };
      m.awaitReactions(filter, { max: 1, time: 3000000, errors: ["time"] })
        .then(collected => {
          const reaction = collected.first();
          var flip = Math.random() * 100;
          // message.channel.send(flip);
          if (flip >= 52.5) {
            let embed = new RichEmbed()
              .setTitle("<:flip:652204956283174942> COIN FLIP")
              .addField(
                "Vous avez misé **" +
                  args[0] +
                  "** <:eclair:639106499515514910>",
                `En éspérant que la pièce tombe sur **${reaction.emoji}**`
              )
              .addField(
                `La pièce tombe sur **${reaction.emoji}** `,
                "Vous gagnez **" + args[0] + "** <:eclair:639106499515514910>"
              )
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setTimestamp()
              .setFooter("ÉclaryBOT", message.guild.iconURL)
              .setColor("f9ff03");

            db.add(
              `money_${message.guild.id}_${message.author.id}`,
              parseInt(args[0])
            );
            m.edit(embed);
            let coins = db.fetch(
              `money_${message.guild.id}_${message.author.id}`
            );

            moment.locale("fr");
            let Logs = [
              "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Partie de flip réalisée__ <:flip:652204956283174942> \n**Nom du joueur :** " +
                message.author.tag + " ("+ message.author.id + 
                ") \n**Commande entière :** `" +
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
                message.channel + `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
+
                "\n**━━━━━━━━━━━━━━━━━━**"
            ];
            client.channels.get(`639429893406457896`).send(Logs);
            return m.clearReactions();
          } else {
            let embed = new RichEmbed()
              .setTitle("<:flip:652204956283174942> COIN FLIP")
              .addField(
                "Vous avez misé **" +
                  args[0] +
                  "** <:eclair:639106499515514910>",
                `En éspérant que la pièce tombe sur **${reaction.emoji}**`
              )
              .addField(
                `La pièce n'est pas tombée sur **${reaction.emoji}** `,
                "Vous perdez **" + args[0] + "** <:eclair:639106499515514910>"
              )
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setTimestamp()
              .setFooter("ÉclaryBOT", message.guild.iconURL)
              .setColor("f9ff03");

            db.subtract(
              `money_${message.guild.id}_${message.author.id}`,
              parseInt(args[0])
            );
            m.edit(embed);
            let coins = db.fetch(
              `money_${message.guild.id}_${message.author.id}`
            );

            moment.locale("fr");
            let Logs = [
              "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Partie de flip réalisée__ <:flip:652204956283174942> \n**Nom du joueur :** " +
                message.author.tag + " (" + message.author.id +
                ") \n**Commande entière :** `" +
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
                message.channel + `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
 +
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
