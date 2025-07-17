const Home = require("../models/homes");

exports.getAddHome=(req,res,next)=>{
    res.render('host/addHome',{pageTitle: 'Add Home',editing: false,isLoggedIn: req.isLoggedIn});
};
exports.getHostList = (req,res,next)=>{
    Home.fetchAll().then(registeredHome=>{
        res.render('host/homeList',{registeredHome, pageTitle:'Host Home List', isLoggedIn: req.isLoggedIn}); 
    });
};
exports.postAddHome = (req,res,next)=>{
    const home=new Home(req.body.houseName, req.body.price, req.body.location, req.body.rating, req.body.photoUrl);
    home.save().then(()=>{
        console.log('home saved');
    });
    res.redirect('/host/home-list');
};

// exports.editHome = (req,res,next)=>{
//     const homeId = req.params.homeId;
//     const editing = req.query.editing;
//     Home.findById(homeId,home =>{
//         if(!home){
//             console.log('home not found');
//             return res.redirect("/host/home-list");
//         }
//         res.render('host/addHome',{pageTitle: 'Edit Home',editing,home});
//     })
// };
exports.editHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then((home) => {
    if (!home) { 
      console.log("Home not found for editing.");
      return res.redirect("/host/home-list");
    }

    console.log(homeId, editing, home);
     res.render('host/addHome',{pageTitle: 'Edit Home', editing, home, isLoggedIn: req.isLoggedIn});
  });
};
// exports.postEditHome = (req,res,next)=>{
//     const {id,houseName, price, location, rating, photoUrl}=req.body;
//     const home= new Home(houseName, price, location, rating, photoUrl,id);
//     home.save().then(()=>{
//         console.log("updation complete");
//     })
//     .catch(error=>{
//         console.log('there is an error on updation',error);
//     });
//     res.redirect('/host/home-list');
// };


exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl} = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, id);
  home.save()
  .then(result => {
    console.log('Home updated ', result);
    res.redirect("/host/home-list");
  })
  .catch(err => {
            console.error("❌ Error updating home:", err);
            res.redirect("/host/home-list");
        });
};


exports.postDelete = (req,res,next)=>{
    const homeId = req.params.homeId;
    Home.deleteById(homeId).then(() =>{
        // console.log("d")
        res.redirect('/host/home-list');
    });
};





// const Home = require("../models/homes");

// exports.getAddHome = (req, res, next) => {
//   res.render("host/edit-home", {
//     pageTitle: "Add Home to airbnb",
//     currentPage: "addHome",
//     editing: false,
//   });
// };

// exports.editHome = (req, res, next) => {
//   const homeId = req.params.homeId;
//   const editing = req.query.editing === 'true';

//   Home.findById(homeId).then(([homes]) => {
//     const home = homes[0];
//     if (!home) {
//       console.log("Home not found for editing.");
//       return res.redirect("/host/host-home-list");
//     }

//     console.log(homeId, editing, home);
//     res.render("host/edit-home", {
//       home: home,
//       pageTitle: "Edit your Home",
//       currentPage: "host-homes",
//       editing: editing,
//     });
//   });
// };

// exports.getHostList = (req, res, next) => {
// //   Home.fetchAll().then(([registeredHomes]) => {
// //     res.render("host/host-home-list", {
// //       registeredHomes: registeredHomes,
// //       pageTitle: "Host Homes List",
// //       currentPage: "host-homes",
// //     })
// //   });
// Home.fetchAll.then(registeredHome=>{
//         res.render('host/homeList',{registeredHome, pageTitle:'Host Home List'}); 
//     });
// };

// exports.postAddHome = (req, res, next) => {
//   const { houseName, price, location, rating, photoUrl, description } = req.body;
//   const home = new Home(houseName, price, location, rating, photoUrl, description);
//   home.save();

//   res.redirect("/host/host-home-list");
// };

// exports.postEditHome = (req, res, next) => {
//   const { id, houseName, price, location, rating, photoUrl, description } = req.body;
//   const home = new Home(houseName, price, location, rating, photoUrl, description, id);
//   home.save();
//   res.redirect("/host/host-home-list");
// };

// exports.postDelete = (req, res, next) => {
//   const homeId = req.params.homeId;
//   console.log('Came to delete ', homeId);
//   Home.deleteById(homeId).then(() => {
//     res.redirect("/host/host-home-list");
//   }).catch(error => {
//     console.log('Error while deleting ', error);
//   })
// };