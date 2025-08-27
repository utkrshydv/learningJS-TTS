import express from "express";
import fetch from "node-fetch";  

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");  
  next();
});

app.get("/translate", async (req, res) => {
  const { sl, dl, text } = req.query;

  try {
    const apiUrl = `https://ftapi.pythonanywhere.com/translate?sl=${sl}&dl=${dl}&text=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
