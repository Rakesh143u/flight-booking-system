// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
// Derive __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1) Serve your public/ folder at web root
app.use(express.static(path.join(__dirname, 'public')));

// 2) (Optional) SPA fallback: send index.html for any unmatched route
app.get('/:splat*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// 3) Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
