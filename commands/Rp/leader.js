const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "leader",
  aliases: ["leaderboard", "top","leaderboards"],
  category: "Rp",
  description: "Affiche le top des utilisateurs les plus riches du serveur",
  usage: "e/leader",
  statut: "on",
  run: async (client, message, args) => {
  const resp = db.all();
  const money = resp.sort((a, b) => (a.data < b.data ? 1 : -1));
  let content = [];
  let rank = 1

  for (let i = 0; i < money.length; i++) {
    if(money[i].ID.startsWith('money')) {
      let user = client.users.get(money[i].ID.split("_")[2]);
      if(user) {
        content = content + `${rank}- ${money[i].data}⚡ ${user.tag}\n`;
        rank ++
      }
    }
  }
  
    const Leader = new Discord.RichEmbed()
      .setColor("f9ff03")
      .setTitle(" <:leaderboard:660133384965849099> LEADERBOARD")
      /*.setDescription(
        "Voici le leaderboard d'**" +
          message.guild.name +
          "** : https://eclary.tk/leader"
      )*/
      .setDescription('```' + content + '```')
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);
    message.channel.send(Leader);
  }
};
