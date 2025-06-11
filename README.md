# ⚡ Markdown Conversion API (Backend)

This project provides a Node.js backend for a real-time Markdown editor. It exposes both a REST endpoint and a WebSocket interface for converting Markdown to HTML.

## 🛠️ Features

- Converts Markdown to HTML using **markdown-it**
- Supports emoji, footnotes, sub/sup, and syntax highlighting
- Sanitizes HTML output to prevent XSS
- Real-time updates via **Socket.IO**
- Docker ready for easy deployment

## ⚙️ Installation

```bash
npm install
cp .env.example .env # adjust if needed
npm run dev          # or `npm start` for production
```

## 📑 API Usage

Send a POST request to `/convert` with a JSON body containing a `markdown` field:

```bash
curl -X POST http://localhost:5000/convert \
     -H "Content-Type: application/json" \
     -d '{"markdown":"# Hello"}'
```

The response contains the rendered HTML.

### WebSocket

Connect using Socket.IO and emit a `markdown` event with your Markdown text. Every update is broadcast back to all connected clients via the `update` event containing the converted HTML.

## 🧪 Tests

Run all tests with:

```bash
npm test
```

---

Licensed under the ISC license.
