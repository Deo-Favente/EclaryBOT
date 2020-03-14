const { RichEmbed } = require("discord.js");
const Stats = require('../commands/DataBase/Datas/RP/Stats/game.json')
const { writeFile } = require('fs')

module.exports = (name, userID, params) => {
  
  //Init
  if (!Stats[userID]) {
    Stats[userID] = {
          Bingo: { EasyGameWin: 0, EasyGameLost: 0, MediumGameWin: 0, MediumGameLost: 0, HardGameWin: 0, HardGameLost: 0, NumberAttempt: 0 },
          Daily: { TotalAttempt: 0, TotalMoney: 0 },
          Dice:  { TotalWin: 0, TotalLost: 0, TotalMoneyWin: 0, TotalMoneyLost: 0 },
    };
  }
  
  //Function
  switch (name) {
    case "LostBingoGameEasy":
      //Player Stats
      Stats[userID].Bingo.EasyGameLost += 1
      Stats.Bingo.EasyGameLost += 1
      writeFile("./commands/DataBase/Datas/RP/Stats/game.json", JSON.stringify(Stats), err => { if (err) console.log(err); });
      
      break;
    case "LostBingoGameMedium":
      //Player Stats
      Stats[userID].Bingo.MediumGameLost += 1
      Stats.Bingo.MediumGameLost += 1
      writeFile("./commands/DataBase/Datas/RP/Stats/game.json", JSON.stringify(Stats), err => { if (err) console.log(err); });
      
      break;
    case "LostBingoGameHard":
      //Player Stats
      Stats[userID].Bingo.HardGameLost += 1
      Stats.Bingo.HardGameLost += 1
      writeFile("./commands/DataBase/Datas/RP/Stats/game.json", JSON.stringify(Stats), err => { if (err) console.log(err); });
      
      break;
    case "WinBingoGameEasy":
      //Player Stats
      Stats[userID].Bingo.EasyGameWin += 1
      Stats.Bingo.EasyGameWin += 1
      writeFile("./commands/DataBase/Datas/RP/Stats/game.json", JSON.stringify(Stats), err => { if (err) console.log(err); });
      
      break;
    case "WinBingoGameMedium":
      //Player Stats
      Stats[userID].Bingo.MediumGameWin += 1
      Stats.Bingo.MediumGameWin += 1
      writeFile("./commands/DataBase/Datas/RP/Stats/game.json", JSON.stringify(Stats), err => { if (err) console.log(err); });
      
      break;
    case "WinBingoGameHard":
      //Player Stats
      Stats[userID].Bingo.HardGameWin += 1
      Stats.Bingo.HardGameWin += 1
      writeFile("./commands/DataBase/Datas/RP/Stats/game.json", JSON.stringify(Stats), err => { if (err) console.log(err); });
      
      break;
    case "BingoAttempt":
      //Player Stats
      Stats[userID].Bingo.NumberAttempt += 1
      Stats.Bingo.NumberAttempt += 1
      writeFile("./commands/DataBase/Datas/RP/Stats/game.json", JSON.stringify(Stats), err => { if (err) console.log(err); });
      
      break;
    case "DailyReward":
      //Player Stats
      Stats[userID].Daily.TotalAttempt += 1
      Stats.Daily.TotalAttempt += 1
      Stats[userID].Daily.TotalMoney += parseInt(params)
      Stats.Daily.TotalMoney += parseInt(params)
      writeFile("./commands/DataBase/Datas/RP/Stats/game.json", JSON.stringify(Stats), err => { if (err) console.log(err); });
      
      break;
  }
}
