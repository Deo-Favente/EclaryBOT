let nCount = selector => {
  $(selector).each(function () {
    $(this)
      .animate({
        Counter: $(this).text()
      }, {
        duration: 4000,
        easing: "swing",
        step: function (value) {
          $(this).text(Math.ceil(value));
        }
      });
  });
};

let a = 0;
$(window).scroll(function () {
  let oTop = $(".numbers").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() >= oTop) {
    a++;
    nCount(".rect > h1");
  }
})

let navbar = $(".navbar");
$(window).scroll(function () {
  let oTop = $(".section-2").offset().top - window.innerHeight;
  if ($(window).scrollTop() > oTop) {
    navbar.addClass("sticky");
  } else {
    navbar.removeClass("sticky");
  }
});

var UserData;
let login = document.getElementById("text");
getUserDiscordData()

async function getUserDiscordData(){
  var RequestSuccess = false
  var Request = fetch("https://discordapp.com/api/users/@me", {
    method: "GET",
    headers: {
      authorization: "Bearer " + getCookie("DiscordToken")
    }
  }).then(async function (res) {
    if(res.status == 200){
      res.json().then(function (Result) {
        if(Result.id){
          console.log("Fin de requête")
          UserData = Result
          login.innerHTML = `<img class="avatar" src="https://cdn.discordapp.com/avatars/${UserData.id}/${UserData.avatar}"> ${UserData.username.toUpperCase()}`
        }
      })} else {
        if(window.location.href.includes("profile.html")) {
          window.location="https://discordapp.com/login?redirect_to=%2Foauth2%2Fauthorize%3Fclient_id%3D632253883674001436%26redirect_uri%3Dhttps%253A%252F%252Fmarketdev.glitch.me%252Fconnect%26response_type%3Dcode%26scope%3Didentify%2520guilds"
        }
      }
  }).catch(async function (error){
    console.log(error)
  })
}

function getCookie (cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for(var i=0; i<ca.length; i++){
    var c = ca[i];
    while(c.charAt(0) == " "){
      c = c.substring(1);
    }
    if(c.indexOf(name) == 0){
      return c.substring(name.length,c.length);
    }}
  return "";
}

function redirect(url) {
  if(window.location.href.startsWith("https://eclary.glitch.me")) {
    window.location= `https://eclary.glitch.me${url}`
  } else {
    window.location= `https://eclary.tk${url}`;
  }
}

let loader = $(".loader");
let page = $("page");
setTimeout(() => {
    loader.fadeOut(500);
    page.fadeIn(500)
}, 800)