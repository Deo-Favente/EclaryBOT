const { writeFile } = require("fs");
const Role = require("../commands/DataBase/Datas/RP/Inventory/role.json");
const Key = require("../commands/DataBase/Datas/RP/Inventory/key.json");
const Daily = require("../commands/DataBase/Assets/Time/daily.json");

module.exports = (user) => {
  
  if (!Daily[user.id]){
    Daily[user.id] = {
        time: 0,
    }
  }
  
  writeFile("./commands/DataBase/Assets/Time/daily.json", JSON.stringify(Daily), err => { if (err) console.log(err); });
}
