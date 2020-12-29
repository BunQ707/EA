const { date, func } = require('joi');
const mongoose = require('mongoose');

/* 
TODO: 
    Tạo model cho like
        Thêm
        Xoá
    Tìm bài đã like
        Theo tài khoản
        Theo bài post
*/

const Like = new mongoose.model('like',new mongoose.Schema({
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room',
        required: true
    },
    birth:{
        type: Date,
        required: true
    }
}));

module.exports.doLike = async function doLike(acc_id, post_id) {
    let alike =new Like({
        account: acc_id,
        post: post_id,
        birth: Date.now()
    })
    try{
        await alike.save();
    }
    catch (ex) {
        console.log(ex.message);
    }    
}
module.exports.undoLike = async function undoLike(id) {
    await Like.deleteOne({ _id: id});
}
module.exports.findByAccount = async function findByAccount(acc_id) {
    return await Like.find({ account: acc_id}).catch(err=> err.message);
}
module.exports.findByPost = async function findByPost(post_id){
    return await Like.find({ post: post_id}).catch(err=> err.message);
}
module.exports.countByPost = async function countByPost (post_id){
    return await Like.find({ post: post_id}).length.catch(err=> err.message);
}