// core module
const path = require('path');
const express=require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
const session = require('express-session')
// external module 
const userRouter=require('./routes/userRouter');
const {hostRouter}=require('./routes/hostRouter');
const rootDir = path.dirname(require.main.filename);
const userController = require('./controllers/userController');
const {mongoConnect, mongoUrl} = require('./utils/database');
const { authRouter } = require('./routes/authRouter');
const MongoDBStore  = require('connect-mongodb-session')(session);
// app.use(express.static('public'));

app.use(express.static(path.join(rootDir,'public')))
app.use(express.urlencoded());
const store = new MongoDBStore({
    uri: mongoUrl,
    collection: 'sessions'
});
app.use(session({
    secret:'this is my session',
    resave:false,
    saveUninitialized:true,
    store,
}));
app.use((req,res,next)=>{
    next();             
});
app.use(authRouter)
app.use("/host",(req,res,next)=>{
    if(!req.isLoggedIn){
        return res.redirect('/login');
    }
    next();
});
app.use((req,res,next)=>{
    // console.log(req.get('Cookie'));
    // req.isLoggedIn = req.get('Cookie') ? req.get('Cookie').split('=')[1] === 'true':false;
    req.isLoggedIn = req.session.isLoggedIn;
    next();
})
app.use(userRouter);
app.use("/host",hostRouter);
app.use(userController.goTo404);

// mongo db
const PORT=3000;
mongoConnect(client=>{
    console.log(client);
    app.listen(PORT,()=>{
        console.log(`server: http://localhost:${PORT}`); 
    });
});
