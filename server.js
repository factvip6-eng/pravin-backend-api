const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

// ----------------------------
// YOUTUBE AUTO NEW VIDEOS
// ----------------------------
app.get("/api/youtube", async(req, res) => {
    try {
        const channelId = "UCg3K5RVQmM2DaG7nYqvXcyQ"; // आपका चैनल
        const key = "AIzaSyAOTwIu-5HSgkindq6K4PxuUv3flESNeY4"; // YouTube API

        const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}&part=snippet,id&order=date&maxResults=12`;

        const data = await (await fetch(url)).json();

        const videos = data.items.map(v => ({
            title: v.snippet.title,
            thumbnail: v.snippet.thumbnails.high.url,
            videoId: v.id.videoId
        }));

        res.json(videos);

    } catch (err) {
        res.json({error: err});
    }
});

// ----------------------------
// TOP 10 NATIONAL HEADLINES
// ----------------------------
app.get("/api/news", async(req, res) => {
    try {
        const key = "6300366af0ce4746a6201813dac00603";
        const data = await (await fetch(`https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${key}`)).json();

        const news = data.articles.map(n => ({
            title: n.title,
            img: n.urlToImage,
            link: n.url
        }));

        res.json(news);

    } catch (err) {
        res.json({error: err});
    }
});

// ----------------------------
// QUOTES API
// ----------------------------
app.get("/api/quotes", async(req, res) => {
    try {
        const q = await (await fetch("https://zenquotes.io/api/random")).json();
        res.json(q[0]);

    } catch (err) {
        res.json({error: err});
    }
});

// ----------------------------
// TRENDING KEYWORDS
// ----------------------------
app.get("/api/trending", async(req, res) => {
    try {
        const data = await (await fetch("https://trends.google.com/trending/rss?geo=IN")).text();
        const keywords = [...data.matchAll(/<title>(.*?)<\/title>/g)]
            .map(m => m[1])
            .slice(1, 6);

        res.json(keywords);

    } catch (err) {
        res.json({error: err});
    }
});

// ----------------------------
// WEATHER AUTO DETECT
// ----------------------------
app.get("/api/weather", async(req, res) => {
    try {
        const {lat, lon} = req.query;
        const key = "08681fb83a1a24b71ba9fabb0ad95994";

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

        const data = await (await fetch(url)).json();

        res.json({
            city: data.name,
            temp: data.main.temp,
            cond: data.weather[0].main
        });

    } catch (err) {
        res.json({error: err});
    }
});


// ------------------------------------
app.listen(3000, () => console.log("Backend Live on PORT 3000"));



