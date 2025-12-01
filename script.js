const backend = "https://pravin-backend.onrender.com";

// ----------------------
// DARK/LIGHT MODE
// ----------------------
function toggleTheme(){
    document.body.classList.toggle("dark");
}

// ----------------------
// BREAKING NEWS
// ----------------------
async function loadBreakingNews(){
    let data = await fetch(backend + "/api/news")
    data = await data.json();

    document.getElementById("breakingNews").innerText =
        data.map(n => n.title).join(" | ");
}
setInterval(loadBreakingNews, 60000);
loadBreakingNews();

// ----------------------
// WEATHER AUTO DETECT
// ----------------------
navigator.geolocation.getCurrentPosition(async pos=>{
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;

    let w = await fetch(`${backend}/api/weather?lat=${lat}&lon=${lon}`);
    w = await w.json();

    document.getElementById("weatherCity").innerText = w.city;
    document.getElementById("weatherTemp").innerText = w.temp + "°C";
    document.getElementById("weatherCond").innerText = w.cond;
});

// ----------------------
// QUOTES
// ----------------------
async function loadQuotes(){
    let q = await fetch(backend + "/api/quotes");
    q = await q.json();

    document.getElementById("quoteText").innerText = q.q;
    document.getElementById("quoteAuthor").innerText = "- " + q.a;
}
loadQuotes();

// ----------------------
// TRENDING (SLIDER)
// ----------------------
let trendIndex = 0;
async function loadTrending(){
    let t = await fetch(backend + "/api/trending");
    t = await t.json();

    setInterval(()=>{
        document.getElementById("trendTitle").innerText = t[trendIndex];
        document.getElementById("trendImg").src =
            `https://source.unsplash.com/600x300/?india,news,${t[trendIndex]}`;
        trendIndex = (trendIndex + 1) % t.length;
    }, 10000);
}
loadTrending();

// ----------------------
// YOUTUBE VIDEOS
// ----------------------
async function loadYTVideos(){
    let yt = await fetch(backend + "/api/youtube");
    yt = await yt.json();

    let html = "";
    yt.forEach(v=>{
        html += `
        <div>
            <img src="${v.thumbnail}">
            <p>${v.title}</p>
            <a href="https://youtube.com/watch?v=${v.videoId}" target="_blank">▶ Watch</a>
        </div>`;
    });

    document.getElementById("ytVideos").innerHTML = html;
}
loadYTVideos();

// ----------------------
// BACK TO TOP BUTTON
// ----------------------
window.onscroll = ()=>{
    if(document.documentElement.scrollTop > 200){
        document.querySelector(".top-btn").style.display="block";
    } else {
        document.querySelector(".top-btn").style.display="none";
    }
};

function scrollTopFunc(){
    window.scrollTo({top:0, behavior:"smooth"});
}

// FOOTER YEAR
document.getElementById("year").innerText = new Date().getFullYear();
