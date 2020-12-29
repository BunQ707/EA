const Joi= require('joi');
const room_function = require('../models/posts.js');
const mongoose = require('mongoose');

const roomschema ={
    // điều kiện để kiểm tra lần 2
};

//============================= test ===========================
// mongoose.connect('mongodb://localhost/eadb',{ useNewUrlParser: true ,useUnifiedTopology: true})
//     .then(() => console.log('DB connected...'))
//     .catch(err => console.log('Cannot connect to DB...', err));


const Test = new mongoose.model('test', new mongoose.Schema({
    name: {type: String, required: true}
}));
// let t= new Test({
//     name:'abcss'
// })
// t.save();


//==============================================================

/* 
TODO: 
    Tìm kiếm:
        Theo id
        Theo đặc điểm
        Trả về theo trang
    Tạo mới 
    Chỉnh sửa
    (?) Xoá
    (?) update


*/


// Điều khiển tạo mới :
module.exports.createPost = async function create(req, res, next)
{
    // nhận dữ liệu từ req, dùng joi kiểm tra lần 2:
    // Joi.validate()
    // gọi hàm từ model, chờ rồi thông báo thành công hay không qua res

    
    try{
        // let t= new Test({
        //     name: req.body.name
        // });
        // await t.save();
        // res.send(t);
        
        // await room_function.preparepost(
        //     req.body.tieude_p, req.body.quanhuyen_p, req.body.duong_p, req.body.chitiet_p, req.body.goiy_p, req.body.phanloai_p, req.body.soluong_p, 
        //     req.body.gia_p, req.body.dientich_p, req.body.chungchu_p, req.body.phongtamkhepkin_p, req.body.phongtamnonglanh_p, 
        //     req.body.phongbep_p, req.body.dieuhoa_p, req.body.bancong_p, req.body.giadien_p, req.body.gianuoc_p, req.body.khac_p
        // )

        res.json(req.body);
    }
    catch(ex)
    {
        console.log(ex.message);
        res.send(ex.message);
    }
}
