const { RichEmbed } = require("discord.js");

module.exports = {
  name: "shop",
  category: "Rp",
  aliases: ["boutique", "rp", "buylist"],
  description:
    "Affiche des détails concernant l'économie du serveur (boutique, items achetables...)",
  usage: "e/shop",
  statut: "on",
  run: async (client, message, args) => {
    let buylist = new RichEmbed()
      .setTitle("<:shop:652202101719695453> BOUTIQUE")
      .setDescription(
        "<:buy:657196271022374912> Pour acheter un item : `e/buy <item>`"
      )
      .setColor("f9ff03")
      .addField(
        "**Items achetables** <:role:652202102537322497>",
        " <:prestige:655486268783722537> Grade <@&605475764422443023> à vie (`Préstige`): **5000** <:eclair:639106499515514910> ou **5** invitations <:invitation:658293015055564811>\n<:legende:655486269102620712> Grade <@&631496069200740403> à vie (`Légende`) : **15000** <:eclair:639106499515514910> (réduction a 10000 <:eclair:639106499515514910> si vous avez déjà le <@&605475764422443023>) ou **15** invitations  <:invitation:658293015055564811>\n<:custom:657348326328500224> Grade personnalisé 2 semaines (`CustomRole`) : **12500** <:eclair:639106499515514910> \n<:rainbow:660926533371822120> Rainbow Rôle 1 semaine (`RainbowRole`) : **50000** <:eclair:639106499515514910> \n <:animation:660926789241274379> Pseudo Animé 1 semaine (`AnimatedRole`) : **50000** <:eclair:639106499515514910> \n<:boxkey:652202101862170624> Box de grade (`RoleKey`) : **7500** <:eclair:639106499515514910>"
      )
      .addField(
        "**Sources de revenus** <:bag:648629855847579658>",
        "<:friend:657286761000730638> Gagner de l'xp en discutant : **500** <:eclair:639106499515514910> (par level) \n<:casino:657960414209900569> Parier de l'argent sur des jeux : **Mise x Multiplicateur précisé** <:eclair:639106499515514910> \n<:daily:657193404232368138> Récupérer une récompense quotidienne : Entre **20** et **100** <:eclair:639106499515514910> \n<:confetti:655560168485945357>Travailler en tant qu'<@&606137029239111680> et/ou <@&583760442216808474> pour le staff : **Salaire adapté** \n<:suggestion:660894513421615115> Faire une suggestion : Selon la **pertinence** de la **suggestion** \n<:error:660894512448667668> Reporter un bug : Selon la **gravité** du **bug**"
      )
      .addField(
        "**Rewards** <:rewards:658304524628393984>",
        "<:prestige:655486268783722537> Grade <@&605475764422443023> : \n<#628956032420282388> **6H** + Accès a la catégorie <#606140010026106887> \n<:legende:655486269102620712> Grade <@&631496069200740403> : \n<#628956032420282388> **30min** + Accès a la catégorie <#606140010026106887>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
    message.channel.send(buylist);
  }
};
