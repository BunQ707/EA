const mongoose = require('mongoose');

/* 
TODO: 
    Tạo model cho report
        Thêm
    Tìm bài đã report
        Theo tài khoản
        Theo bài post
*/

const Report = new mongoose.model('report',new mongoose.Schema({
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

module.exports.doReport = async function doReport(acc_id, post_id, content) {
    let aReport =new Report({
        account: acc_id,
        post: post_id,
        birth: Date.now(),
        content: content
    })
    try{
        await aReport.save();
    }
    catch (ex) {
        console.log(ex.message);
    }    
}
module.exports.undoReport = async function undoReport(id) {
    await Report.deleteOne({ _id: id});
}
module.exports.findByAccount = async function findByAccount(acc_id) {
    return await Report.find({ account: acc_id}).catch(err=> err.message);
}
module.exports.findByPost = async function findByPost(post_id){
    return await Report.find({ post: post_id}).catch(err=> err.message);
}
module.exports.countByPost = async function countByPost (post_id){
    return await Report.find({ post: post_id}).length.catch(err=> err.message);
}
module.exports.modifyReport = async function modifyReport (id, newContent) {
    // await Report.findById(id).content = newContent;
    await Report.update({_id:id}, {
        $set: {
            content: newContent
        }
    });
    
}