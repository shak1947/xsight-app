// Simple Express Server for Xsight App
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Xsight server running on port ${PORT}`);
    console.log(`📱 Access your app at: http://localhost:${PORT}`);
});

export default app;
