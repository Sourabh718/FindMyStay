const Favourite = require("../models/favourite");
const Home = require("../models/homes");

exports.getIndex = (req,res,next)=>{
    Home.fetchAll().then(registeredHome=>{
        console.log('session value', req.session)
        res.render('store/index',{registeredHome, pageTitle:'airbnb Home', isLoggedIn: req.isLoggedIn});
    });
};
exports.getHomes = (req,res,next)=>{
    Home.fetchAll().then(registeredHome=>{
        res.render('store/homePage',{registeredHome, pageTitle:'Home List', isLoggedIn: req.isLoggedIn});
    });
};
exports.getbooking = (req,res,next)=>{
    res.render('store/booking',{pageTitle:'My Booking', isLoggedIn: req.isLoggedIn});
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
       res.render('store/homeDetails',{home,pageTitle:'Home Detail', isLoggedIn: req.isLoggedIn,});
    }
  });
};

// favourites

// exports.getFavourites = (req,res,next)=>{
//     Favourite.getFavourite().then(favouriteItem =>{
//         Home.fetchAll().then(registeredHome=>{
//             favouriteItem=favouriteItem.map(fav=>fav.houseId)
//             console.log(favouriteItem,'fa',registeredHome)
//             // const favouriteHomes= favouriteItem.map(homeId => registeredHome.find(home => home.homeId==homeId));
//             const favouriteHomes =registeredHome.filter(home => favouriteItem.includes(home._id.toString()));
//             res.render('store/watchlist',{favouriteHomes, pageTitle:'Wtatchlist'}); 
//         });
//     });
// };

exports.postAddToFavourites = (req,res,next)=>{
    const favouriteId = req.body.favouriteId;
    const fav = new Favourite(favouriteId);
    fav.save().then((result)=>{
        console.log('favourite item added',result)
    })
    .catch(err=>{
        console.log('favourite is not added',err)
    })
    .finally(()=>{
        res.redirect("/watchlist");
    })
}

exports.getFavourites = (req, res, next) => {
  Favourite.getFavourite().then(favourites => {
    favourites = favourites.map(fav => fav.id);  //this id is use from favourite constructor
    Home.fetchAll().then(registeredHomes => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
      );
      res.render("store/watchlist", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
        isLoggedIn: req.isLoggedIn,
      });
    });
  });
};

exports.postRemoveFromFavourites = (req,res,next)=>{
    const favouriteId = req.params.favouriteId;
    const a=req.params.id;
    const b=req.params.homeId;
    console.log('a',a,'b',b);
    Favourite.removeFavourites(b).then((result)=>{
        console.log('favourite item removed',result)
    })
    .catch(err=>{
        console.log('error in removing item',err)
    })
    .finally(()=>{
        res.redirect("/watchlist");
    })
};

exports.goTo404 = (req,res,next)=>{
    res.status(404).render('404',{pageTitle:'Page Not Found',isLoggedIn: req.isLoggedIn});
};
