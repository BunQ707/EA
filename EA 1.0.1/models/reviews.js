const mongoose = require('mongoose');
/* 
TODO: 
    Tạo model cho review
        Thêm
        (?) Sửa
        (?) Xoá 
    Tìm
*/


const Review = new mongoose.model('review',new mongoose.Schema({
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
    },
    content:{
        type: String,
        minlength: 1,
        maxlength: 255,
        required: true
    }
}));

module.exports.makeReview = async function makeReview(acc_id, post_id, content) {
    let aReview =new Review({
        account: acc_id,
        post: post_id,
        birth: Date.now(),
        content: content
    })
    try{
        await aReview.save();
    }
    catch (ex) {
        console.log(ex.message);
    }    
}
module.exports.deleteReview = async function deleteReview(id) {
    await Review.deleteOne({ _id: id});
}
module.exports.findByAccount = async function findByAccount(acc_id) {
    return await Review.find({ account: acc_id}).catch(err=> err.message);
}
module.exports.findByPost = async function findByPost(post_id){
    return await Review.find({ post: post_id}).catch(err=> err.message);
}
module.exports.countByPost = async function countByPost (post_id){
    return await Review.find({ post: post_id}).length.catch(err=> err.message);
}
module.exports.modifyReview = async function modifyReview (id, newContent) {
    // await Review.findById(id).content = newContent;
    await Review.update({_id:id}, {
        $set: {
            content: newContent
        }
    });
    
}