const Discord = require("discord.js");

module.exports = {
  name: "suggestion",
  category: "info",
  description:
    "Met votre suggestion en embed et la poste dans le channel <#606836989458776074> afin d'apporter une idée de nouveauté sur le serveur",
  usage: "e/suggestion <idée>",
  statut: "on",
  run: async (client, message, args) => {
    let things = message.content.trim().split(/ +/g);
    let suggest = things.slice(1).join(" ")
 
     const SayEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez indiquer une suggestion <:no:648627916317392936> \nPlus d'informations avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
       if (!suggest) return message.channel.send(SayEmbed)
    
    let suggestionembedchat = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setColor("17ace8")
      .setTitle("<:suggestion:660894513421615115> SUGGESTION")
      .setDescription(
        `${suggest}\n\n**Idée proposée par ${
          message.author
        }, merci a lui !** :heart:`
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
    message.delete();

    client.channels
      .get("606836989458776074")
      .send(suggestionembedchat)
      .then(function(message) {
        message.react("648627916690685962");
        message.react("648627916317392936");
      });
  }
};
