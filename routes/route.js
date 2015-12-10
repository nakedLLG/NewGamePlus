module.exports = function(app, passport) {
    //app.get('/', function(req, res) {
    //    res.render('index.ejs');
    //});

    //app.get('/login', function(req, res) {
    //    res.render('#/management', {message: req.flash('loginMessage') });
    //});

    app.post('/login', function(req, res, next) {
        var auth = passport.authenticate('local-login', function(err, user) {
            if (err) { return next(err);}
            if (!user) { res.send({success: false})}
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                res.send({success: true, user: user });
            })
        });
        auth(req, res, next);
    });

   // app.post('/login', passport.authenticate('local-login', {
   //     successRedirect : '/partials/management', // redirect to the secure profile section
   //     failureRedirect : '/partials/account', // redirect back to the signup page if there is an error
   //     failureFlash : true // allow flash messages
   // }));

    //app.get('/signup', function(req, res) {
    //    res.render('#/management', { message: req.flash('signupMessage') });
    //});

    app.post('/signup', function(req, res, next) {
        var auth = passport.authenticate('local-signup', function(err, user) {
            if (err) { return next(err);}
            if (!user) { res.send({success: false})}
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                res.send({success: true, user: user });
            })
        });
        auth(req, res, next);
    });

    app.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });
};
