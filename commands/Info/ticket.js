const Discord = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch");
const hastebin = require("hastebin");

module.exports = {
  name: "ticket",
  category: "info",
  description:
    "Vous permet d'ouvrir un ticket (channel privé avec tout le staff) afin que nous puissions vous apporter l'aide nécéssaire",
  usage: "e/ticket <new> <reason>",
  statut: "on",
  run: async (client, message, args) => {
    let GoodChannel = message.guild.channels.find(
      channel => channel.name === "ticket-" + message.author.id
    );
    let number = message.author.id;
    const AlreadyOpenEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous avez déjà ouvert un ticket <:no:648627916317392936> \nRendez vous plutôt dans ce channel : " +
          GoodChannel +
          " <:here:657187989742419978> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const ErrorCloseEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez être dans un channel ticket pour le fermer <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const BadChannelEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous faites cette commande de le mauvais channel <:no:648627916317392936>\nIl faut vous rendre dans le channel <#628956032420282388> pour exécuter celle-ci <:here:657187989742419978>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const ReasonEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez préciser une raison d'ouverture de ticket <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const PermEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous n'avez pas l'autorisation de faire ça, bien tenté ! <:no:648627916317392936>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const ConfirmEmbed = new Discord.RichEmbed()
      .setColor("17ace8")
      .setDescription(
        "Êtes vous sûr de vouloir fermer ce ticket ? Cette action est irréversible ! <:warn:654704623231434752> \nTapez `e/confirm` dans les 10 prochaines secondes pour confirmer l'action <:time:656498169718505492>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const TimeEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous avez mis trop de temps a confirmer la fermeture, l'action est donc annulée <:no:648627916317392936>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    //Ouverture ticket
    if (args[0] === "new" || args[0] === "create" || args[0] === "open") {
      if (message.channel.id === "591991894247211009") {
        const reason = message.content
          .split(" ")
          .slice(2)
          .join(" ");
        if (
          message.guild.channels.exists("name", "ticket-" + message.author.id)
        )
          return message.channel.send(AlreadyOpenEmbed);
        if (!reason) return message.channel.send(ReasonEmbed);
        message.guild
          .createChannel(`ticket-${message.author.id}`, "text")
          .then(c => {
            let role = message.guild.roles.find("id", "583766594027651082");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
              SEND_MESSAGES: false,
              READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
            });
            let category = message.guild.channels.find(
                c => c.id == "587223080972320788" && c.type == "category"
              ),
              channel = message.guild.channels.find(
                c => c.name == "ticket-" + message.author.id && c.type == "text"
              );
            if (category && channel) channel.setParent(category.id);

            let GoodChannel = message.guild.channels.find(
              channel => channel.name === "ticket-" + message.author.id
            );
            const reason = message.content
              .split(" ")
              .slice(2)
              .join(" ");
            const OpenEmbed = new Discord.RichEmbed()
              .setColor("17ace8")
              .setDescription(
                'Votre ticket a bien été ouvert pour la raison : **"' +
                  reason +
                  '"** <:yes:648627916690685962> \nRendez vous dans ce channel : ' +
                  GoodChannel +
                  " <:here:657187989742419978>"
              )
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setTimestamp()
              .setFooter("ÉclaryBOT", message.guild.iconURL);
            message.delete();
            message.channel.send(OpenEmbed).then(msg => {
              msg.delete(15000);
            });

            const OpenLogEmbed = new Discord.RichEmbed()
              .setColor("GREEN")
              .setTitle("<:ticket:674047396845453340> TICKET")
              .setDescription(
                `Le ticket \`${c.name}\` vient d'être ouvert par ${message.author}. La conversation sera donc restranscrite ici, dans le but d'avoir des logs complets et fiables.`
              )
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setTimestamp()
              .setFooter("ÉclaryBOT", message.guild.iconURL);
            client.channels.get("616991454824235048").send(OpenLogEmbed);

            moment.locale("fr");
            const embed = new Discord.RichEmbed()
              .setColor("17ace8")
              .setTitle("<:ticket:674047396845453340> TICKET")
              .setDescription(
                `**Bienvenue ${message.author.username}, et merci d'utiliser nos services !** \n <:red_pin:657283187965165598> Expliquez votre problème avec le plus de détails possible, en joignant des screens/un rec si nécéssaire. \n<:policeman:657289799211810817> Notre staff viendra répondre à votre demande dans les plus brefs délais. \n<:warn:654704623231434752> N'oubliez pas que l'ouverture de ticket sans raison valable est interdite et sanctionnable.`
              )
              .addField(
                "<:searching:657293789844602918> Raison précisée par l'utilisateur :",
                '"**' + reason + '**"'
              )
              .addField(
                "<:time:656498169718505492> Date de l'ouverture du ticket :",
                moment()
                  .utc(message.createdAt)
                  .tz("Europe/Paris")
                  .format("LLLL")
              )
              .setTimestamp();
            c.send({
              embed: embed
            });
            message.guild.channels
              .find(channel => channel.name === "ticket-" + message.author.id)
              .send(
                `<@&583766594027651081>, ${message.author} viens d'ouvrir un ticket !`
              );
          })
          .catch(console.error); // Send errors to console
      } else {
        return message.channel.send(BadChannelEmbed);
      }
    }

    // Fermeture ticket
    if (args[0] === "close") {
      if (
        !message.member.hasPermission("ADMINISTRATOR")
      )
        return message.channel.send(PermEmbed);
      if (!message.channel.name.startsWith(`ticket-`))
        return message.channel.send(ErrorCloseEmbed);
      // Confirmation
      message.channel.send("Voulez vous enregistrer ?").then(m => {
        message.channel
          .awaitMessages(response => response.content === "yes", {
            max: 1,
            time: 10000,
            errors: ["time"]
          })
          .then(collected => {
            message.channel.fetchMessages({ limit: 100 }).then(messages => {
              let text = "";
              let all = "";
              let intro = `[LOGS ÉCLARY - ${message.channel.name}]\n`;
              let date, dateToString;
              
              console.log(messages.size)
              messages.forEach(msg => {
                date = new Date(msg.createdTimestamp);
                dateToString =`Le ${date.getDate()}/${date.getMonth()} à ${date.getHours()}:${date.getMinutes()}`;
                
                text = `[${dateToString}] [De : ${msg.author.tag} (${number})] : \n${msg.content}\n\n`;
                all += intro + text;
              })
              
                hastebin
                  .createPaste(
                    all,
                    {
                      contentType: "text/plain",
                      server: "https://hastebin.com"
                    },
                    {}
                  )
                  .then(function(urlToPaste) {
                    message.channel.send(urlToPaste);
                    message.channel
                      .send(ConfirmEmbed)
                      .then(m => {
                        message.channel
                          .awaitMessages(
                            response => response.content === "yes",
                            {
                              max: 1,
                              time: 10000,
                              errors: ["time"]
                            }
                          )
                          .then(collected => {
                            message.channel.delete();
                            const CloseLogEmbed = new Discord.RichEmbed()
                              .setColor("RED")
                              .setTitle("<:ticket:674047396845453340> TICKET")
                              .setDescription(
                                `Le ticket a été fermé. La conversation restranscrite ici prend donc fin.`
                              )
                              .setAuthor(
                                message.author.tag,
                                message.author.displayAvatarURL
                              )
                              .setTimestamp()
                              .setFooter("ÉclaryBOT", message.guild.iconURL);
                            client.channels
                              .get("616991454824235048")
                              .send(CloseLogEmbed);
                          })
                          .catch((err) => {
                            m.edit(TimeEmbed);
                          });
                      })
                      .catch(err => {
                        console.log(err);
                      });
                    })
              }
            );
          });
      });
    }
  }
};
