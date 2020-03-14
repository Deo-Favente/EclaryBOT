const { writeFile } = require("fs");
const Embed = require("../../handlers/embed.js");
const Stats = require("../../handlers/stats.js");
const Bingo = require("../DataBase/Assets/Module/bingo.json");
const BingoTime = new Set()
const BingoCooldown = new Set()

module.exports = {
  name: "bingo",
  category: "Rp",
  description:
    "Permet de lancer  une partie de bingo",
  usage: "e/bingo start <easy / medium / hard> || e/bingo <Nombre>",
  statut: "on",
  run: async (client, message, args) => {
    
    if (!args[0]) return message.channel.send(Embed('NeedToStartBingo', message))
    //Start Bingo Game
    if (args[0].toLowerCase() === "start") {
      if (!BingoCooldown.has(message.author.id)) {
      if (!args[1]) return message.channel.send(Embed('NoDifficultyBingo', message))
      let level = '', time = '', rltime = '';
      if (args[1].toLowerCase() === "easy" || args[1].toLowerCase() === "facile" || args[1].toLowerCase() === "1") { level = 'Facile', time = 90000, rltime = '1m30s'}
      if (args[1].toLowerCase() === "medium" || args[1].toLowerCase() === "moyen" || args[1].toLowerCase() === "2") { level = 'Moyen', time = 60000, rltime = '1m'}
      if (args[1].toLowerCase() === "hard" || args[1].toLowerCase() === "difficile" || args[1].toLowerCase() === "3") { level = 'Difficile', time = 30000, rltime = '30s' }
      if (level === '' || time === '') return message.channel.send(Embed('NoDifficultyBingo', message))
      if (BingoTime.has(message.author.id)) return message.channel.send(Embed('AlreadyGameInProgress', message));
        //DB
        Bingo[message.author.id] = {
          player: message.author.id,
          number: Math.floor(Math.random() * 1000),
          guess: false,
          level: level,
          time: rltime,
          finish: false
        };

        writeFile("./commands/DataBase/Assets/Module/bingo.json", JSON.stringify(Bingo), err => { if (err) console.log(err); });
      
        //Info
        message.channel.send(Embed('StartBingo', message, [Bingo[message.author.id].time, Bingo[message.author.id].level]));
        
        //Real Game Start
        BingoTime.add(message.author.id);
        
        //Game End
        setTimeout(() => {
          if (Bingo[message.author.id].guess == false) {
            
            //Set game statut to finish
            Bingo[message.author.id].finish = true;
            writeFile("./commands/DataBase/Assets/Module/bingo.json", JSON.stringify(Bingo), err => { if (err) console.log(err); });
            BingoTime.delete(message.author.id);
            BingoCooldown.delete(message.author.id);
            level == 'Difficile' ? Stats('LostBingoGameHard', message.author.id) : level == 'Moyen' ? Stats('LostBingoGameMedium', message.author.id) : Stats('LostBingoGameEasy', message.author.id);
            
            //Info + DB
            message.channel.send(Embed('EndBingo', message, [Bingo[message.author.id].number]))
          }
        }, time);
      } else return message.channel.send(Embed('AlreadyGameInProgress', message));
    //Guess Number
    } else if (BingoTime.has(message.author.id)) {     
      if(isNaN(args[0])) return message.channel.send(Embed('InvalidGuessNumber', message))
      //Number Check
      if (args[0] > Bingo[message.author.id].number) {
        message.channel.send(Embed('LessBingo', message));
        Stats('BingoAttempt', message.author.id)
        
      } else if (args[0] < Bingo[message.author.id].number) {
        message.channel.send(Embed('MoreBingo', message));
        Stats('BingoAttempt', message.author.id)
        
      } else if ((args[0] = Bingo[message.author.id].number)) {
        
        //Info + DB
        Stats('BingoAttempt', message.author.id)
        message.channel.send(Embed('WinBingo', message, [Bingo[message.author.id].number]));
        BingoTime.delete(message.author.id);
        Bingo[message.author.id].guess = true;
        Bingo[message.author.id].level == 'Difficile' ? Stats('WinBingoGameHard', message.author.id) : Bingo[message.author.id].level == 'Moyen' ? Stats('WinBingoGameMedium', message.author.id) : Stats('WinBingoGameEasy', message.author.id);
        
      }
    } else return message.channel.send(Embed('NeedToStartBingo', message));
  }
}
