const Discord = require("discord.js");
const moment = require("moment");
const db = require('quick.db')

module.exports = {
  name: "open",
  aliases: ["opening"],
  category: "Rp",
  description: "Ouvre une box obtenue avec une animation stylée !",
  usage: "e/open <nom>",
  statut: "on",
  run: async (client, message, args) => {
    // Fetch Inventory DB
    let userInv = client.getInv.get(message.author.id, message.guild.id)
    if (!userInv) {
      userInv = { id: `${message.author.id}-${message.guild.id}`, user: message.author.id, guild: message.guild.id, rolekey: 0, v4box: 0, customrole: 0, legende: 0, prestige: 0, rainbowrole: 0, animaterole: 0 }
    }

    let BoxName = message.content.trim().split(/ +/g);
    let BoxId = BoxName.slice(1).join("");
    let BoxNom = BoxId.toLowerCase();

    let ExistName = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "La box `" +
        BoxNom +
        "` n'existe pas <:no:648627916317392936> \nListe des items achetables obtensible avec la commande `e/shop` <:shop:652202101719695453>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    let NoBoxName = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez spécifier le nom de la box que vous voulez ouvrir <:no:648627916317392936> \nListe de vos item obtensible avec la commande `e/inventory` <:inventory:655552298852024330>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const NoEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous n'avez pas de clé `" +
        BoxNom +
        "` a ouvrir, bien tenté ! <:no:648627916317392936> \nListe de vos item obtensible avec la commande `e/inventory` <:inventory:655552298852024330>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!BoxName[1]) return message.channel.send(NoBoxName);

    if (
      BoxNom === "rolebox" ||
      BoxNom === "rôlebox" ||
      BoxNom === "rôlekey" ||
      BoxNom === "rolekey"
    ) {
      if (userInv.rolekey >= 1) {
        userInv.rolekey -= 1
        let present = [
          "<:yellow_present:640144879044919299> ",
          "<:red_present:640144867825156096> ",
          "<:blue_present:640144840461647902> "
        ];

        let GradeBoxEmbed = new Discord.RichEmbed()
          .setColor("f9ff03")
          .setTitle("<:present:655555035899494401> BOX DE GRADE")
          .setDescription(
            present[Math.floor(Math.random() * present.length)] +
            present[Math.floor(Math.random() * present.length)] +
            present[Math.floor(Math.random() * present.length)]
          )
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL);
        message.channel.send(GradeBoxEmbed).then(msg => {
          setTimeout(function () {
            let GradeBoxEmbed = new Discord.RichEmbed()
              .setColor("f9ff03")
              .setTitle("<:present:655555035899494401> BOX DE GRADE")
              .setDescription(
                present[Math.floor(Math.random() * present.length)] +
                present[Math.floor(Math.random() * present.length)] +
                present[Math.floor(Math.random() * present.length)],
                "ÉclaryBOT"
              )
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setTimestamp()
              .setFooter("ÉclaryBOT", message.guild.iconURL);
            msg.edit(GradeBoxEmbed).then(msg => {
              setTimeout(function () {
                let GradeBoxEmbed = new Discord.RichEmbed()
                  .setColor("f9ff03")
                  .setTitle("<:present:655555035899494401> BOX DE GRADE")
                  .setDescription(
                    present[Math.floor(Math.random() * present.length)] +
                    present[Math.floor(Math.random() * present.length)] +
                    present[Math.floor(Math.random() * present.length)],
                    "ÉclaryBOT"
                  )
                  .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setFooter("ÉclaryBOT", message.guild.iconURL);
                msg.edit(GradeBoxEmbed).then(msg => {
                  setTimeout(function () {
                    let GradeBoxEmbed = new Discord.RichEmbed()
                      .setColor("f9ff03")
                      .setTitle("<:present:655555035899494401> BOX DE GRADE")
                      .setDescription(
                        present[Math.floor(Math.random() * present.length)] +
                        present[Math.floor(Math.random() * present.length)] +
                        present[Math.floor(Math.random() * present.length)],
                        "ÉclaryBOT"
                      )
                      .setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL
                      )
                      .setTimestamp()
                      .setFooter("ÉclaryBOT", message.guild.iconURL);
                    msg.edit(GradeBoxEmbed).then(msg => {
                      setTimeout(function () {
                        let GradeBoxEmbed = new Discord.RichEmbed()
                          .setColor("f9ff03")
                          .setTitle(
                            "<:present:655555035899494401> BOX DE GRADE"
                          )
                          .setDescription(
                            present[
                            Math.floor(Math.random() * present.length)
                            ] +
                            present[
                            Math.floor(Math.random() * present.length)
                            ] +
                            present[
                            Math.floor(Math.random() * present.length)
                            ],
                            "ÉclaryBOT"
                          )
                          .setAuthor(
                            message.author.tag,
                            message.author.displayAvatarURL
                          )
                          .setTimestamp()
                          .setFooter("ÉclaryBOT", message.guild.iconURL);
                        msg.edit(GradeBoxEmbed).then(msg => {
                          setTimeout(function () {
                            let GradeBoxEmbed = new Discord.RichEmbed()
                              .setColor("f9ff03")
                              .setTitle(
                                "<:present:655555035899494401> BOX DE GRADE"
                              )
                              .setDescription(
                                present[
                                Math.floor(Math.random() * present.length)
                                ] +
                                present[
                                Math.floor(Math.random() * present.length)
                                ] +
                                present[
                                Math.floor(Math.random() * present.length)
                                ],
                                "ÉclaryBOT"
                              )
                              .setAuthor(
                                message.author.tag,
                                message.author.displayAvatarURL
                              )
                              .setTimestamp()
                              .setFooter("ÉclaryBOT", message.guild.iconURL);
                            msg.edit(GradeBoxEmbed).then(msg => {
                              setTimeout(function () {
                                let GradeBoxEmbed = new Discord.RichEmbed()
                                  .setColor("f9ff03")
                                  .setTitle(
                                    "<:present:655555035899494401> BOX DE GRADE"
                                  )
                                  .setDescription(
                                    present[
                                    Math.floor(Math.random() * present.length)
                                    ] +
                                    present[
                                    Math.floor(
                                      Math.random() * present.length
                                    )
                                    ] +
                                    present[
                                    Math.floor(
                                      Math.random() * present.length
                                    )
                                    ],
                                    "ÉclaryBOT"
                                  )
                                  .setAuthor(
                                    message.author.tag,
                                    message.author.displayAvatarURL
                                  )
                                  .setTimestamp()
                                  .setFooter(
                                    "ÉclaryBOT",
                                    message.guild.iconURL
                                  );
                                msg.edit(GradeBoxEmbed).then(msg => {
                                  setTimeout(function () {
                                    let GradeBoxEmbed = new Discord.RichEmbed()
                                      .setColor("f9ff03")
                                      .setTitle(
                                        "<:present:655555035899494401> BOX DE GRADE"
                                      )
                                      .setDescription(
                                        present[
                                        Math.floor(
                                          Math.random() * present.length
                                        )
                                        ] +
                                        present[
                                        Math.floor(
                                          Math.random() * present.length
                                        )
                                        ] +
                                        present[
                                        Math.floor(
                                          Math.random() * present.length
                                        )
                                        ],
                                        "ÉclaryBOT"
                                      )
                                      .setAuthor(
                                        message.author.tag,
                                        message.author.displayAvatarURL
                                      )
                                      .setTimestamp()
                                      .setFooter(
                                        "ÉclaryBOT",
                                        message.guild.iconURL
                                      );
                                    msg.edit(GradeBoxEmbed).then(msg => {
                                      setTimeout(function () {
                                        let GradeBoxEmbed = new Discord.RichEmbed()
                                          .setColor("f9ff03")
                                          .setTitle(
                                            "<:present:655555035899494401> BOX DE GRADE"
                                          )
                                          .setDescription(
                                            present[
                                            Math.floor(
                                              Math.random() * present.length
                                            )
                                            ] +
                                            present[
                                            Math.floor(
                                              Math.random() * present.length
                                            )
                                            ] +
                                            present[
                                            Math.floor(
                                              Math.random() * present.length
                                            )
                                            ],
                                            "ÉclaryBOT"
                                          )
                                          .setAuthor(
                                            message.author.tag,
                                            message.author.displayAvatarURL
                                          )
                                          .setTimestamp()
                                          .setFooter(
                                            "ÉclaryBOT",
                                            message.guild.iconURL
                                          );
                                        msg.edit(GradeBoxEmbed).then(msg => {
                                          setTimeout(function () {
                                            var gift = Math.random() * 100;
                                            if (gift > 99) {
                                              let recompense =
                                                "Grade Rainbow pendant 1 semaine"; //1%

                                              let GradeBoxFinal = new Discord.RichEmbed()
                                                .setColor("f9ff03")
                                                .setTitle(
                                                  "<:present:655555035899494401> BOX DE GRADE"
                                                )
                                                .setDescription(
                                                  `Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `
                                                )
                                                .setAuthor(
                                                  message.author.tag,
                                                  message.author
                                                    .displayAvatarURL
                                                )
                                                .setTimestamp()
                                                .setFooter(
                                                  "ÉclaryBOT",
                                                  message.guild.iconURL
                                                );
                                              userInv.rainbowrole += 1
                                              client.setInv.run(userInv)

                                              logs(message, recompense, client);
                                              msg.edit(GradeBoxFinal);
                                            } else if (gift > 98) {
                                              let recompense =
                                                "Grade Animé pendant 1 semaine"; //1%

                                              let GradeBoxFinal = new Discord.RichEmbed()
                                                .setColor("f9ff03")
                                                .setTitle(
                                                  "<:present:655555035899494401> BOX DE GRADE" // Bravo ! Tu as gagné un **${recompense}** ! <:confetti:655560168485945357>  gagné
                                                )
                                                .setDescription(
                                                  `Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `
                                                )
                                                .setAuthor(
                                                  message.author.tag,
                                                  message.author
                                                    .displayAvatarURL
                                                )
                                                .setTimestamp()
                                                .setFooter(
                                                  "ÉclaryBOT",
                                                  message.guild.iconURL
                                                );
                                              userInv.animaterole += 1
                                              client.setInv.run(userInv)
                                              logs(message, recompense, client);
                                              msg.edit(GradeBoxFinal);
                                            } else if (gift > 80) {
                                              let recompense =
                                                "Grade avec couleur et nom personalisés pendant 1 mois"; //18%

                                              let GradeBoxFinal = new Discord.RichEmbed()
                                                .setColor("f9ff03")
                                                .setTitle(
                                                  "<:present:655555035899494401> BOX DE GRADE"
                                                )
                                                .setDescription(
                                                  `Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `
                                                )
                                                .setAuthor(
                                                  message.author.tag,
                                                  message.author
                                                    .displayAvatarURL
                                                )
                                                .setTimestamp()
                                                .setFooter(
                                                  "ÉclaryBOT",
                                                  message.guild.iconURL
                                                );
                                              userInv.customrole += 1
                                              client.setInv.run(userInv)

                                              logs(message, recompense, client);
                                              msg.edit(GradeBoxFinal);
                                            } else if (gift > 50) {
                                              let recompense =
                                                "Grade Administrateur pendant 1 mois"; //30%

                                              let GradeBoxFinal = new Discord.RichEmbed()
                                                .setColor("f9ff03")
                                                .setTitle(
                                                  "<:present:655555035899494401> BOX DE GRADE"
                                                )
                                                .setDescription(
                                                  `Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRendez vous en messages privés pour récupérer votre récompense `
                                                )
                                                .setAuthor(
                                                  message.author.tag,
                                                  message.author
                                                    .displayAvatarURL
                                                )
                                                .setTimestamp()
                                                .setFooter(
                                                  "ÉclaryBOT",
                                                  message.guild.iconURL
                                                );
                                              message.author.send(
                                                "Un grade admin ... T'y as vraiment cru ?  <:kek:585459705330139136>"
                                              );

                                              logs(message, recompense, client);

                                              msg.edit(GradeBoxFinal);
                                            } else if (gift > 15) {
                                              let recompense =
                                                "Grade Préstige à vie"; //35%

                                              let GradeBoxFinal = new Discord.RichEmbed()
                                                .setColor("f9ff03")
                                                .setTitle(
                                                  "<:present:655555035899494401> BOX DE GRADE"
                                                )
                                                .setDescription(
                                                  `Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `
                                                )
                                                .setAuthor(
                                                  message.author.tag,
                                                  message.author
                                                    .displayAvatarURL
                                                )
                                                .setTimestamp()
                                                .setFooter(
                                                  "ÉclaryBOT",
                                                  message.guild.iconURL
                                                );
                                              userInv.prestige += 1
                                              client.setInv.run(userInv)

                                              logs(message, recompense, client);
                                              msg.edit(GradeBoxFinal);
                                            } else {
                                              let recompense =
                                                "Grade Légende à vie"; //15%

                                              let GradeBoxFinal = new Discord.RichEmbed()
                                                .setColor("f9ff03")
                                                .setTitle(
                                                  "<:present:655555035899494401> BOX DE GRADE" //
                                                )
                                                .setDescription(
                                                  `Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `
                                                )
                                                .setAuthor(
                                                  message.author.tag,
                                                  message.author
                                                    .displayAvatarURL
                                                )
                                                .setTimestamp()
                                                .setFooter(
                                                  "ÉclaryBOT",
                                                  message.guild.iconURL
                                                );
                                              userInv.legende += 1
                                              client.setInv.run(userInv)

                                              logs(message, recompense, client);
                                              msg.edit(GradeBoxFinal);
                                            }
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
      } else return message.channel.send(NoEmbed)
    } else {
      if (BoxNom === "v4box" || BoxNom === "boxv4" || BoxNom === "v4") {
        if (userInv.v4box >= 1) {
          userInv.v4box -= 1

          let present = [
            "<:yellow_present:640144879044919299> ",
            "<:red_present:640144867825156096> ",
            "<:blue_present:640144840461647902> "
          ];

          let GradeBoxEmbed = new Discord.RichEmbed()
            .setColor("f9ff03")
            .setTitle("<:present:655555035899494401> BOX V4")
            .setDescription(
              present[Math.floor(Math.random() * present.length)] +
              present[Math.floor(Math.random() * present.length)] +
              present[Math.floor(Math.random() * present.length)]
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("ÉclaryBOT", message.guild.iconURL);
          message.channel.send(GradeBoxEmbed).then(msg => {
            setTimeout(function () {
              let GradeBoxEmbed = new Discord.RichEmbed()
                .setColor("f9ff03")
                .setTitle("<:present:655555035899494401> BOX V4")
                .setDescription(
                  present[Math.floor(Math.random() * present.length)] +
                  present[Math.floor(Math.random() * present.length)] +
                  present[Math.floor(Math.random() * present.length)],
                  "ÉclaryBOT"
                )
                .setAuthor(
                  message.author.tag,
                  message.author.displayAvatarURL
                )
                .setTimestamp()
                .setFooter("ÉclaryBOT", message.guild.iconURL);
              msg.edit(GradeBoxEmbed).then(msg => {
                setTimeout(function () {
                  let GradeBoxEmbed = new Discord.RichEmbed()
                    .setColor("f9ff03")
                    .setTitle("<:present:655555035899494401> BOX V4")
                    .setDescription(
                      present[Math.floor(Math.random() * present.length)] +
                      present[Math.floor(Math.random() * present.length)] +
                      present[Math.floor(Math.random() * present.length)],
                      "ÉclaryBOT"
                    )
                    .setAuthor(
                      message.author.tag,
                      message.author.displayAvatarURL
                    )
                    .setTimestamp()
                    .setFooter("ÉclaryBOT", message.guild.iconURL);
                  msg.edit(GradeBoxEmbed).then(msg => {
                    setTimeout(function () {
                      let GradeBoxEmbed = new Discord.RichEmbed()
                        .setColor("f9ff03")
                        .setTitle("<:present:655555035899494401> BOX V4")
                        .setDescription(
                          present[
                          Math.floor(Math.random() * present.length)
                          ] +
                          present[
                          Math.floor(Math.random() * present.length)
                          ] +
                          present[
                          Math.floor(Math.random() * present.length)
                          ],
                          "ÉclaryBOT"
                        )
                        .setAuthor(
                          message.author.tag,
                          message.author.displayAvatarURL
                        )
                        .setTimestamp()
                        .setFooter("ÉclaryBOT", message.guild.iconURL);
                      msg.edit(GradeBoxEmbed).then(msg => {
                        setTimeout(function () {
                          let GradeBoxEmbed = new Discord.RichEmbed()
                            .setColor("f9ff03")
                            .setTitle("<:present:655555035899494401> BOX V4")
                            .setDescription(
                              present[
                              Math.floor(Math.random() * present.length)
                              ] +
                              present[
                              Math.floor(Math.random() * present.length)
                              ] +
                              present[
                              Math.floor(Math.random() * present.length)
                              ],
                              "ÉclaryBOT"
                            )
                            .setAuthor(
                              message.author.tag,
                              message.author.displayAvatarURL
                            )
                            .setTimestamp()
                            .setFooter("ÉclaryBOT", message.guild.iconURL);
                          msg.edit(GradeBoxEmbed).then(msg => {
                            setTimeout(function () {
                              let GradeBoxEmbed = new Discord.RichEmbed()
                                .setColor("f9ff03")
                                .setTitle(
                                  "<:present:655555035899494401> BOX V4"
                                )
                                .setDescription(
                                  present[
                                  Math.floor(Math.random() * present.length)
                                  ] +
                                  present[
                                  Math.floor(
                                    Math.random() * present.length
                                  )
                                  ] +
                                  present[
                                  Math.floor(
                                    Math.random() * present.length
                                  )
                                  ],
                                  "ÉclaryBOT"
                                )
                                .setAuthor(
                                  message.author.tag,
                                  message.author.displayAvatarURL
                                )
                                .setTimestamp()
                                .setFooter(
                                  "ÉclaryBOT",
                                  message.guild.iconURL
                                );
                              msg.edit(GradeBoxEmbed).then(msg => {
                                setTimeout(function () {
                                  let GradeBoxEmbed = new Discord.RichEmbed()
                                    .setColor("f9ff03")
                                    .setTitle(
                                      "<:present:655555035899494401> BOX V4"
                                    )
                                    .setDescription(
                                      present[
                                      Math.floor(
                                        Math.random() * present.length
                                      )
                                      ] +
                                      present[
                                      Math.floor(
                                        Math.random() * present.length
                                      )
                                      ] +
                                      present[
                                      Math.floor(
                                        Math.random() * present.length
                                      )
                                      ],
                                      "ÉclaryBOT"
                                    )
                                    .setAuthor(
                                      message.author.tag,
                                      message.author.displayAvatarURL
                                    )
                                    .setTimestamp()
                                    .setFooter(
                                      "ÉclaryBOT",
                                      message.guild.iconURL
                                    );
                                  msg.edit(GradeBoxEmbed).then(msg => {
                                    setTimeout(function () {
                                      let GradeBoxEmbed = new Discord.RichEmbed()
                                        .setColor("f9ff03")
                                        .setTitle(
                                          "<:present:655555035899494401> BOX V4"
                                        )
                                        .setDescription(
                                          present[
                                          Math.floor(
                                            Math.random() * present.length
                                          )
                                          ] +
                                          present[
                                          Math.floor(
                                            Math.random() * present.length
                                          )
                                          ] +
                                          present[
                                          Math.floor(
                                            Math.random() * present.length
                                          )
                                          ],
                                          "ÉclaryBOT"
                                        )
                                        .setAuthor(
                                          message.author.tag,
                                          message.author.displayAvatarURL
                                        )
                                        .setTimestamp()
                                        .setFooter(
                                          "ÉclaryBOT",
                                          message.guild.iconURL
                                        );
                                      msg.edit(GradeBoxEmbed).then(msg => {
                                        setTimeout(function () {
                                          let GradeBoxEmbed = new Discord.RichEmbed()
                                            .setColor("f9ff03")
                                            .setTitle(
                                              "<:present:655555035899494401> BOX V4"
                                            )
                                            .setDescription(
                                              present[
                                              Math.floor(
                                                Math.random() *
                                                present.length
                                              )
                                              ] +
                                              present[
                                              Math.floor(
                                                Math.random() *
                                                present.length
                                              )
                                              ] +
                                              present[
                                              Math.floor(
                                                Math.random() *
                                                present.length
                                              )
                                              ],
                                              "ÉclaryBOT"
                                            )
                                            .setAuthor(
                                              message.author.tag,
                                              message.author.displayAvatarURL
                                            )
                                            .setTimestamp()
                                            .setFooter(
                                              "ÉclaryBOT",
                                              message.guild.iconURL
                                            );
                                          msg
                                            .edit(GradeBoxEmbed)
                                            .then(msg => {
                                              setTimeout(function () {
                                                var gift =
                                                  Math.random() * 100;
                                                console.log(gift)
                                                if (gift > 98) {
                                                  let recompense =
                                                    "Une clé de Box Grade"; //2%

                                                  let GradeBoxFinal = new Discord.RichEmbed()
                                                    .setColor("f9ff03")
                                                    .setTitle(
                                                      "<:present:655555035899494401> BOX V4"
                                                    )
                                                    .setDescription(
                                                      `Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `
                                                    )
                                                    .setAuthor(
                                                      message.author.tag,
                                                      message.author
                                                        .displayAvatarURL
                                                    )
                                                    .setTimestamp()
                                                    .setFooter(
                                                      "ÉclaryBOT",
                                                      message.guild.iconURL
                                                    );
                                                  userInv.rolekey += 1
                                                  client.setInv.run(userInv)

                                                  logs(
                                                    message,
                                                    recompense,
                                                    client
                                                  );
                                                  msg.edit(GradeBoxFinal);
                                                } else if (gift > 13) {
                                                  let recompense =
                                                    "Grade avec couleur et nom personalisés pendant 1 mois"; //5%

                                                  let GradeBoxFinal = new Discord.RichEmbed()
                                                    .setColor("f9ff03")
                                                    .setTitle(
                                                      "<:present:655555035899494401> BOX V4"
                                                    )
                                                    .setDescription(
                                                      `Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `
                                                    )
                                                    .setAuthor(
                                                      message.author.tag,
                                                      message.author
                                                        .displayAvatarURL
                                                    )
                                                    .setTimestamp()
                                                    .setFooter(
                                                      "ÉclaryBOT",
                                                      message.guild.iconURL
                                                    );
                                                  userInv.customrole += 1
                                                  client.setInv.run(userInv)

                                                  logs(
                                                    message,
                                                    recompense,
                                                    client
                                                  );
                                                  msg.edit(GradeBoxFinal);
                                                } else if (gift > 23) {
                                                  let amount = parseInt(Math.floor(Math.random() * 500) + 500)
                                                  let recompense = amount + " <:eclair:639106499515514910>"; //70%

                                                  let GradeBoxFinal = new Discord.RichEmbed()
                                                    .setColor("f9ff03")
                                                    .setTitle(
                                                      "<:present:655555035899494401> BOX V4"
                                                    )
                                                    .setDescription(
                                                      "Bravo ! Vous avez gagné **" + recompense + "** ! <:confetti:655560168485945357> \nUtilisez `e/money` pour voir votre nombre total d'éclairs"
                                                    )
                                                    .setAuthor(
                                                      message.author.tag,
                                                      message.author
                                                        .displayAvatarURL
                                                    )
                                                    .setTimestamp()
                                                    .setFooter(
                                                      "ÉclaryBOT",
                                                      message.guild.iconURL
                                                    );


                                                  msg.edit(GradeBoxFinal);
                                                  db.add(`money_${message.guild.id}_${message.author.id}`, amount);

                                                } else if (gift > 3) {
                                                  let recompense =
                                                    "Token du bot <@!632590836017659932>"; //20%

                                                  let GradeBoxFinal = new Discord.RichEmbed()
                                                    .setColor("f9ff03")
                                                    .setTitle(
                                                      "<:present:655555035899494401> BOX V4"
                                                    )
                                                    .setDescription(
                                                      `Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRendez vous en messages privés pour récupérer votre récompense `
                                                    )
                                                    .setAuthor(
                                                      message.author.tag,
                                                      message.author
                                                        .displayAvatarURL
                                                    )
                                                    .setTimestamp()
                                                    .setFooter(
                                                      "ÉclaryBOT",
                                                      message.guild.iconURL
                                                    );
                                                  message.author.send(
                                                    "MTI2NzM0NTc3NTc4NDIxNTM5.RM2zo3.Vm2P82Zmjyj1nlbcfvdq4tbJN87 || Nan, sérieux, t'y as vraiment cru ? Il n'est pas valide  <:kek:585459705330139136>||"
                                                  );

                                                  logs(
                                                    message,
                                                    recompense,
                                                    client
                                                  );

                                                  msg.edit(GradeBoxFinal);
                                                } else {
                                                  let recompense =
                                                    "Grade Préstige à vie"; //3%

                                                  let GradeBoxFinal = new Discord.RichEmbed()
                                                    .setColor("f9ff03")
                                                    .setTitle(
                                                      "<:present:655555035899494401> BOX V4"
                                                    )
                                                    .setDescription(
                                                      `Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `
                                                    )
                                                    .setAuthor(
                                                      message.author.tag,
                                                      message.author
                                                        .displayAvatarURL
                                                    )
                                                    .setTimestamp()
                                                    .setFooter(
                                                      "ÉclaryBOT",
                                                      message.guild.iconURL
                                                    );
                                                  userInv.prestige += 1
                                                  client.setInv.run(userInv)

                                                  logs(
                                                    message,
                                                    recompense,
                                                    client
                                                  );
                                                  msg.edit(GradeBoxFinal);
                                                }
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
        } else return message.channel.send(NoEmbed); //return
      } else return message.channel.send(ExistName);
    }

    client.setInv.run(userInv)
    function logs(message, recompense, client) {
      let LogsEmbed = new Discord.RichEmbed()
        .setColor("a600ff")
        .setTitle("<:logs:661684612409589780> LOGS")
        .addField("Action réalisée :", "Ouverture d'une RoleKey")
        .addField("Nom du joueur :", message.author)
        .addField("Récompense obtenue :", recompense)

        .addField("Channel de l'action :", message.channel)
        .addField(
          "Date de l'action :",
          moment.utc(message.createdAt).format("LL")
        )
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL)
        .setAuthor(message.author.tag, message.author.displayAvatarURL);

      moment.locale("fr");
      let Logs = [
        "**━━━━━━━━━━━━━━━━━━**\n**Logs :** __Ouverture de box réalisée__ <:present:655555035899494401> \n**Nom du joueur :** " +
        message.author.tag + " (" + message.author.id +
        ") \n**Commande entière :** `" +
        message +
        "` \n**Clé ouverte : **" +
        args[0] + " \n**Récompense obtenue :** " + recompense +
        "\n**Date de l'action :** " +
        moment()
          .utc(message.createdAt)
          .tz("Europe/Paris")
          .format("LLLL") +
        "\n**Channel de l'action : **" +
        message.channel + `\n**Aller au message : **https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
        + "\n**━━━━━━━━━━━━━━━━━━**"
      ];

      client.channels.get(`639429893406457896`).send(Logs);
    }
  }
}
