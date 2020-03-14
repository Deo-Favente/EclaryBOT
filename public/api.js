const socket = io('https://eclarybot.glitch.me')

socket.on('init', function(data) {
  let url = new URL(window.location.href)
  let page = url.searchParams.get("page");
  let box = document.getElementById('text')
  
 /* switch (page) {
    case "https://eclary.glitch.me/home":
    case "https://eclary.glitch.me/":
    case "https://eclary.tk/home":
    case "https://eclary.tk/":
    default:*/
      box.innerText = `{"stats":{"bots": "${data.home.stats.bots}", "membres": "${data.home.stats.membres}", "staff": "${data.home.stats.staff}", "nitro": "${data.home.stats.nitro}"}}`
  //}
  /*if (page === 'https://eclary.glitch.me/home' || url === "https://eclary.glitch.me/"){
    document.getElementById('news-img').src = data.news_main.img
    document.getElementById('news-preview').innerText = data.news_main.preview
    document.getElementById('news-title').innerText = data.news_main.title
    console.log(data)
  }
  document.getElementById('stats-nitro').innerText = data.stats.nitro*/
})