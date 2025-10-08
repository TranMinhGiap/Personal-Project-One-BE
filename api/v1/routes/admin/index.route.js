const authRoutes = require('./auth.route');

module.exports = (app) => {
  const version = '/api/v1/admin';

  app.use(version + '/auth', authRoutes)
}