const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  if (err.code === 11000) {
    return res.status(400).json({ error: 'Duplicate key error' });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  
  res.status(500).json({ error: err.message || 'Internal server error' });
};

module.exports = errorHandler;