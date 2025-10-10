const authRoutes = require('./auth.route');
const productCategoryRoutes = require('./product-category.route');
const accountRoutes = require('./account.route');

module.exports = (app) => {
  const version = '/api/v1/admin';

  app.use(version + '/auth', authRoutes)

  app.use(version + '/product-category', productCategoryRoutes);

  app.use(version + '/accounts', accountRoutes)
}