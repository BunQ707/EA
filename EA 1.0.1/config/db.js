// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/eadb',{ useNewUrlParser: true ,useUnifiedTopology: true})
//     .then(() => console.log('DB connected...'))
//     .catch(err => console.log('Cannot connect to DB...', err));

// const OwnerInfo = new mongoose.model('ownerinfo', new mongoose.Schema({
//     isActivated:{type: Boolean, required: true},
//     hoten:      {type: String, required: true}, 
//     cccd:       {type: String, required: true, length:12}, 
//     diachi:     String,
//     //sdt:        {type: [String], validate: v => Array.isArray(v) && v.length > 0,},
//     sdt:        {type: String, required: true}, 
//     mail:       String, //[String],
//     sodutk:     {type: Number, default: 200} 
// }));

// const Acc = new mongoose.model('accounts',new mongoose.Schema({
//     // userid:         {type: Number, required: true},
//     username:       {type: String, required: true, minlength: 6, maxlength: 32},
//     userpassword:   {type: String, required: true, minlength: 6, maxlength: 32},
//     role:           {type: String, required: true, enum: ['admin', 'owner', 'renter'], lowercase: true},
//     dateCreated:    Date,
//     info: {
//         required: function() {return this.role == "owner"},
//         type: OwnerInfo.schema
//     }
// }));

// module.exports.addRenter = async function addRenter (u_name, u_password,)
// {
//     let acc = new Acc({
//         username: u_name,
//         userpassword: u_password,
//         role: "renter",
//         dateCreated: Date.now()
//     });
//     acc.save();
// }

// async function addOwner (u_name, u_password, u_hoten, u_cccd, u_sdt, u_diachi, u_mail)
// {
//     let acc = new Acc({
//         username: u_name,
//         userpassword: u_password,
//         role: "owner",
//         dateCreated: Date.now(),
//         info:
//         {
//             isActivated: false,
//             hoten: u_hoten,
//             cccd: u_cccd,
//             diachi: u_diachi,
//             sdt: u_sdt,
//             mail: u_mail,
//         }
//     });
//     acc.save();
// }
// module.exports.addOwner = addOwner;
// module.exports.getOwnerById = async function getOwnerById(id)
// {
//     return await OwnerInfo.find({_id: id});
//                     ;
//     // console.log(u);
    
// }
// module.exports.getUserByRole = async function getUserByRole(role){
//     return await Acc.find({role: role, info:{isActivated: false} });
// }


// //================  test   ================
// const acc = new Acc({
//     username: 'owner5',
//     userpassword: '123456',
//     role: "owner",
//     info:{
//         isActivated: false
//     }
// });

// // acc.save();

// // const asf = new ownerInfo({
// //     hoten: 'Vấn Đạo'
// // });
// // asf.save();

// async function gettt()
// {
//     // var u= await OwnerInfo.find();
//     //                 ;
//     // console.log(u);
//     // console.log(await Acc.find({role: 'owner', }));
//     try {
//         addOwner('owner7', '123456', "keiya", '123456789012', '123456789');
//     }
//     catch(err) {
//         console.log(err);
//       }
// }
// // gettt();


