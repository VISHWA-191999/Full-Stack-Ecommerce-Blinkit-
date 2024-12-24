
// Backend endpoint 
export const BASE_URl = import.meta.env.VITE_API_URL
console.log("BASE_URl",BASE_URl)
const SummaryApi = {
    register : {
        url : 'api/user/register',
        method: 'post'
    },
    login : {
        url : 'api/user/login',
        method:'post'
    },
    forgot_pass :{
        url:'api/user/forgot-password',
        method:'put'
    },
    forgot_pass_otp_verification : {
        url:'api/user/verify-forgot-password-otp',
        method:'put'
    },
    resetPassword : {
        url:"api/user/reset-password",
        method:'put'
    },
    refreshToken : {
        url:'api/user/refresh-token',
        method:'post'
    },
    userDetails : {
        url : 'api/user/user-details',
        method:'get'
    },
    logout : {
        url : "api/user/logout",
        method:"get"
    },
    uploadAvatar : {
        url : "/api/user/upload-avatar",
        method : 'put'
    },
    updateUserDetails : {
        url : '/api/user/update-user',
        method : 'put'
    },
    addCategory :{
        url : '/api/category/addCategory',
        method:'post'
    },
    uploadImage :{
        url:"/api/file/upload",
        method:'post'
    },
    getCategory:{
        url:"api/category/get",
        method:"get"
    },
    updateCategory:{
        url:"api/category/updateCategory",
        method:'put'
    },
    deleteCategory:{
        url:"api/category/deleteCategory",
        method:"delete"
    },
    createSubCategory :{
        url :"api/subcategory/create",
        method:'post'
    },
    getSubCategory :{
        url :"api/subcategory/get",
        method:'get'
    },
    updateSubCategory:{
        url:"api/subcategory/update",
        method:'put'
    },
    deleteSubCategory:{
        url:"api/subcategory/delete",
        method:'delete'
    },
    createProduct:{
        url : '/api/product/create',
        method : 'post'
    },
    getProduct:{
        url:'/api/product/get',
        method:'get'
    },
    deleteProduct:{
        url:'/api/product/delete',
        method:'delete'
    },
    updateProductDetails:{
        url:'/api/product/update',
        method:'put'
    },
    getProductByCategory:{
        url:'/api/product/get-product-by-category',
        method:'post'
    },
    getProductByCategoryAndSubCategory : {
        url : '/api/product/get-pruduct-by-category-and-subcategory',
        method : 'post'
    },
    searchProduct : {
        url : '/api/product/search-product',
        method : 'post'
    },
    getProductDetails : {
        url : '/api/product/get-product-details',
        method : 'post'
    },
    addTocart : {
        url : "/api/cart/create",
        method : 'post'
    },
    getCartItem : {
        url : '/api/cart/get',
        method : 'get'
    },
    updateCartItemQty : {
        url : '/api/cart/update-qty',
        method : 'put'
    },
    deleteCartItem : {
        url : '/api/cart/delete-cart-item',
        method : 'delete'
    },
  
    createAddress : {
        url : '/api/address/create',
        method : 'post'
    },
    getAddress : {
        url : '/api/address/get',
        method : 'get'
    },
    updateAddress : {
        url : '/api/address/update',
        method : 'put'
    },
    disableAddress : {
        url : '/api/address/disable',
        method : 'delete'
    },
    CashOnDeliveryOrder : {
        url : "/api/order/cash-on-delivery",
        method : 'post'
    },
    payment_url : {
        url : "/api/order/checkout",
        method : 'post'
    },
    getOrderItems : {
        url : '/api/order/order-list',
        method : 'get'
    }

}

export default SummaryApi;