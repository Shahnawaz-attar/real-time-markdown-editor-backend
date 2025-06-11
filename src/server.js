require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const MarkdownIt = require('markdown-it');
const mdEmoji = require('markdown-it-emoji');
const mdFootnote = require('markdown-it-footnote');
const mdSub = require('markdown-it-sub');
const mdSup = require('markdown-it-sup');
const mdHighlight = require('markdown-it-highlightjs');
const sanitizeHtml = require('sanitize-html');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(mdEmoji.full)
  .use(mdFootnote)
  .use(mdSub)
  .use(mdSup)
  .use(mdHighlight);

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Markdown Converter API is running.');
});

app.post('/convert', (req, res) => {
  const { markdown } = req.body;
  if (!markdown) {
    return res.status(400).json({ error: 'No markdown content provided.' });
  }
  try {
    const html = sanitizeHtml(md.render(markdown));
    res.json({ html });
  } catch (error) {
    console.error('Error converting markdown:', error);
    res.status(500).json({ error: 'Error converting markdown to HTML.' });
  }
});

io.on('connection', (socket) => {
  socket.on('markdown', (data) => {
    try {
      const html = sanitizeHtml(md.render(data));
      socket.broadcast.emit('update', html);
      socket.emit('update', html);
    } catch (error) {
      console.error('Error converting markdown via socket:', error);
      socket.emit('error', 'Conversion failed');
    }
  });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = { app, server, io };
