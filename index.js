//Init Server
const express = require("express");
const app = express();
const db = require("quick.db");
var server = require("http").Server(app);
var io = require("socket.io")(server);

//Init Bot
const Discord = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const moment = require("moment");
const cooldown = new Set();
const pub = new Set();
const pari = new Set();
const fetch = require("node-fetch");
const hastebin = require("hastebin");
//Commands loading
const client = new Discord.Client();

//Setup Serveur API
app.use(express.static("public"));

//Basic overclock
app.get("/", function (req, res) {
  res.status(200).send("Loading...");
});

//Ip logs
app.get("/api/load", async function (req, res) {
  if (!req.query.ip || !req.query.url) return;
  const ip = req.query.ip;
  const url = req.query.url;

  load(ip, url);
});

app.get("/api/home", async function (req, res) {
  if (!client.user) return;
  const nitro = require("./commands/DataBase/Datas/RP/Stats/nitro.json");
  /*if(!req.headers.token) return;
    
    let token = req.headers.token
    if(token !== process.env.APIKEY) return;*/
  const resp = db.all();
  const money = resp.sort((a, b) => (a.data < b.data ? 1 : -1));
  let content = [];
  let rank = 1;

  for (let i = 0; i < money.length; i++) {
    if (money[i].ID.startsWith("money")) {
      let user = client.users.get(money[i].ID.split("_")[2]);
      if (user.tag) {
        content.push(`${user.tag}`);
        rank++;
        if (rank == "4") break;
      }
    }
  }
  res.json({
    commands: client.commands.size,
    members: client.guilds.get("583756963586768897").memberCount,
    staff: client.guilds
      .get("583756963586768897")
      .roles.get("583766594027651082").members.size,
    nitro: nitro.nitro,
    top1: content["0"],
    top2: content["1"],
    top3: content["2"]
  });
});

app.get("/api/lb", async function (req, res) {
  if (!client.user) return;
  let quant = 0;
  if (!req.query.quant) {
    quant = 1000;
  } else {
    quant = req.query.quant;
  }

  const resp = db.all();
  const money = resp.sort((a, b) => (a.data < b.data ? 1 : -1));
  let content = [];
  let rank = 1;

  for (let i = 0; i < money.length; i++) {
    if (money[i].ID.startsWith("money")) {
      let user = client.users.get(money[i].ID.split("_")[2]);
      if (user && user.id) {
        let userInfo = [user.displayAvatarURL, user.username, db.fetch(`money_583756963586768897_${user.id}`), user.id]
        content.push(userInfo);
        rank++;
        if (rank > quant) break;
      }
    }
  }
  
  res.json({ data: squash(content) });
});

function squash(arr){
    var tmp = [], IDlist = [];
    for(var i = 0; i < arr.length; i++){
        if(IDlist.indexOf(arr[i][3]) == -1){
          let userID = arr[i][3]
          IDlist.push(userID)
          tmp.push(arr[i]);
          console.log(userID + IDlist)
        } else {
          console.log(arr[i][3] + IDlist)
        }
    }
    return tmp;
}

//Discord Ip
async function load(ip, url) {
  if (!client.user) return;
  fetch(`http://ip-api.com/json/${ip}`)
    .then(res => res.json())
    .then(body => {
      if (!body || !body.country) {
        var statut = "**400** Request Failed <:no:648627916317392936>";
      } else {
        var statut = "**200** Request Success <:update:657289109739536384>";
      }

      const LoadEmbed = new Discord.RichEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL)
        .setTitle("<:http:657294144208764948> **LOAD**")
        .addField("**<:system:657281284158259220> IP**", ip)
        .addField(
          "**<:here:657187989742419978> IP Location**",
          `**__Pays:__** ${body.country}** (${body.countryCode})**\n**__Région:__** ${body.regionName} **(${body.region})**\n**__Ville:__** ${body.city} **(${body.zip})**`
        )
        .addField("**<:time:656498169718505492> IZN**", body.timezone)
        .addField("**<:custom:657348326328500224> AS**", body.as)
        .addField("**<:bot:656104681222963205> Container Statut**", statut)
        .addField("**<:searching:657293789844602918> Domain**", url)
        .setTimestamp()
        .setFooter(client.user.username, client.user.dislayAvatarURL);

      const LoadChannel = client.channels.get("660904085964324877");
      if (!LoadEmbed)
        return LoadChannel.send(
          "Erreur 103 Processing <a:less:655094464959873044>"
        );
      LoadChannel.send(LoadEmbed);
    });
}

const listener = server.listen(process.env.PORT, function () { });

/*io.on('connection', function(socket) {
  if(!client) return;
  const guild = client.guilds.get("583756963586768897");
  if(!guild) return;
  let nitro = require('./commands/DataBase/Datas/RP/Stats/nitro.json')
  let staffRole = guild.roles.get('583766594027651082').members
  let botRole = guild.roles.get('631500138837442560').members
  let staffbotRole = guild.roles.get('583765962000564224').members
  let members = client.users.size

  socket.emit("init", { "home": { "stats": { "nitro": nitro.nitro, "staff": staffRole.size, "bots": staffbotRole.size + botRole.size, "membres": members }}});
  
  socket.on("id", function(data) {
    console.log(data);
    if (data.id == socket.id) {
    } else return;
  });
  const resp = db.all();
  const money = resp.sort((a, b) => (a.data < b.data ? 1 : -1));
  let content = [];

  for (let i = 0; i < 10; i++) {
    if(money[i].ID.startsWith('money')) {
    let user = client.users.get(money[i].ID.split("_")[2]);
    if (!user) return;
    let name = user.username;
    let avatar = user.avatarURL;

    content.push([`${name}`, `${money[i].data}`, `${avatar}`]);
  }}
    console.log(content)
  socket.emit("leaderboard", {
    data: content
  });
});*/

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.categories = fs.readdirSync("./commands/");
config({
  path: __dirname + "/.env"
});

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

// log
client.on("message", async message => {
  const prefix = "e/";

  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.guild.id === "583756963586768897") {
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    if (!message.member)
      message.member = await message.guild.fetchMember(message);

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (!command) {
      const ErrorEmbed = new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(
          "Cette commande n'existe pas <:no:648627916317392936> \nListe des commandes obtensible avec la commande `e/help` <:info:651876257386201090>"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL);

      message.channel.send(ErrorEmbed);
      message.delete().then(msg => {
        msg.delete(15000);
      });

      return;
    }

    if (!command.statut || command.statut == "on")
      command.run(client, message, args);

    if (command.statut == "staff") {
      if (!message.member.roles.has("583766594027651082"))
        return message.delete();
      console.log(
        `${message.member.user.username} a utilisé la commande ${command.name}`
      );
    }

    if (command.statut == "off") {
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.delete();
      console.log(
        `${message.member.user.username} a utilisé la commande ${command.name}`
      );
    }

    if (command.statut == "cooldown") {
      if (pari.has(message.author.id)) {
        if (message.content.toLowerCase().includes("e/bingo"))
          return command.run(client, message, args);

        let TimeEmbed = new Discord.RichEmbed()
          .setColor("RED")
          .setDescription(
            "Vous devez attendre **30 secondes** entre chaque commande <:time:656498169718505492>"
          )
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL);

        return message.channel.send(TimeEmbed);
      } else {
        command.run(client, message, args);
        pari.add(message.author.id);

        setTimeout(() => {
          pari.delete(message.author.id);
        }, 10000);
      }
    }
  } else return;
});

// login
client.login(process.env.TOKEN);

// member count
const statistiques = {
  serveurID: "583756963586768897",
  memberCountID: "632996802463006763"
};

client.on("guildMemberAdd", member => {
  if (member.guild.id !== statistiques.serveurID) return;

  client.channels
    .get(statistiques.memberCountID)
    .setName("『Membres : " + member.guild.memberCount + "』");
});

client.on("guildMemberRemove", member => {
  if (member.guild.id !== statistiques.serveurID) return;

  client.channels
    .get(statistiques.memberCountID)
    .setName("『Membres : " + member.guild.memberCount + "』");
});

// welcome message
client.on("guildMemberAdd", member => {
  let compteurdemembre = new Discord.RichEmbed()
    .setDescription(
      "<:confetti:655560168485945357> ** " +
      member.user.username +
      "** viens de rejoindre " +
      member.guild.name
    )
    .addField(
      "Utilisez `e/bvn` pour lui souhaiter la bienvenue",
      "\nNous sommes désormais **" +
      member.guild.memberCount +
      "** <:friend:657286761000730638>"
    )
    .setTimestamp()
    .setColor("17ace8")
    .setFooter("ÉclaryBOT", member.guild.iconURL);

  client.channels.get(`583768375608475795`).send(compteurdemembre);

  client.channels.get(`633748338310643722`).send({
    embed: {
      color: 0xe43333,
      title: `Statistiques du l'utilisateur **${member.user.username}**`,
      thumbnail: {
        url: member.user.displayAvatarURL
      },
      fields: [
        {
          name: "ID :",
          value: member.id
        },
        {
          name: "Compte crée le :",
          value: moment.utc(member.user.createdAt).format("LL")
        },
        {
          name: "A Rejoins le serveur le :",
          value: moment.utc(member.joinedAt).format("LL")
        }
      ]
    }
  });
});

// rename
client.on("guildMemberAdd", member => {
  member.setNickname("[💎] " + member.user.username);
});

// Modération
client.on("message", message => {
  let symbols = [";", ":", ""];
  var msg = message.content;
  if (message.author.bot)
    /*|| message.member.roles.has('583766594027651082'))*/ return;
  if (msg == msg.toUpperCase()) {
    if (message.mentions.users.size >= 1) {
      if (message.mentions.channels.size >= 1) {
        if (msg.includes(":") || msg.includes(";")) {
          if (message.member.roles.has("583766594027651082")) {
            let ReportEmbed = new Discord.RichEmbed()
              .setColor("a600ff")
              .setTitle("<:logs:661684612409589780> REPORT")
              .addField("Auteur du message :", message.author)
              .addField("Channel du message :", message.channel)
              .addField("Contenu du message :", `\`\`\`${msg}\`\`\``)
              .addField(
                "Date de l'action :",
                moment.utc(message.createdAt).format("LL")
              )
              .setDescription(
                `[Cliquer ici pour aller au message](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`
              )
              .setTimestamp()
              .setFooter(message.guild.name, message.guild.iconURL)
              .setAuthor(client.user.tag, client.user.displayAvatarURL);

            let reportChannel = client.channels.get("663387390429102120");
            if (!reportChannel) throw new Error("Channel Undefined");
            reportChannel.send(ReportEmbed);
          }
        }
      }
    }
  }
});
/*
client.on("message", async message => {
  if (message.author.id == "409875566800404480") {
    if (message.channel.id == "") {
      const args = message.content.trim().split(/ +/g);

      if (args[4] == "+") {
        const inv = new Discord.RichEmbed()
          .setDescription(
            `●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●\n**> <@${
              args[0]
            }> viens de débarquer sur le serveur <a:GhostWave:615968900919853077>**\n> Invité(e) par <@${
              args[1]
            }> qui passe maintenant à **${
              args[3]
            }** invitations !\n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●`
          )
          .setTitle("<:invitation:658293015055564811> INVITATION")
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL)
          .setColor("a64ca6");

        client.channels.get("635613287349747722").send(inv);
        /*if (invite >= 5) {
        let user = message.guild.members.get(args[1]);
        user.addRole("658330871593697281");
        user.addRole("658328081215389696");
      }
      if (invite >= 15) {
        let user = message.guild.members.get(args[1]);
        user.addRole("658330868590444583");
        user.addRole("658328081215389696");
      }
      }
      if (args[4] == "-") {
        db.subtract(`invite_${message.guild.id}_${args[1]}`, 1);
        var invite = db.fetch(`invite_${message.guild.id}_${args[1]}`);

        const inv = new Discord.RichEmbed()
          .setDescription(
            `●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●\n**> <@${
              args[0]
            }> viens de quitter le serveur 😭**\n> Invité(e) par <@${
              args[1]
            }> qui passe maintenant à ${
              args[3]
            } invitations !\n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●`
          )
          .setTitle("<:invitation:658293015055564811> INVITATION")
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL)
          .setColor("a64ca6");

        client.channels.get("633748338310643722").send(inv);
        /*if (invite <= 5) {
        let user = message.guild.members.get(args[1]);
        user.removeRole("658330871593697281");
        user.removeRole("658328081215389696");
      }
      if (invite <= 15) {
        let user = message.guild.members.get(args[1]);
        user.removeRole("658330868590444583");
      }*/

// xp system
client.on("message", message => {
  if (message.author.bot || message.channel.type === "dm") {
    return;
  }
  if (!message.content.startsWith("e/")) {
    if (!cooldown.has(message.author.id)) {
      let curXp = db.fetch(`xp_${message.guild.id}_${message.author.id}`);
      let curLvl = db.fetch(`xp_${message.guild.id}_${message.author.id}_lvl`);
      let xpAdd = Math.floor(Math.random() * 5) + 10;
      let nxtLvl = curLvl * 150;

      db.add(`xp_${message.guild.id}_${message.author.id}`, xpAdd);
      db.add(`message_${message.guild.id}_${message.author.id}`, 1);
      db.add(`xp_${message.guild.id}_${message.author.id}_xp`, xpAdd);

      cooldown.add(message.author.id);

      if (nxtLvl <= curXp) {
        db.add(`xp_${message.guild.id}_${message.author.id}_lvl`, 1);
        db.set(`xp_${message.guild.id}_${message.author.id}`, 0);

        db.add(`money_${message.guild.id}_${message.author.id}`, 500);

        let lvlup = new Discord.RichEmbed()
          .setTitle("<:levelup:659433131182522368> LEVEL UP !")
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL)
          .setColor("a64ca6")
          .setDescription(
            message.author +
            " viens de passer level **" +
            db.fetch(`xp_${message.guild.id}_${message.author.id}_lvl`) +
            "** ! Continues comme ça <a:Typing:635137206796681253>"
          );

        client.channels.get("631485122759360512").send(lvlup);
      }
      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 60000);
    } else return;
  } else return;
});

// complétment e/bvn
client.on("message", message => {
  if (message.channel.id === "583768375608475795") {
    if (!message.author.bot)
      if (!message.member.hasPermission("ADMINISTRATOR"))
        if (!message.content.includes("e/bvn")) {
          message.delete();
          const errorembed = new Discord.RichEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(
              "Vous n'avez pas le droit de discuter dans ce channel <:no:648627916317392936> \nUtilisez uniquement `e/bvn` pour souhaiter la bienvenue <:stop:656500221727211520>"
            )
            .setTimestamp()
            .setFooter("ÉclaryBOT", message.guild.iconURL);

          message.channel.send(errorembed).then(msg => {
            msg.delete(15000);
          });
        }
  }
});

// complétment e/nitro
client.on("message", message => {
  if (message.channel.id === "628956032420282388") {
    if (!message.author.bot)
      if (!message.member.hasPermission("ADMINISTRATOR"))
        if (!message.content.includes("e/nitro")) {
          message.delete();
          const errorembed = new Discord.RichEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(
              "Vous n'avez pas le droit de discuter dans ce channel <:no:648627916317392936> \nUtilisez uniquement `e/nitro` pour générer un code nitro <:stop:656500221727211520>"
            )
            .setTimestamp()
            .setFooter("ÉclaryBOT", message.guild.iconURL);

          message.channel.send(errorembed).then(msg => {
            msg.delete(15000);
          });
        }
  }
});

// complément e/pub
client.on("message", message => {
  const Pub = require("./commands/DataBase/Assets/Time/pub.json");
  if (message.author.bot) return;
  if (message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.channel.id === "657182555669266434") {
    if (!Pub[message.author.id]) {
      Pub[message.author.id] = {
        time: 0
      };
    }

    if (message.member.roles.has("583765960897593355")) {
      var timeout = 21600000; //Membre

      if (
        message.member.roles.has("605475764422443023") ||
        message.member.roles.has("658330871593697281")
      ) {
        var timeout = 10800000; //Préstige
      }
      if (
        message.member.roles.has("631496069200740403") ||
        message.member.roles.has("658330868590444583")
      ) {
        var timeout = 3600000; //Légende
      }
    }

    if (Pub[message.author.id].time > Date.now()) {
      let milliseconds = Pub[message.author.id].time - Date.now();

      //Get hours from milliseconds
      var hours = milliseconds / (1000 * 60 * 60);
      var absoluteHours = Math.floor(hours);
      var h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

      //Get remainder from hours and convert to minutes
      var minutes = (hours - absoluteHours) * 60;
      var absoluteMinutes = Math.floor(minutes);
      var m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

      //Get remainder from minutes and convert to seconds
      var seconds = (minutes - absoluteMinutes) * 60;
      var absoluteSeconds = Math.floor(seconds);
      var s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

      var time = h + "h " + m + "m " + s + "s ";

      const embed = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(
          "Vous avez déja envoyé une publicité <:no:648627916317392936> \nVous devez encore attendre **" +
          time +
          "** pour pouvoir en renvoyer une à nouveau <:time:656498169718505492>"
        )
        .setTimestamp()
        .setFooter("ÉclaryBOT", message.guild.iconURL);

      message.delete();
      return message.channel.send(embed).then(msg => {
        msg.delete(15000);
      });
    } else {
      if (!message.content.includes("discord.gg")) {
        message.delete(100);

        const errorembed = new Discord.RichEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setDescription(
            "Vous n'avez pas le droit de discuter dans ce channel <:no:648627916317392936> \nEnvoyez uniqument la publicité d'un serveur discord <:stop:656500221727211520>"
          )
          .setTimestamp()
          .setFooter("ÉclaryBOT", message.guild.iconURL);

        return message.channel.send(errorembed).then(msg => {
          msg.delete(15000);
        });
      } else {
        if (message.content.includes("discord.gg")) {
          var add = timeout + Date.now();
          Pub[message.author.id].time = add;

          fs.writeFile(
            "./commands/DataBase/Assets/Time/pub.json",
            JSON.stringify(Pub),
            err => {
              if (err) console.log(err);
            }
          );
        }
      }
    }
  }
});

// autorole
client.on("guildMemberAdd", member => {
  member.addRole("664477459231801344");
  member.addRole("634768128127139840");
});

// bienvenue
client.on("guildMemberAdd", member => {
  const WelcomeEmbed = new Discord.RichEmbed()
    .setTitle("<:confetti:655560168485945357> BIENVENUE SUR ÉCLARY !")
    .setColor("17ace8")
    .setDescription(
      " <:welcome:658339855616704538> Nous espérons que vous passerez un bon moment sur le serveur."
    )
    .addField(
      "N'oubliez pas de jeter un oeil aux channels :",
      "<#583768730077495313> pour approuver le règlement et avoir accès au serveur entier \n<#616425025679130632> pour récupérer vos rôles au choix \n<#628956032420282388> pour tester gratuitement notre générateur nitro \n<#585862743094067202> pour voir si des giveaways sont en cours \n<#616994843603763213> si vous avez des questions ou besoin d'aide \n<#657182555669266434> pour mettre en avant votre serveur"
    )
    // .setAuthor(member.tag, member.displayAvatarURL)
    .setTimestamp()
    .setFooter("ÉclaryBOT", member.guild.iconURL)

    .addField(
      "Pour bien débuter, utilisez les commandes :",
      "<:red_pin:657283187965165598> `e/about` qui explique le but du serveur \n<:info:651876257386201090> `e/help` qui vous donne toutes les commandes de notre bot \n<:shop:652202101719695453> `e/shop` pour comprendre notre économie, notre monnaie et nos récompenses"
    );

  member.send(WelcomeEmbed);
});

//Boost
client.on("nitroBoost", booster => {
  const BoostEmbed = new Discord.RichEmbed()
    .setTitle("<a:Boosting:661258026614915073> BOOST")
    .setColor("ff66e2")
    .setDescription(
      booster +
      " viens de booster le serveur ! Merci à lui <a:Pepe_NitroBoost:635137208474664961>"
    )
    .setTimestamp()
    .setFooter("ÉclaryBOT", booster.guild.iconURL)
    .setImage(
      "https://support.discordapp.com/hc/article_attachments/360013500032/nitro_gif.gif"
    );
  client.channels.get("583768375608475795").send(BoostEmbed);
  booster.addRole(booster.guild.roles.find("658330868590444583"));
  booster.addRole(booster.guild.roles.find("658328081215389696"));
  booster.addRole(booster.guild.roles.find("658330871593697281"));
});

//Role reaction
client.on("ready", () => {
  client.guilds
    .get("583756963586768897")
    .channels.get("616425025679130632")
    .fetchMessage("663097455071592451");
});

client.on("messageReactionAdd", (reaction, user) => {
  let message = reaction.message,
    emoji = reaction.emoji;
  if (emoji.name == "✨") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("587388700670033921");
    });
  }

  if (emoji.name == "🎊") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("587388841132818442");
    });
  }

  if (emoji.name == "🏆") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("587388937924771890");
    });
  }

  if (emoji.name == "📃") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("606159951638954005");
    });
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  let message = reaction.message,
    emoji = reaction.emoji;

  if (emoji.name == "✨") {
    message.guild.fetchMember(user.id).then(member => {
      member.removeRole("587388700670033921");
    });
  }

  if (emoji.name == "🎊") {
    message.guild.fetchMember(user.id).then(member => {
      member.removeRole("587388841132818442");
    });
  }

  if (emoji.name == "🏆") {
    message.guild.fetchMember(user.id).then(member => {
      member.removeRole("587388937924771890");
    });
  }

  if (emoji.name == "📃") {
    message.guild.fetchMember(user.id).then(member => {
      member.removeRole("606159951638954005");
    });
  }
});

//Role reaction 2
client.on("ready", () => {
  client.guilds
    .get("583756963586768897")
    .channels.get("616425025679130632")
    .fetchMessage("663102464895221790");
});

client.on("messageReactionAdd", (reaction, user) => {
  let message = reaction.message,
    emoji = reaction.emoji;
  if (emoji.name == "🏈") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("661729081620168717");
    });
  }

  if (emoji.name == "🎮") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("661728249298026496");
    });
  }

  if (emoji.name == "📹") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("588799392652328980");
    });
  }

  if (emoji.name == "💻") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("661728515779199016");
    });
  }

  if (emoji.name == "🎷") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("661729343332024383");
    });
  }

  if (emoji.name == "🖼️") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("661729270103670794");
    });
  }

  if (emoji.name == "🚧") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("661729451167580222");
    });
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  let message = reaction.message,
    emoji = reaction.emoji;

  if (emoji.name == "🏈") {
    message.guild.fetchMember(user.id).then(member => {
      member.removeRole("661729081620168717");
    });
  }

  if (emoji.name == "🎮") {
    message.guild.fetchMember(user.id).then(member => {
      member.removeRole("661728249298026496");
    });
  }

  if (emoji.name == "📹") {
    message.guild.fetchMember(user.id).then(member => {
      member.removeRole("588799392652328980");
    });
  }

  if (emoji.name == "💻") {
    message.guild.fetchMember(user.id).then(member => {
      member.removeRole("661728515779199016");
    });
  }

  if (emoji.name == "🎷") {
    message.guild.fetchMember(user.id).then(member => {
      member.removeRole("661729343332024383");
    });
  }

  if (emoji.name == "🖼️") {
    message.guild.fetchMember(user.id).then(member => {
      member.removeRole("661729270103670794");
    });
  }

  if (emoji.name == "🚧") {
    message.guild.fetchMember(user.id).then(member => {
      member.removeRole("661729451167580222");
    });
  }
});

client.on("message", msg => {
  /*if (msg.content.startsWith('e/'+'join')) {
   msg.member.voiceChannel.join()
            .then(connection => {
                //connection.playFile('./1-second-of-silence.mp3');
                connection.on('speaking', (user, speaking) => {
                    if (speaking) {
                        console.log("listen on");
                        const receiver = connection.createReceiver();
                        
                        const stream = receiver.createPCMStream(user);
                        const fileStream = fs.createWriteStream('audio.pcm')

                        fileStream.on('data', console.log)

                        stream.pipe(fileStream);
                      console.log("listen off");
                    }
                })
            })
      .catch(console.log);
  }
  if(msg.content.startsWith('e/'+'leave')) {
    let [command, ...channelName] = msg.content.split(" ");
    let voiceChannel = msg.guild.channels.find("name", channelName.join(" "));
    voiceChannel.leave();
  }*/
});

//Vérification
client.on("ready", () => {
  client.guilds
    .get("583756963586768897")
    .channels.get("583768730077495313")
    .fetchMessage("664474617175343119");
});
client.on("messageReactionAdd", (reaction, user) => {
  let message = reaction.message,
    emoji = reaction.emoji;
  if (emoji == "<:yes:648627916690685962>") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("583765960897593355");
      member.removeRole("664477459231801344");
    });
  }
});
//statut
/*client.on("guildMemberAdd", member => {
  let status = `e/help | ${
    client.guilds.get("583756963586768897").memberCount
    } membres`;
  client.user.setActivity(status, {
    type: "STREAMING",
    url: "https://www.twitch.tv/twitch"
  });
});

client.on("guildMemberRemove", member => {
  let status = `e/help | ${
    client.guilds.get("583756963586768897").memberCount
    } membres`;
  client.user.setActivity(status, {
    type: "STREAMING",
    url: "https://www.twitch.tv/twitch"
  });
});*/
/*
client.on("message", message => {
 if (message.channel.name.startsWith(`ticket-`)) {
   let LogEmbed = new Discord.RichEmbed()
    //.setAuthor(member.tag)
    .setTimestamp()
   // .setFooter("ÉclaryBOT", member.guild.iconURL)
    .setDescription(message.content) 
              client.channels.get("616991454824235048").send(LogEmbed)
      }})
*/


/*
client.on("message", message => {
  let objectif =  [client.guilds.get("583756963586768897").memberCount + 50]
  if (client.guilds.get("583756963586768897").memberCount = objectif) {
  let gchannel =  message.guild.channels.find(
    channel => channel.name === message.channel.name.startsWith(`「📈」Objectif :`)
  )
  gchannel.setName('「📈」Objectif :' + objectif, "Compteur")
}})
*/
client.on("ready", () => {
  const channel = client.channels.get("682007506918047900");
  if (!channel) return console.error("The channel does not exist!");
  channel.join().then(connection => {
    // Yay, it worked!
  }).catch(e => {
    // Oh no, it errored! Let's log it to console :)
    console.error(e);
  });
});











































/**
* Database Setup
*/
const SQLite = require("better-sqlite3");
const inv = new SQLite("./db/inventory/inventory.sqlite");

/**
* Database for inventory
*/
const table = inv.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'user';").get();
if (!table['count(*)']) {
  inv.prepare("CREATE TABLE user (id TEXT PRIMARY KEY, user TEXT, guild TEXT, rolekey INTEGER, v4box INTEGER, customrole INTEGER, legende INTEGER, prestige INTEGER, rainbowrole INTEGER, animaterole INTEGER);").run();
  inv.prepare("CREATE UNIQUE INDEX idx_user_id ON user (id);").run();
  inv.pragma("synchronous = 1");
  inv.pragma("journal_mode = wal");
}

/**
* Custom Module
*/
client.getInv = inv.prepare("SELECT * FROM user WHERE user = ? AND guild = ?");
client.setInv = inv.prepare("INSERT OR REPLACE INTO user (id, user, guild, rolekey, v4box, customrole, legende, prestige, rainbowrole, animaterole) VALUES (@id, @user, @guild, @rolekey, @v4box, @customrole, @legende, @prestige, @rainbowrole, @animaterole);");


