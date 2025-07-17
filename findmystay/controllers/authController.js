exports.getLogin = (req,res,next)=>{
    // req.isLoggedIn = false;
    res.render('auth/login',{pageTitle: 'login',editing: false,isLoggedIn: false});
};
exports.postLogin = (req,res,next)=>{
    // res.cookie("isLoggedIn", true);
    req.session.isLoggedIn=true;
    res.redirect('/')
};
exports.postLogout =(req,res,next)=>{
    // res.cookie("isLoggedIn", false);
    req.session.destroy(()=>{        
        res.redirect('/login');
    });
};

exports.getSignup =(req,res,next)=>{
    res.render('auth/signup', {pageTitle:'SignUp',isLoggedIn:false});
}
exports.postSignup =(req,res,next)=>{
    // req.session.isLoggedIn=true;
    check('username')
    .trim()
    .isLength({min:2})
    .withMessage('username should be atleast 2 character')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('name should contaion only alphabet'),

    check('email')
    .isEmail()
    .withMessage('wntwe a valid email')
    .normalizeEmail(),

    check('password')
    .isLength({min:8})
    .withMessage('password should be atleast 8 character'),

    check('confirmPassword')
    .trim()
    .custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error('password do not match')
        }
        return true
    }),

    check('terms')
    .notEmpty()
    .withMessage('you should accept the terms and condition')
    .custom((value, {req})=>{
        if(value !== "on"){
            throw new Error('you should accept the terms and condition')
        }
        return true
    }),

    (req,res,next)=>{
        const {username, email, password} =req.body;
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(422).render('auth/signup',{
                pageTitle:'sigup',
                isLoggedIn:false,
                errors:errors.array().map(err=>err.msg),
                oldInput:{username, email, password}
            });j
        }
    }

    res.redirect('/home-list')
}