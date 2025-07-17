// // const registeredHome=[];

// const Home = require("../models/homes");

// exports.getAddHome=(req,res,next)=>{
//     // res.sendFile(path.join(rootDir,'views','addHome.html'));
//     res.render('host/addHome',{pageTitle: 'Add Home'});
// };
// exports.postAddHome = (req,res,next)=>{
//     const home=new Home(req.body.houseName, req.body.price, req.body.location, req.body.rating, req.body.photoUrl);
//     // const {houseName, price, location, rating, photoUrl}=req.body;
//     // const home= new Home(houseName, price, location, rating, photoUrl);
//     home.save();
//     // res.sendFile(path.join(rootDir,'views','homeAdded.html'));
//     res.render('host/homeAdded',{pageTitle: 'Home Added SuccesFully'});
// };



// exports.getHomes = (req,res,next)=>{
//     // res.sendFile(path.join(rootDir,'views','home.html'));
//     const registeredHome=Home.fetchAll(registeredHome=>{
//         res.render('store/homePage',{registeredHome, pageTitle:'airbnb Home'});
//     });
    
// };

// exports.goTo404 = (req,res,next)=>{
//     // res.status(404).sendFile(path.join(rootDir,'views','404.html'))
//     res.status(404).render('404',{pageTitle:'Page Not Found'})
// };
// console.log('hello abhi nh');