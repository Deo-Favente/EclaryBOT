/*getUserDiscordData();
var UserData = ""
    async function getUserDiscordData() {
      var Request = await fetch("https://discordapp.com/api/users/@me", {
        method: "GET",
        headers: {
          authorization: "Bearer " + getCookie("DiscordToken")
        }
      }).then(async function(res) {
        if (res.status == 200) {
          res.json().then(function(Result) {
            if (Result.id) {
              console.log("Fin requête");
              UserData = Result;
              useresp();
            } else {
              useresp();
            }
          });
        } else {
          useresp();
        } // woah, déjà fini ? pour info, useresp = use resp = utiliser la réponse
      });
    }

    // Write
    function useresp() {
      if (!UserData)
        console.log('No info')
      if (UserData) {
        console.log(UserData)
        let login = document.getElementById("text");
        login.innerHTML = `<img class="avatar" src="https://cdn.discordapp.com/avatars/${UserData.id}/${UserData.avatar}"> MY ACCOUNT`
      }
    }

    // Decode Cookie
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
*/