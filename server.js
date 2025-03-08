const express = require("express");
const cors = require("cors");
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
  html: true,      
  linkify: true,
  typographer: true,
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Markdown Converter API is running.");
});

app.post("/convert", (req, res) => {
  const { markdown } = req.body;
  if (!markdown) {
    return res.status(400).json({ error: "No markdown content provided." });
  }
  try {
    const html = md.render(markdown);
    res.json({ html });
  } catch (error) {
    console.error("Error converting markdown:", error);
    res.status(500).json({ error: "Error converting markdown to HTML." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
