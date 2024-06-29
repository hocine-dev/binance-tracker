const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'binance-tracker' directory
const staticPath = path.join(__dirname, '../../');
app.use(express.static(staticPath));

// API Routes
app.use('/api', require('./routes/api'));

// Default route handler
app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;