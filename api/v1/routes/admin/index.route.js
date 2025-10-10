const authRoutes = require('./auth.route');
const productCategoryRoutes = require('./product-category.route');

module.exports = (app) => {
  const version = '/api/v1/admin';

  app.use(version + '/auth', authRoutes)

  app.use(version + '/product-category', productCategoryRoutes);
}