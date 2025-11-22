const authRoutes = require('./auth.route');
const productCategoryRoutes = require('./product-category.route');
const accountRoutes = require('./account.route');
const myAccountRoutes = require('./my-account.route');
const uploadCloudRoutes = require('./upload-cloud');
const roleRoutes = require('./role.route');
const productRoutes = require('./product.route');
const variantRoutes = require('./product-variant.route');

const authMiddleware = require('../../middlewares/admin/auth.middleware')

module.exports = (app) => {
  const version = '/api/v1/admin';
  // auth không cần middleware (khi đăng nhập làm gì có token mà xác thực)
  app.use(version + '/auth', authRoutes)

  app.use(version + '/product-category', authMiddleware.requireAuth, productCategoryRoutes);
  
  app.use(version + '/products', authMiddleware.requireAuth, productRoutes);

  app.use(version + '/variants', authMiddleware.requireAuth, variantRoutes);

  app.use(version + '/accounts', authMiddleware.requireAuth, accountRoutes);

  app.use(version + '/my-accounts', authMiddleware.requireAuth, myAccountRoutes);

  app.use(version + '/roles', authMiddleware.requireAuth, roleRoutes);
  
  // Route chỉ upload ảnh và trả về đường dẫn ảnh. Tạm thời chưa cần auth
  app.use(version + '/upload-cloud-image', uploadCloudRoutes);
}