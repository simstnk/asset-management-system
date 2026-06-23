require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ROUTES
app.use('/api/assets', require('./src/routes/assets'));
app.use('/api/stocks', require('./src/routes/stocks'));
app.use('/api/maintenances', require('./src/routes/maintenances'));
app.use('/api/activities', require('./src/routes/activities'));
app.use('/api/loans', require('./src/routes/loans'));
app.use('/api/divisions', require('./src/routes/divisions'));
app.use('/api/categories', require('./src/routes/categories'));
app.use('/api/locations', require('./src/routes/locations'));

// AUTH & LOGS
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/logs', require('./src/routes/logs'));

app.get('/', (req, res) => {
  res.json({
    message: 'API Inventaris Aset - Infrastruktur Teknologi Informasi',
    version: '2.0',
    status: 'running',
    endpoints: {
      assets: '/api/assets',
      stocks: '/api/stocks',
      maintenances: '/api/maintenances',
      activities: '/api/activities',
      divisions: '/api/divisions',
      categories: '/api/categories',
      locations: '/api/locations',
      loans: '/api/loans',
      auth: '/api/auth',
      logs: '/api/logs'
    }
  });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});