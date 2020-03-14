const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");

module.exports = {
  name: "prefixreset",
  aliases: ["noprefix", "prefixr"],
  category: "staff",
  description: "Remet a 0 le prefix de l'utilisateur mentionné [Staff Only]",
  usage: "e/prefixreset <@user> | e/prefixreset <@role>",
  statut: "on",
  run: async (client, message, args) => {
    const MentionEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez mentionner un utilisateur ou un rôle <:no:648627916317392936> \nPlus d'information avec la commande `e/info <Commande>` <:info:651876257386201090>"
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    const PermEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous n'avez pas l'autorisation de faire ça, bien tenté ! <:no:648627916317392936>"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

    const WaitEmbed = new Discord.RichEmbed()
      .setTitle("<:system:657281284158259220> PREFIX")
      .setColor("NAVY")
      .setDescription(
        "Action en cours, veuillez patienter <a:Typing:635137206796681253> \nCela peut prendre plusieurs minutes."
      )
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);

    // role
    const Args = message.content.split(" ");
    const roleArgs = Args.slice(1, 2);
    const roleID = roleArgs[0].slice(3, -1);
    const role = message.guild.roles.get(roleID);
    if (!role) {
      if (message.mentions.users.size == 0) {
        return message.channel.send(MentionEmbed);
      } else {
        // pseudo
        let joueur = message.guild.member(message.mentions.users.first()).user
          .username;
        let membre = message.guild.member(message.mentions.users.first());
        const m = await message.channel.send(WaitEmbed);
        message.guild
          .member(message.mentions.users.first())
          .setNickname(joueur);

        const PrefixEmbed = new Discord.RichEmbed()
          .setTitle("<:system:657281284158259220> PREFIX")
          .setColor("NAVY")
          .setDescription(
            "Action effectuée avec succés <:yes:648627916690685962> \nLe prefix de " +
              membre +
              " a été supprimé"
          )
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL)
          .setAuthor(message.author.tag, message.author.displayAvatarURL);

        m.edit(PrefixEmbed);
      }
    } else {
      let roleMembers = message.guild.roles.get(roleID).members;
      console.log(roleMembers);
      const m = await message.channel.send(WaitEmbed);

      roleMembers.forEach(async user => {
        if (user.roles.has(roleID)) {
          user.setNickname(`${client.users.get(user.id).username}`);

          const PrefixEmbed = new Discord.RichEmbed()
            .setTitle("<:system:657281284158259220> PREFIX")
            .setColor("NAVY")
            .setDescription(
              "Action effectuée avec succés <:yes:648627916690685962> \nLe prefix de chaque membre ayant le rôle " +
                roleArgs +
                " a été supprimé"
            )
            .setTimestamp()
            .setFooter("ÉclaryBOT", message.guild.iconURL)
            .setAuthor(message.author.tag, message.author.displayAvatarURL);

          m.edit(PrefixEmbed);
        }
      });
    }
  }
};
