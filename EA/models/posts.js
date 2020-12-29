const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/eadb',{ useNewUrlParser: true ,useUnifiedTopology: true})
//     .then(() => console.log('DB connected...'))
//     .catch(err => console.log('Cannot connect to DB...', err));

const Post = new mongoose.model('room', new mongoose.Schema({
    tieude:     {type: String, required: true, minlength:1, maxlength:255},
        //Địa chỉ:=======================
        quanhuyen:   {type: String, required: true, enum: ['Hoàn Kiếm', 'Đống Đa', 'Ba Đình', 'Hai Bà Trưng', 'Thanh Xuân', 'Tây Hồ', 'Cầu Giấy']},
        duong: {type: String, maxlength: 255},
        chitiet:{type: String, maxlength: 255},
        //================================
    goiy:       {type: String, maxlength: 255},
    // phòng trọ/ chung cư mini/ nhà nguyên căn/chung cư nguyên căn/ khác
    phanloai:   {type: String},
    soluong:   {type: Number, min:1, max: 30, required: true, default:1},
    // *1000 vnd
    gia:        {type: Number, required: true, min:100},
    // *m^2
    dientich:   {type: Number, min:1},
    chungchu:   Boolean,

        // Điều kiện cơ sở vật chất:===========================
        phongtamkhepkin:    {type: Boolean, required: true},
        phongtamnonglanh:   {type: Boolean, required: true},
        // min: 1, max:3,enum:['chung', 'riêng', 'không']
        phongbep:           {type: String, enum: ['chung', 'riêng', 'không'], required: true},
        dieuhoa:            {type: Boolean, required: true},
        bancong:            {type: Boolean, required: true},
        // số điện (kW/h), số nước (m^3)
        giadien:            {type: Number, required:true, min:1},
        gianuoc:            {type: Number, required:true, min:1},
        // tủ lạnh/ máy giặt/ giường tủ
        khac:               {type:String, maxlength: 255},
        //======================================================
    
    // link 3 ảnh

    // thong tin => owner, ref
    owener:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    // lifetime
    isPublished: {type: Boolean, required: true, default: false},
    isRented: {type: Boolean, required: true, default: false},
    // isexpired: {type: Boolean, required: true},
    // publishtime: Date

    //danhgia
    //like

}));
function a(b)
{
    if(b!=null) return true ;
    return false ;
}
module.exports.preparepost = async function preparepost (
    tieude_p, quanhuyen_p, duong_p, chitiet_p, goiy_p, phanloai_p, 
    soluong_p, gia_p, dientich_p, chungchu_p, phongtamkhepkin_p, 
    phongtamnonglanh_p, phongbep_p, dieuhoa_p, bancong_p, giadien_p, 
    gianuoc_p, khac_p 
)
{
    // /
    chungchu_p = a(chungchu_p);
    phongtamkhepkin_p = a(phongtamkhepkin_p);
    phongtamnonglanh_p = a(phongtamnonglanh_p);
    dieuhoa_p = a(dieuhoa_p);
    bancong_p = a(bancong_p);

    let post = new Post({
        tieude : tieude_p,
        quanhuyen : quanhuyen_p,
        duong: duong_p,
        chitiet : chitiet_p,
        goiy : goiy_p,
        phanloai : phanloai_p,
        soluong : soluong_p,
        gia :gia_p,
        dientich : dientich_p,
        chungchu : chungchu_p,
        phongtamkhepkin :phongtamkhepkin_p,
        phongtamnonglanh : phongtamnonglanh_p,
        phongbep : phongbep_p,
        dieuhoa :dieuhoa_p,
        bancong : bancong_p,
        giadien : giadien_p,
        gianuoc : gianuoc_p,
        khac : khac_p,
        owener:'5fe307f40c078015ac2fa257'
    });
    // */
    try{
        await post.save();
        
    }
    catch (ex) {
        console.log(ex.message);
    }
}
module.exports.findpostbyid = async function findpostbyid(id) {

    return await Post.findById(id).catch(err=> err.message);
}
// findpostbyid("5fe6c2aed2bab62134d1d4d8");

exports.Post = Post;

