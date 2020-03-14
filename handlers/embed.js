const { RichEmbed } = require("discord.js");

module.exports = (name, message, params) => {
  switch (name) {
    case "NotEnoughMoneyToBet":
      const NotEnoughMoneyToBet = new RichEmbed()
      .setColor("RED")
      .setDescription(`Vous n'avez pas assez d'argent pour en parier autant <:no:648627916317392936> \nVotre solde actuel est de **${params}** <:eclair:639106499515514910> \nPlus d'informations avec la commande \`e/money\` <:bag:648629855847579658>`)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);
      
      return NotEnoughMoneyToBet;
    case "InvalidNumberToBet":
      const InvalidNumberToBet = new RichEmbed()
      .setColor("RED")
      .setDescription("Vous devez préciser un montant d'éclairs valide à parier <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>")
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);
      
      return InvalidNumberToBet;
    case "AlreadyGameInProgress":
      const AlreadyGameInProgress = new RichEmbed()
      .setColor("RED")
      .setDescription("Vous avez déja une partie en cours <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
      
      return AlreadyGameInProgress;
    case "StartBingo":
      const StartBingo = new RichEmbed()
      .setColor("f9ff03")
      .setTitle("<:bingo:657194713882951710> BINGO")
      .setDescription("**Bingo lancé !** <:yes:648627916690685962> \nDifficulté : **" + params[1] + "**  \nVous avez **" + params[0] + "** pour trouver le bon nombre entre **1** et **1000** à l'aide de mes indices ! Essayez plusieurs nombres avec la commande `e/bingo <nombre>`")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
      
      return StartBingo;
    case "NeedToStartBingo":
       const NeedToStartBingo = new RichEmbed()
      .setColor("RED")
      .setDescription("Vous devez lancer une partie à l'aide de la commande `e/bingo start <difficulté>` pour jouer <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
      
      return NeedToStartBingo;
    case "EndBingo":
      const EndBingo = new RichEmbed()
          .setColor("f9ff03")
          .setTitle("<:bingo:657194713882951710> BINGO")
          .setDescription("**La partie est terminée, temps écoulé <:no:648627916317392936>** \nLe bon nombre était **" + params[0] + "**")
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL);
      
      return EndBingo;
    case "InvalidGuessNumber":
      const InvalidGuessNumber = new RichEmbed()
      .setColor("RED")
      .setDescription("Vous devez préciser un nombre valide <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>")
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);
      
      return InvalidGuessNumber;
      
    case "WinBingo":
       const WinBingo = new RichEmbed()
        .setColor("f9ff03")
        .setTitle("<:bingo:657194713882951710> BINGO")
        .setDescription("**Vous avez gagné <:yes:648627916690685962>** \nLe nombre **" + params[0] + "** était le bon")
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL);
      
      return WinBingo;
    case "NoDifficultyBingo":
      const NoDifficultyBingo = new RichEmbed()
      .setColor("RED")
      .setDescription("Vous devez préciser une difficulté valide <:no:648627916317392936> \nDifficultés possibles : `easy`, `medium`, `hard`\nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>")
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);
    
      return NoDifficultyBingo
    case "LessBingo":
      const LessBingo = new RichEmbed()
      .setColor("f9ff03")
      .setTitle("<:bingo:657194713882951710> BINGO")
      .setDescription("**C'est moins ! <a:less:655094464959873044>** \nEssayez un nombre plus petit avec la commande `e/bingo <nombre>`")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
      
      return LessBingo;
    case "MoreBingo":
      const MoreBingo = new RichEmbed()
      .setColor("f9ff03")
      .setTitle("<:bingo:657194713882951710> BINGO")
      .setDescription("**C'est plus ! <a:more:655094464628523038>** \nEssayez un nombre plus grand avec la commande `e/bingo <nombre>`")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

      return MoreBingo;
    case "DailyReward":
      const DailyReward = new RichEmbed()
      .setDescription("Vous récupérez **" + params + "** <:eclair:639106499515514910> en récompense quotidienne ! <:yes:648627916690685962>\nUtilisez `e/money` pour voir le nombre total d'éclairs <:bag:648629855847579658>")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setColor("f9ff03");
      
      return DailyReward;
    case "AlreadyDaily":
      const AlreadyDaily = new RichEmbed()
      .setColor("RED")
      .setDescription("Vous avez déja collecté votre récompense quotidienne <:no:648627916317392936> \nVous devez encore attendre **" + params + "** pour la récolter à nouveau <:time:656498169718505492>")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
      
      return AlreadyDaily;
    case "StartDice":
      const StartDice = new RichEmbed()
      .setColor("f9ff03")
      .setTitle("<:dices:658007789997785113> LANCER DE DÉ")
      .addField("<:dice1:658007789490405393> : Un \n<:dice2:658007789377159168> : Deux \n<:dice3:658007788856803354> : Trois \n<:dice4:658007788622053439> : Quatre \n<:dice5:658007788836093962> : Cinq \n<:dice6:658007789607583775> : Six","**Utilisez les réactions sous ce message pour jouer !**")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
      
      return StartDice;
    case "WinDice":
      const WinDice = new RichEmbed()
      .setTitle("<:dices:658007789997785113> LANCER DE DÉ")
      .addField("Vous avez misé **" + params[0] + "** <:eclair:639106499515514910>", `En éspérant que le dé tombe sur **${params[1]}**`)
      .addField(`Le dé tombe sur **${params[1]}** `, "Vous gagnez **" + params[0] * 4 + "** <:eclair:639106499515514910>")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setColor("f9ff03");
    
      return WinDice;
    case "LostDice":
      const LostDice = new RichEmbed()
      .setTitle("<:dices:658007789997785113> LANCER DE DÉ")
      .addField("Vous avez misé **" + params[0] + "** <:eclair:639106499515514910>", `En éspérant que le dé tombe sur **${params[1]}**`)
      .addField(`Le dé n'est pas tombé sur **${params[1]}** `, "Vous perdez **" + params[0] + "** <:eclair:639106499515514910>")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setColor("f9ff03");
    
      return LostDice;

  }
}
