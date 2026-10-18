const remote=Boolean(import.meta.env.VITE_API_URL);
const adapter=remote?await import('./adapters/remoteAdapter.js'):await import('./adapters/localAdapter.js');
export const mode=remote?'remote':'local';
export const {initialize,getProducts,getProduct,createUser,loginUser,logoutUser,getCurrentUser,updateProfile,changePassword,resetPassword,saveAddress,createOrder,getMyOrders,getAllOrders,updateOrderStatus,toggleWishlist,getWishlist,addReview,getReviews,validateCoupon,subscribeNewsletter,sendMessage,createProduct,updateProduct,deleteProduct,getAdminStats}=adapter;
