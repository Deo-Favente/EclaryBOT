const { RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const moment = require("moment");
const symbol = [
  "<:seven:655519561696804867>",
  "<:clover:655489759493226507>",
  "<:diamond:655527312120610816>",
  "<:watermelon:655489760068108288>",
  "<:lemon:655489759602540574>",
  "<:cherry:655489759271190528>",
  "<:clover:655489759493226507>",
  "<:diamond:655527312120610816>",
  "<:watermelon:655489760068108288>",
  "<:lemon:655489759602540574>",
  "<:cherry:655489759271190528>"
];

module.exports = {
  name: "slot",
  aliases: [
    "slots",
    "slotmachine",
    "slotsmachines",
    "slotsmachine",
    "slotmachines"
  ],
  category: "Rp",
  description:
    "Permet de parier des éclairs <:eclair:639106499515514910> sur un tour de machine à sous",
  usage: "e/slot <Montant>",
  statut: "cooldown",
  run: async (client, message, args) => {
    const Moneyembed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez entrer un montant d'éclairs valide à parier <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const NoEmbed = new Discord.RichEmbed()
      .setColor("RED")
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

      let s1 = symbol[Math.floor(Math.random() * symbol.length)];
      let s2 = symbol[Math.floor(Math.random() * symbol.length)];
      let s3 = symbol[Math.floor(Math.random() * symbol.length)];
      let row = `${s1}|${s2}|${s3} <a:left:658069590705700893>`;

      const Slot = new RichEmbed()
        .setColor("f9ff03")
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL)
        .setTitle(" <:slotmachine:652205348685348884> MACHINE A SOUS");

      Slot.setDescription(
        symbol[Math.floor(Math.random() * symbol.length)] +
          "|" +
          symbol[Math.floor(Math.random() * symbol.length)] +
          "|" +
          symbol[Math.floor(Math.random() * symbol.length)] +
          "\n" +
          symbol[Math.floor(Math.random() * symbol.length)] +
          "|" +
          symbol[Math.floor(Math.random() * symbol.length)] +
          "|" +
          symbol[Math.floor(Math.random() * symbol.length)] +
          "<a:left:658069590705700893>\n" +
          symbol[Math.floor(Math.random() * symbol.length)] +
          "|" +
          symbol[Math.floor(Math.random() * symbol.length)] +
          "|" +
          symbol[Math.floor(Math.random() * symbol.length)]
      );
      message.channel.send(Slot).then(msg => {
        setTimeout(function() {
          Slot.setDescription(
            symbol[Math.floor(Math.random() * symbol.length)] +
              "|" +
              symbol[Math.floor(Math.random() * symbol.length)] +
              "|" +
              symbol[Math.floor(Math.random() * symbol.length)] +
              "\n" +
              symbol[Math.floor(Math.random() * symbol.length)] +
              "|" +
              symbol[Math.floor(Math.random() * symbol.length)] +
              "|" +
              symbol[Math.floor(Math.random() * symbol.length)] +
              "<a:left:658069590705700893>\n" +
              symbol[Math.floor(Math.random() * symbol.length)] +
              "|" +
              symbol[Math.floor(Math.random() * symbol.length)] +
              "|" +
              symbol[Math.floor(Math.random() * symbol.length)]
          );
          msg.edit(Slot).then(msg => {
            setTimeout(function() {
              Slot.setDescription(
                symbol[Math.floor(Math.random() * symbol.length)] +
                  "|" +
                  symbol[Math.floor(Math.random() * symbol.length)] +
                  "|" +
                  symbol[Math.floor(Math.random() * symbol.length)] +
                  "\n" +
                  symbol[Math.floor(Math.random() * symbol.length)] +
                  "|" +
                  symbol[Math.floor(Math.random() * symbol.length)] +
                  "|" +
                  symbol[Math.floor(Math.random() * symbol.length)] +
                  "<a:left:658069590705700893>\n" +
                  symbol[Math.floor(Math.random() * symbol.length)] +
                  "|" +
                  symbol[Math.floor(Math.random() * symbol.length)] +
                  "|" +
                  symbol[Math.floor(Math.random() * symbol.length)]
              );
              msg.edit(Slot).then(msg => {
                setTimeout(function() {
                  Slot.setDescription(
                    symbol[Math.floor(Math.random() * symbol.length)] +
                      "|" +
                      symbol[Math.floor(Math.random() * symbol.length)] +
                      "|" +
                      symbol[Math.floor(Math.random() * symbol.length)] +
                      "\n" +
                      symbol[Math.floor(Math.random() * symbol.length)] +
                      "|" +
                      symbol[Math.floor(Math.random() * symbol.length)] +
                      "|" +
                      symbol[Math.floor(Math.random() * symbol.length)] +
                      "<a:left:658069590705700893>\n" +
                      symbol[Math.floor(Math.random() * symbol.length)] +
                      "|" +
                      symbol[Math.floor(Math.random() * symbol.length)] +
                      "|" +
                      symbol[Math.floor(Math.random() * symbol.length)]
                  );
                  msg.edit(Slot).then(msg => {
                    setTimeout(function() {
                      Slot.setDescription(
                        symbol[Math.floor(Math.random() * symbol.length)] +
                          "|" +
                          symbol[Math.floor(Math.random() * symbol.length)] +
                          "|" +
                          symbol[Math.floor(Math.random() * symbol.length)] +
                          "\n" +
                          symbol[Math.floor(Math.random() * symbol.length)] +
                          "|" +
                          symbol[Math.floor(Math.random() * symbol.length)] +
                          "|" +
                          symbol[Math.floor(Math.random() * symbol.length)] +
                          "<a:left:658069590705700893>\n" +
                          symbol[Math.floor(Math.random() * symbol.length)] +
                          "|" +
                          symbol[Math.floor(Math.random() * symbol.length)] +
                          "|" +
                          symbol[Math.floor(Math.random() * symbol.length)]
                      );
                      msg.edit(Slot).then(msg => {
                        setTimeout(function() {
                          Slot.setDescription(
                            symbol[Math.floor(Math.random() * symbol.length)] +
                              "|" +
                              symbol[
                                Math.floor(Math.random() * symbol.length)
                              ] +
                              "|" +
                              symbol[
                                Math.floor(Math.random() * symbol.length)
                              ] +
                              "\n" +
                              symbol[
                                Math.floor(Math.random() * symbol.length)
                              ] +
                              "|" +
                              symbol[
                                Math.floor(Math.random() * symbol.length)
                              ] +
                              "|" +
                              symbol[
                                Math.floor(Math.random() * symbol.length)
                              ] +
                              "<a:left:658069590705700893>\n" +
                              symbol[
                                Math.floor(Math.random() * symbol.length)
                              ] +
                              "|" +
                              symbol[
                                Math.floor(Math.random() * symbol.length)
                              ] +
                              "|" +
                              symbol[Math.floor(Math.random() * symbol.length)]
                          );
                          msg.edit(Slot).then(msg => {
                            setTimeout(function() {
                              Slot.setDescription(
                                symbol[
                                  Math.floor(Math.random() * symbol.length)
                                ] +
                                  "|" +
                                  symbol[
                                    Math.floor(Math.random() * symbol.length)
                                  ] +
                                  "|" +
                                  symbol[
                                    Math.floor(Math.random() * symbol.length)
                                  ] +
                                  "\n" +
                                  symbol[
                                    Math.floor(Math.random() * symbol.length)
                                  ] +
                                  "|" +
                                  symbol[
                                    Math.floor(Math.random() * symbol.length)
                                  ] +
                                  "|" +
                                  symbol[
                                    Math.floor(Math.random() * symbol.length)
                                  ] +
                                  "<a:left:658069590705700893>\n" +
                                  symbol[
                                    Math.floor(Math.random() * symbol.length)
                                  ] +
                                  "|" +
                                  symbol[
                                    Math.floor(Math.random() * symbol.length)
                                  ] +
                                  "|" +
                                  symbol[
                                    Math.floor(Math.random() * symbol.length)
                                  ]
                              );
                              msg.edit(Slot).then(msg => {
                                setTimeout(function() {
                                  Slot.setDescription(
                                    symbol[
                                      Math.floor(Math.random() * symbol.length)
                                    ] +
                                      "|" +
                                      symbol[
                                        Math.floor(
                                          Math.random() * symbol.length
                                        )
                                      ] +
                                      "|" +
                                      symbol[
                                        Math.floor(
                                          Math.random() * symbol.length
                                        )
                                      ] +
                                      "\n" +
                                      symbol[
                                        Math.floor(
                                          Math.random() * symbol.length
                                        )
                                      ] +
                                      "|" +
                                      symbol[
                                        Math.floor(
                                          Math.random() * symbol.length
                                        )
                                      ] +
                                      "|" +
                                      symbol[
                                        Math.floor(
                                          Math.random() * symbol.length
                                        )
                                      ] +
                                      "<a:left:658069590705700893>\n" +
                                      symbol[
                                        Math.floor(
                                          Math.random() * symbol.length
                                        )
                                      ] +
                                      "|" +
                                      symbol[
                                        Math.floor(
                                          Math.random() * symbol.length
                                        )
                                      ] +
                                      "|" +
                                      symbol[
                                        Math.floor(
                                          Math.random() * symbol.length
                                        )
                                      ]
                                  );
                                  msg.edit(Slot).then(msg => {
                                    setTimeout(function() {
                                      Slot.setDescription(
                                        symbol[
                                          Math.floor(
                                            Math.random() * symbol.length
                                          )
                                        ] +
                                          "|" +
                                          symbol[
                                            Math.floor(
                                              Math.random() * symbol.length
                                            )
                                          ] +
                                          "|" +
                                          symbol[
                                            Math.floor(
                                              Math.random() * symbol.length
                                            )
                                          ] +
                                          "\n" +
                                          symbol[
                                            Math.floor(
                                              Math.random() * symbol.length
                                            )
                                          ] +
                                          "|" +
                                          symbol[
                                            Math.floor(
                                              Math.random() * symbol.length
                                            )
                                          ] +
                                          "|" +
                                          symbol[
                                            Math.floor(
                                              Math.random() * symbol.length
                                            )
                                          ] +
                                          "<a:left:658069590705700893>\n" +
                                          symbol[
                                            Math.floor(
                                              Math.random() * symbol.length
                                            )
                                          ] +
                                          "|" +
                                          symbol[
                                            Math.floor(
                                              Math.random() * symbol.length
                                            )
                                          ] +
                                          "|" +
                                          symbol[
                                            Math.floor(
                                              Math.random() * symbol.length
                                            )
                                          ]
                                      );
                                      msg.edit(Slot).then(msg => {
                                        setTimeout(function() {
                                          Slot.setDescription(
                                            symbol[
                                              Math.floor(
                                                Math.random() * symbol.length
                                              )
                                            ] +
                                              "|" +
                                              symbol[
                                                Math.floor(
                                                  Math.random() * symbol.length
                                                )
                                              ] +
                                              "|" +
                                              symbol[
                                                Math.floor(
                                                  Math.random() * symbol.length
                                                )
                                              ] +
                                              "\n" +
                                              symbol[
                                                Math.floor(
                                                  Math.random() * symbol.length
                                                )
                                              ] +
                                              "|" +
                                              symbol[
                                                Math.floor(
                                                  Math.random() * symbol.length
                                                )
                                              ] +
                                              "|" +
                                              symbol[
                                                Math.floor(
                                                  Math.random() * symbol.length
                                                )
                                              ] +
                                              "<a:left:658069590705700893>\n" +
                                              symbol[
                                                Math.floor(
                                                  Math.random() * symbol.length
                                                )
                                              ] +
                                              "|" +
                                              symbol[
                                                Math.floor(
                                                  Math.random() * symbol.length
                                                )
                                              ] +
                                              "|" +
                                              symbol[
                                                Math.floor(
                                                  Math.random() * symbol.length
                                                )
                                              ]
                                          );
                                          msg.edit(Slot).then(msg => {
                                            setTimeout(function() {
                                              Slot.setDescription(
                                                symbol[
                                                  Math.floor(
                                                    Math.random() *
                                                      symbol.length
                                                  )
                                                ] +
                                                  "|" +
                                                  symbol[
                                                    Math.floor(
                                                      Math.random() *
                                                        symbol.length
                                                    )
                                                  ] +
                                                  "|" +
                                                  symbol[
                                                    Math.floor(
                                                      Math.random() *
                                                        symbol.length
                                                    )
                                                  ] +
                                                  "\n" +
                                                  symbol[
                                                    Math.floor(
                                                      Math.random() *
                                                        symbol.length
                                                    )
                                                  ] +
                                                  "|" +
                                                  symbol[
                                                    Math.floor(
                                                      Math.random() *
                                                        symbol.length
                                                    )
                                                  ] +
                                                  "|" +
                                                  symbol[
                                                    Math.floor(
                                                      Math.random() *
                                                        symbol.length
                                                    )
                                                  ] +
                                                  "<a:left:658069590705700893>\n" +
                                                  symbol[
                                                    Math.floor(
                                                      Math.random() *
                                                        symbol.length
                                                    )
                                                  ] +
                                                  "|" +
                                                  symbol[
                                                    Math.floor(
                                                      Math.random() *
                                                        symbol.length
                                                    )
                                                  ] +
                                                  "|" +
                                                  symbol[
                                                    Math.floor(
                                                      Math.random() *
                                                        symbol.length
                                                    )
                                                  ]
                                              );
                                              msg.edit(Slot).then(msg => {
                                                setTimeout(function() {
                                                  Slot.setDescription(
                                                    symbol[
                                                      Math.floor(
                                                        Math.random() *
                                                          symbol.length
                                                      )
                                                    ] +
                                                      "|" +
                                                      symbol[
                                                        Math.floor(
                                                          Math.random() *
                                                            symbol.length
                                                        )
                                                      ] +
                                                      "|" +
                                                      symbol[
                                                        Math.floor(
                                                          Math.random() *
                                                            symbol.length
                                                        )
                                                      ] +
                                                      `\n${row}\n` +
                                                      symbol[
                                                        Math.floor(
                                                          Math.random() *
                                                            symbol.length
                                                        )
                                                      ] +
                                                      "|" +
                                                      symbol[
                                                        Math.floor(
                                                          Math.random() *
                                                            symbol.length
                                                        )
                                                      ] +
                                                      "|" +
                                                      symbol[
                                                        Math.floor(
                                                          Math.random() *
                                                            symbol.length
                                                        )
                                                      ]
                                                  );
                                                  msg.edit(Slot).then(msg => {
                                                    setTimeout(function() {
                                                      result(
                                                        s1,
                                                        s2,
                                                        s3,
                                                        message,
                                                        args,
                                                        msg
                                                      );
                                                    }, 2500);
                                                  });
                                                }, 300);
                                              });
                                            }, 300);
                                          });
                                        }, 300);
                                      });
                                    }, 300);
                                  });
                                }, 300);
                              });
                            }, 300);
                          });
                        }, 300);
                      });
                    }, 300);
                  });
                }, 300);
              });
            }, 300);
          });
        }, 300);
      });
    } else return message.channel.send(Moneyembed);

    async function result(s1, s2, s3, message, args, msg) {
      const SlotPerdu = new RichEmbed()
        .setColor("f9ff03")
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL)
        .setTitle(" <:slotmachine:652205348685348884> MACHINE A SOUS")
        .addField(
          "Vous avez parié **" + args[0] + "** <:eclair:639106499515514910>",
          "Le résultat est :"
        )
        .addField(
          "" + s1 + "|" + s2 + "|" + s3 + "<a:left:658069590705700893>",
          "Vous perdez **" + args[0] + "** <:eclair:639106499515514910>"
        );

      const Slot2 = new RichEmbed()
        .setColor("f9ff03")
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL)
        .setTitle(" <:slotmachine:652205348685348884> MACHINE A SOUS")
        .addField(
          "Vous avez parié **" + args[0] + "** <:eclair:639106499515514910>",
          "Le résultat est :"
        )
        .addField(
          "" + s1 + "|" + s2 + "|" + s3 + "<a:left:658069590705700893>",
          "Vous gagnez **" + args[0] + "** <:eclair:639106499515514910>"
        );

      const Slot3 = new RichEmbed()
        .setColor("f9ff03")
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL)
        .setTitle(" <:slotmachine:652205348685348884> MACHINE A SOUS")
        .addField(
          "Vous avez parié **" + args[0] + "** <:eclair:639106499515514910>",
          "Le résultat est :"
        )
        .addField(
          "" + s1 + "|" + s2 + "|" + s3 + "<a:left:658069590705700893>",
          "Vous gagnez **" + args[0] * 2 + "** <:eclair:639106499515514910>"
        );

      if ((s1 == s2) == s3) {
        const toAdd = parseInt(args[0]) * 2;
        db.add(`money_${message.guild.id}_${message.author.id}`, toAdd);
        msg.edit(Slot2);
        let coins = db.fetch(`money_${message.guild.id}_${message.author.id}`);
        moment.locale("fr");
        let LogsWin3 = [
          "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Partie de slot réalisée__ <:slotmachine:652205348685348884> \n**Nom du joueur :** " +
            message.author +
            " \n**Commande entière :** `" +
            message +
            "` \n**Montant d'argent misé : **" +
            args[0] +
            " <:eclair:639106499515514910> \n**Résultat :** Victoire, mise x3 \n**Argent final après la partie : **" +
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
        client.channels.get(`639429893406457896`).send(LogsWin3);
      } else if (s1 == s2 || s1 == s3 || s2 == s3) {
        const toAdd = parseInt(args[0]);
        db.add(`money_${message.guild.id}_${message.author.id}`, toAdd);
        msg.edit(Slot2);
        let coins = db.fetch(`money_${message.guild.id}_${message.author.id}`);

        moment.locale("fr");
        let LogsWin2 = [
          "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Partie de slot réalisée__ <:slotmachine:652205348685348884> \n**Nom du joueur :** " +
            message.author +
            " \n**Commande entière :** `" +
            message +
            "` \n**Montant d'argent misé : **" +
            args[0] +
            " <:eclair:639106499515514910> \n**Résultat :** Victoire, mise x2 \n**Argent final après la partie : **" +
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

        client.channels.get(`639429893406457896`).send(LogsWin2);
      } else {
        const toAdd = parseInt(args[0]);
        db.subtract(`money_${message.guild.id}_${message.author.id}`, toAdd);
        msg.edit(SlotPerdu);
        let coins = db.fetch(`money_${message.guild.id}_${message.author.id}`);
        moment.locale("fr");
        let LogsLost = [
          "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Partie de slot réalisée__ <:slotmachine:652205348685348884> \n**Nom du joueur :** " +
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

        client.channels.get(`639429893406457896`).send(LogsLost);
      }
    }
  }
};
