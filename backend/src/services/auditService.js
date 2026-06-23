const AuditLog = require('../models/AuditLog');

exports.log = async (userId, username, action, entity, entityId, changes = {}) => {
  // Validasi: jika userId atau username kosong, lewati pencatatan log
  if (!userId || !username) {
    console.warn('Audit log skipped: missing user info', { userId, username, action, entity });
    return;
  }

  try {
    await AuditLog.create({ 
      userId, 
      username, 
      action, 
      entity, 
      entityId, 
      changes 
    });
  } catch (err) {
    console.error('Audit log error:', err);
  }
};