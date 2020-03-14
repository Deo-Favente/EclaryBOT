const Discord = require("discord.js");
const Key = require("../DataBase/Datas/RP/Inventory/key.json");
const { writeFile } = require("fs");
const Role = require("../DataBase/Datas/RP/Inventory/role.json");
const moment = require("moment");
const db = require('quick.db')
const Init = require("../../handlers/init.js");

module.exports = {
  name: "open2", 
  aliases: ["opening"],
  category: "Rp",
  description: "Ouvre une box obtenue avec une animation stylée !",
  usage: "e/open <nom>",
  statut: "off",
  run: async (client, message, args) => {
    let BoxName = args[0].toLowerCase();

  Init(message.author)

    let ExistName = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "La box `" +
          BoxName +
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
          BoxName +
          "` a ouvrir, bien tenté ! <:no:648627916317392936> \nListe de tes items obtensible avec la commande `e/inventory`"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("ÉclaryBOT", message.guild.iconURL);

   if (!BoxName[1]) return message.channel.send(NoBoxName);

    if (BoxName === "rolebox" || BoxName === "rôlebox" || BoxName === "rôlekey" || BoxName === "rolekey") {
      if (Key[message.author.id].RoleKey >= 1) {
        Key[message.author.id].RoleKey = Key[message.author.id].RoleKey - 1;
        
        //Function
        let present = [
          "<:yellow_present:640144879044919299> ",
          "<:red_present:640144867825156096> ",
          "<:blue_present:640144840461647902> "
        ];
        
         let Embed = new Discord.RichEmbed()
          .setColor("f9ff03")
          .setTitle("<:present:655555035899494401> BOX DE GRADE")
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL);
        
        let msg = await message.channel.send(Embed)
        anime(present, Embed, msg, message, 1, client)                           
        } else return message.reply('Pas de clés !')
      } else {
        if (BoxName === "v4box" || BoxName === "boxv4" || BoxName === "v4") {
          if (Key[message.author.id].BoxV4 >= 1) {
            Key[message.author.id].BoxV4 = Key[message.author.id].BoxV4 - 1;
            
            //Function
            let present = [
              "<:yellow_present:640144879044919299> ",
              "<:red_present:640144867825156096> ",
              "<:blue_present:640144840461647902> "
            ];

            let Embed = new Discord.RichEmbed()
              .setColor("f9ff03")
              .setTitle("<:present:655555035899494401> BOX V4")
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setTimestamp()
              .setFooter("ÉclaryBOT", message.guild.iconURL);
            
            let msg = await message.channel.send(Embed)
            anime(present, Embed, msg, message, 1, client)   
          } else return message.channel.send(NoEmbed); //return
        } else return message.channel.send(ExistName);
      }

    writeFile("./commands/DataBase/Datas/RP/Inventory/key.json", JSON.stringify(Key), err => { if (err) console.log(err); });
    writeFile("./commands/DataBase/Datas/RP/Inventory/role.json", JSON.stringify(Role), err => { if (err) console.log(err); });
  }
}

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
      client.channels.get(`639429893406457896`).send(LogsEmbed);
    }

async function anime(present, embed, msg, message, box, client) {
  for (let i = 0; i < 10; i++) {
    setTimeout(function() {
      embed.setDescription(present[Math.floor(Math.random() * present.length)] + present[Math.floor(Math.random() * present.length)] + present[Math.floor(Math.random() * present.length)])
      msg.edit(embed)
    }, 300)
    if(i == 9) {
      let Final = new Discord.RichEmbed()
  .setColor("f9ff03")
  .setTitle("<:present:655555035899494401> BOX")
  .setAuthor(message.author.tag, message.author.displayAvatarURL)
  .setTimestamp()
  .setFooter("ÉclaryBOT", message.guild.iconURL);
  
  let luck = Math.random() * 100;
  if (box == 1){
    result1(luck, message, Final, client, msg)
  } else if (box == 2) {
    result2(luck, message, Final, client, msg)
  }
    }
  }
}

async function result1(luck, message, Final, client, msg) {
  if (luck > 99) {
  let recompense = "Grade Rainbow pendant 1 semaine"; //1%
  Final.setDescription(`Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `)
                                               
  Role[message.author.id].RainbowRole = Role[message.author.id].RainbowRole + 1;
  logs(message, recompense, client);
  msg.edit(Final);
  
  } else if (luck > 98) {
  let recompense = "Grade Animé pendant 1 semaine"; //1%
  Final.setDescription(`Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `)
                                               
  Role[message.author.id].AnimateRole = Role[message.author.id].AnimateRole + 1;
  logs(message, recompense, client);
  msg.edit(Final);
  
  } else if (luck > 80) {
  let recompense = "Grade avec couleur et nom personalisés pendant 1 mois"; //18%

  Final.setDescription(`Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `)
                                               
  Role[message.author.id].CustomRole = Role[message.author.id].CustomRole + 1;
  logs(message, recompense, client);
  msg.edit(Final);
  
  } else if (luck > 50) {
  let recompense = "Grade Administrateur pendant 1 mois"; //30%

  Final.setDescription(`Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `)
                                              
  logs(message, recompense, client);
  msg.edit(Final);
  message.author.send("Un grade admin ... T'y as vraiment cru ?  <:kek:585459705330139136>");
  
  } else if (luck > 15) {
  let recompense = "Grade Préstige à vie"; //35%
  Final.setDescription(`Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `)
                                               
  Role[message.author.id].Prestige = Role[message.author.id].Prestige + 1;
  logs(message, recompense, client);
  msg.edit(Final);
  
  } else {
  let recompense = "Grade Légende à vie"; //15%
  Final.setDescription(`Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `)
                                               
  Role[message.author.id].Legende = Role[message.author.id].Legende + 1;
  logs(message, recompense, client);
  msg.edit(Final);
  }
  
  writeFile("./commands/DataBase/Datas/RP/Inventory/key.json", JSON.stringify(Key), err => { if (err) console.log(err); });
  writeFile("./commands/DataBase/Datas/RP/Inventory/role.json", JSON.stringify(Role), err => { if (err) console.log(err); });
}

async function result2(luck, message, Final, client, msg) {
  if (luck > 98) {
  let recompense = "Une clé de Box Grade"; //2%
  Final.setDescription(`Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `)
                                               
  Key[message.author.id].RoleKey = Key[message.author.id].RoleKey + 1; + 1;
  logs(message, recompense, client);
  msg.edit(Final);
  
  } else if (luck > 28) {
  let amount = Math.floor(Math.random() * 500) + 500;
  let recompense = amount + " éclairs ⚡"; //70%
  Final.setDescription(`Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `)
                                               
  logs(message, recompense, client);
  msg.edit(Final);
  
  } else if (luck > 8) {
  let recompense = "Token du bot <@!632590836017659932>"; //20%

  Final.setDescription(`Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `)
                                               
  message.author.send("MTI2NzM0NTc3NTc4NDIxNTM5.RM2zo3.Vm2G82Zmjyj1nlbcfvdq4tbJN87 || Nan, sérieux, t'y as vraiment cru ? Il n'est pas valide  <:kek:585459705330139136>||");
  logs(message, recompense, client);
  msg.edit(Final);
  
  } else if(luck > 5) {
  let recompense = "Grade Préstige à vie"; //8%
  Final.setDescription(`Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `)
                                               
  Role[message.author.id].Prestige = Role[message.author.id].Prestige + 1;
  logs(message, recompense, client);
  msg.edit(Final);
  } else {
  let recompense = "Grade avec couleur et nom personalisés pendant 1 mois"; //5%

  Final.setDescription(`Bravo ! Vous avez gagné un **${recompense}** ! <:confetti:655560168485945357> \nRécupérez votre récompense avec la commande \`e/claim <item>\` `)
                                               
  Role[message.author.id].CustomRole = Role[message.author.id].CustomRole + 1;
  logs(message, recompense, client);
  msg.edit(Final);
  }
  
  writeFile("./commands/DataBase/Datas/RP/Inventory/key.json", JSON.stringify(Key), err => { if (err) console.log(err); });
  writeFile("./commands/DataBase/Datas/RP/Inventory/role.json", JSON.stringify(Role), err => { if (err) console.log(err); });
}
                                                   
                                                