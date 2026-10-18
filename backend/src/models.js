import mongoose from 'mongoose';
const {Schema,model}=mongoose;
export const User=model('User',new Schema({name:{type:String,required:true},email:{type:String,unique:true,required:true,lowercase:true},passwordHash:{type:String,required:true},role:{type:String,enum:['customer','admin'],default:'customer'},addresses:{type:Array,default:[]}}, {timestamps:true}));
export const Product=model('Product',new Schema({id:{type:String,unique:true},name:String,brand:String,family:String,gender:String,price:Number,oldPrice:Number,rating:Number,reviews:Number,badge:String,mood:[String],size:Number,shape:String,liquid:String,cap:String,description:String,notes:Object,meters:Object,image:String,stock:{type:Number,default:20}}, {timestamps:true}));
export const Order=model('Order',new Schema({id:{type:String,unique:true},userId:{type:Schema.Types.ObjectId,ref:'User'},items:Array,address:Object,payment:String,subtotal:Number,discount:Number,delivery:Number,total:Number,status:{type:String,default:'Placed'}},{timestamps:true}));
export const Wishlist=model('Wishlist',new Schema({userId:{type:Schema.Types.ObjectId,unique:true,ref:'User'},productIds:[String]}));
export const Review=model('Review',new Schema({productId:String,userId:Schema.Types.ObjectId,name:String,text:String,rating:Number},{timestamps:true}));
export const Entry=model('Entry',new Schema({kind:String,key:String,owner:String,data:Schema.Types.Mixed},{timestamps:true}));
