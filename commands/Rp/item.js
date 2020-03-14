const Discord = require("discord.js");

module.exports = {
  name: "item",
  aliases: ["item-info"],
  category: "Rp",
  description: "Affiche des informations compémentaires sur l'item précisé",
  usage: "e/item <item>",
  statut: "on",
  run: async (client, message, args) => {
    let things = message.content.trim().split(/ +/g);
    let ItemId = things.slice(1).join("");
    let ItemName = ItemId.toLowerCase();

    const NoEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez spécifier un nom de l'item <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    if (!things[1]) return message.channel.send(NoEmbed);

    const Itemembed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "L'item `" +
          ItemName +
          "` n'existe pas <:no:648627916317392936> \nListe des items achetables obtensible avec la commande `e/shop` <:shop:652202101719695453>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    if (
      ItemName === "rôlekey" ||
      ItemName === "rolekey" ||
      ItemName === "rolebox" ||
      ItemName === "gradebox" ||
      ItemName === "boxrole" ||
      ItemName === "boxgrade"
    ) {
      const Buyembed = new Discord.RichEmbed()
        .setColor("f9ff03")
        .setTitle("<:trolley:661355355217068042> ITEM-INFO")
        .addField(
          "<:info:651876257386201090> Informations sur l'item :",
          " <:red_pin:657283187965165598> Nom complet de l'item : **Clé de Box de Rôle** \n<:buy:657196271022374912> Prix : **7500** <:eclair:639106499515514910> \n<:nametag:661571783840759818> Noms possibles : `rôlekey`, `rolekey`, `rolebox`, `boxrole`, `gradebox`, `boxgrade`\n<:list:661572915581681664> Description de l'item : Permet d'ouvir la **Box de grade**. Obtensible au `e/shop` \n<:yes:648627916690685962> **Statut :** Disponible"
        )
        .addField(
          "<:rewards:658304524628393984> Loots de la box :",
          "\n<:prestige:655486268783722537> Grade <@&605475764422443023> **à vie** (35%) \n<:legende:655486269102620712> Grade <@&631496069200740403> **à vie** (15%) \n<:system:657281284158259220> Grade **Administrateur** pendant **1 mois** (30%) \n<:custom:657348326328500224> Grade avec **couleur** et **nom personalisés** pendant **1 mois** (18%) \n<:rainbow:660926533371822120> Grade **Rainbow** pendant **1 semaine** (1%) \n<:animation:660926789241274379> Grade **Animé** pendant **1 semaine** (1%)"
        )
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL)
        .setAuthor(message.author.tag, message.author.displayAvatarURL);
      message.channel.send(Buyembed);
    } else {
      if (
        ItemName === "customrole" ||
        ItemName === "customrôle" ||
        ItemName === "rôlecustom" ||
        ItemName === "rolecustom" ||
        ItemName === "custom"
      ) {
        const Buyembed = new Discord.RichEmbed()
          .setColor("f9ff03")
          .setTitle("<:trolley:661355355217068042> ITEM-INFO")
          .addField(
            "<:info:651876257386201090> Informations sur l'item :",
            "<:red_pin:657283187965165598> Nom complet de l'item : **Custom Rôle** \n<:buy:657196271022374912> Prix : **12500** <:eclair:639106499515514910> \n<:nametag:661571783840759818> Noms possibles : `customrole`, `customrôle`, `rolecustom`, `rôlecustom`, `custom` \n<:list:661572915581681664> Description de l'item : **Grade** avec **nom** et **couleur personnalisés** qui se supprime automatiquement au bout de **2 semaines**. Obtenisble au `e/shop` ou dans la **Box de Grade** \n<:yes:648627916690685962> **Statut :** Disponible"
          )
          .setFooter("ÉclaryBOT", message.guild.iconURL)
          .setAuthor(message.author.tag, message.author.displayAvatarURL);

        message.channel.send(Buyembed);
      } else {
        if (ItemName === "légende" || ItemName === "legende") {
          const Buyembed = new Discord.RichEmbed()
            .setColor("f9ff03")
            .setTitle("<:trolley:661355355217068042> ITEM-INFO")
            .addField(
              "<:info:651876257386201090> Informations sur l'item :",
              "<:red_pin:657283187965165598> Nom complet de l'item : **Grade <@&631496069200740403>** \n<:buy:657196271022374912> Prix : **15000** <:eclair:639106499515514910> ou **15** invitations <:invitation:658293015055564811> ou **1** boost du serveur <a:Boosting:661258026614915073>\n<:nametag:661571783840759818> Noms possibles : `Légende`, `Legende` \n<:list:661572915581681664> Description de l'item : **Grade** à vie avec accès au channel <#606140010026106887> et générateur nitro avec un cooldown de **30min**. Obtenisble au `e/shop` ou dans la **Box de Grade** \n<:yes:648627916690685962> **Statut :** Disponible"
            )
            .setFooter("ÉclaryBOT", message.guild.iconURL)
            .setAuthor(message.author.tag, message.author.displayAvatarURL);

          message.channel.send(Buyembed);
        } else {
          if (ItemName === "préstige" || ItemName === "prestige") {
            const Buyembed = new Discord.RichEmbed()
              .setColor("f9ff03")
              .setTitle("<:trolley:661355355217068042> ITEM-INFO")
              .addField(
                "<:info:651876257386201090> Informations sur l'item :",
                "<:red_pin:657283187965165598> Nom complet de l'item : **Grade <@&605475764422443023>** \n<:buy:657196271022374912> Prix : **5000** <:eclair:639106499515514910> ou **5** invitations <:invitation:658293015055564811> \n<:nametag:661571783840759818> Noms possibles : `Préstige`, `Prestige` \n<:list:661572915581681664> Description de l'item : **Grade** à vie avec accès au channel <#606140010026106887> et générateur nitro avec un cooldown de **6h**. Obtenisble au `e/shop` ou dans la **Box de Grade** \n<:yes:648627916690685962> **Statut :** Disponible"
              )
              .setFooter("ÉclaryBOT", message.guild.iconURL)
              .setAuthor(message.author.tag, message.author.displayAvatarURL);

            message.channel.send(Buyembed);
          } else {
            if (
              ItemName === "rainbowrole" ||
              ItemName === "rainbowrôle" ||
              ItemName === "rolerainbow" ||
              ItemName === "rôlerainbow" ||
              ItemName === "rainbow"
            ) {
              const Buyembed = new Discord.RichEmbed()
                .setColor("f9ff03")
                .setTitle("<:trolley:661355355217068042> ITEM-INFO")
                .addField(
                  "<:info:651876257386201090> Informations sur l'item :",
                  "<:red_pin:657283187965165598> Nom complet de l'item : **Grade Rainbow** \n<:buy:657196271022374912> Prix : **50000** <:eclair:639106499515514910> \n<:nametag:661571783840759818> Noms possibles : `rainbowrole`, `rainbowrôle`, `rolerainbow`, `rôlerainbow`, `rainbow` \n<:list:661572915581681664> Description de l'item : **Grade** durant 1 semaine qui change de couleurs toute les secondes. Obtenisble au `e/shop` ou dans la **Box de Grade** \n<:no:648627916317392936> **Statut :** En maintenance"
                )
                .setFooter("ÉclaryBOT", message.guild.iconURL)
                .setAuthor(message.author.tag, message.author.displayAvatarURL);

              message.channel.send(Buyembed);
            } else {
              if (
                ItemName === "animaterole" ||
                ItemName === "animaterôle" ||
                ItemName === "animatedrôle" ||
                ItemName === "animatedrôle" ||
                ItemName === "rôleanimate" ||
                ItemName === "roleanimate" ||
                ItemName === "rôleanimated" ||
                ItemName === "roleanimated" ||
                ItemName === "animate"
              ) {
                const Buyembed = new Discord.RichEmbed()
                  .setColor("f9ff03")
                  .setTitle("<:trolley:661355355217068042> ITEM-INFO")
                  .addField(
                    "<:info:651876257386201090> Informations sur l'item :",
                    "<:red_pin:657283187965165598> Nom complet de l'item : **Grade Animé** \n<:buy:657196271022374912> Prix : **50000** <:eclair:639106499515514910> \n<:nametag:661571783840759818> Noms possibles : `animaterole`, `animaterôle`, `animatedrôle`, `animatedrôle`, `rôleanimate`, `roleanimate`, `rôleanimated`, `roleanimated`, `roleanimated`, `animate` \n<:list:661572915581681664> Description de l'item : **Grade** durant 1 semaine qui anime votre pseudo. Obtenisble au `e/shop` ou dans la **Box de Grade** \n<:no:648627916317392936> **Statut :** En maintenance"
                  )
                  .setFooter("ÉclaryBOT", message.guild.iconURL)
                  .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL
                  );

                message.channel.send(Buyembed);
              } else {
                if (
                  ItemName === "v4box" ||
                  ItemName === "boxv4" ||
                  ItemName === "v4" ||
                  ItemName === "keyv4" ||
                  ItemName === "v4key"
                ) {
                  const Buyembed = new Discord.RichEmbed()
                    .setColor("f9ff03")
                    .setTitle("<:trolley:661355355217068042> ITEM-INFO")
                    .addField(
                      "<:info:651876257386201090> Informations sur l'item :",
                      "<:red_pin:657283187965165598> Nom complet de l'item : **Clé de Box V4** \n<:buy:657196271022374912> Prix : **0** <:eclair:639106499515514910> \n<:nametag:661571783840759818> Noms possibles : `v4box`, `boxv4`, `v4`, \n<:list:661572915581681664> Description de l'item : Permet d'ouvir la **Box V4**, une box gratuite exclusive et temporaire pour fêter la v4. Donnée gratuitement aux nouveaux joueurs** \n<:yes:648627916690685962> **Statut :** Disponible"
                    )
                    .addField(
                      "<:rewards:658304524628393984> Loots de la box :",
                      "<:eclair:639106499515514910> Nombre aléatoire de coins entre **500** et **1000** (70%) \n <:password:663041125145116672> **Token** du bot <@632590836017659932> (20%) \n<:custom:657348326328500224> Grade avec **couleur** et **nom personalisés** pendant **1 mois** (5%) \n<:prestige:655486268783722537> Grade <@&605475764422443023> **à vie** (5%) \n<:boxkey:652202101862170624> Clé de **Box de Grade** (2%)"
                    )
                    .setTimestamp()
                    .setFooter("ÉclaryBOT", message.guild.iconURL)
                    .setAuthor(
                      message.author.tag,
                      message.author.displayAvatarURL
                    );
                  message.channel.send(Buyembed);
                } else {
                  message.channel.send(Itemembed);
                }
              }
            }
          }
        }
      }
    }
  }
};
