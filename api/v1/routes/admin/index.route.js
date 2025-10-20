const authRoutes = require('./auth.route');
const productCategoryRoutes = require('./product-category.route');
const accountRoutes = require('./account.route');
const myAccountRoutes = require('./my-account.route');
const uploadCloudRoutes = require('./upload-cloud');

const authMiddleware = require('../../middlewares/admin/auth.middleware')

module.exports = (app) => {
  const version = '/api/v1/admin';
  // auth không cần middleware (khi đăng nhập làm gì có token mà xác thực)
  app.use(version + '/auth', authRoutes)

  app.use(version + '/product-category', authMiddleware.requireAuth, productCategoryRoutes);

  app.use(version + '/accounts', authMiddleware.requireAuth, accountRoutes);

  app.use(version + '/my-accounts', authMiddleware.requireAuth, myAccountRoutes);
  
  // Route chỉ upload ảnh và trả về đường dẫn ảnh. Tạm thời chưa cần auth
  app.use(version + '/upload-cloud-image', uploadCloudRoutes);
}