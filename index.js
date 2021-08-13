const express   = require('express'),
      app       = express(),
      User      = require('./models/user'),
      mongoose  = require('mongoose')

mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/certichallenge", { useNewUrlParser: true, useUnifiedTopology: true });

//DETAILS:
/*
    Stack:
        Node.js, express, mongoDB w/mongoose
        to make a minimum viable product faster
        it's essential to prototype faster,
        and noSQL is the best solution for that.

        It's like Python, where if you want to hack
        something together fast it's a really good tool.

        MongoDB is also scalable, though.

    Auth:
        None. It was not required.

*/

//TODO: User model

/*
USER MODEL:

    username: String
    permissions: Object
    hidden: Boolean

    No need for classes, I can just make a
    mongoose model.

*/


//TODO: Route users.
/* Possible routes:
    -------------------------------------
    POST /user - New user
    pseudo:

    init procedure:
    router.post('/user', (request, response){
        db.createUser(username, permissions, hidden);
    })
    end procedure;
    -------------------------------------
    GET /user - Get user list
    pseudo:

    init procedure:
    router.get('/user', (request, response){
        db.findUsers();
    })
    end procedure;
    -----------------------------------------
    GET /user/id - Get user by id
    pseudo:

    init procedure:
    router.get('/user/:id', (request, response){
        db.findUserById();
    })
    end procedure;
    ------------------------------------------
    PUT /user/id - Edit user by id
    pseudo:

    init procedure:
    router.put('/user/:id', (request, response){
        db.editUserById();
    })
    end procedure;
    ------------------------------------------
    DELETE /user/id - Delete user by id
    pseudo:

    init procedure:
    router.delete('/user/:id', (request, response){
        db.hideUserById();
    })
    end procedure;
    ------------------------------------------
    PUT /user/id/claim - Attribute a list of permissions to user
    pseudo:

    init procedure:
    router.delete('/user/:id', (request, response){
        db.addToUser(permissions)
    })
    end procedure;
    -------------------------------------------

*/

//TODO: Route permission claims.
/* Possible routes:
    POST /claim - New permission
    GET /claim - Get permission list
    GET /claim/id - Get permission by id
    PUT /claim/id - Edit permission by id
    DELETE /claim/id - Delete permission by id

*/

let userReturned;

function listUsers(){
    User.find({}, (err, users) => {
        err ? console.log(err) : listed = users;
    })
}

function listPermissions(){

}

function verifyIfExisting(username){
    User.find({username: req.params.username}, (err, user) => {
        if(err){
            return false
        } else{
            return true
        }
    })
    return false;
}

function createUser(req, res){
    console.log(verifyIfExisting(req.params.username))
    if(verifyIfExisting(req.params.username) != true){
        User.create({
            age: req.params.age,
            username: req.params.username,
            permissions: [],
            hidden: false
        }, function(err, user){
        if(err){
            console.log(err);
        } else{
            console.log("User created successfully!")
            User.find({username: req.params.username}, (err, user) => {
                err ? console.log(err) : res.send(user);
            });
        };
        });
    } else{
        throw { 
            name:        "Username already exists", 
            level:       "Harmless", 
            message:     "This username is already registered onto the database. Please choose another.", 
            htmlMessage: "<h4>This username is already registered onto the database. Please choose another.</h4>",
            toString:    function(){return this.name + ": " + this.message;} 
        }; 
    }
}


app.post('/user/:username/:age', (req, res) => {
    try{
        User.find({username: req.params.username, hidden: false}, (err, user) => {
            if(!user[0]){
                User.create({
                    age: req.params.age,
                    username: req.params.username,
                    permissions: [],
                    hidden: false
                }, function(err, user){
                if(err){
                    console.log(err);
                } else{
                    console.log("User created successfully!")
                    User.find({username: req.params.username}, (err, user) => {
                        err ? console.log(err) : res.send(user);
                    });
                };
                });
            } else{
                res.send("Username already exists in database!")
            }
        })
    } catch(err){
        console.log(e)
    }
});

app.get('/user', (req, res) => {
    User.find({hidden: false}, (err, users) => {
        err ? console.log(err) : res.send(users);
    })
})

app.get('/user/:id', (req, res) => {
    User.find({_id: req.params.id, hidden: false}, (err, user) => {
        err ? console.log(err) : res.send(user)
    })
})

app.put('/user/:id/:parameter/:value', (req, res) => {
    let param = req.params.parameter
    let value = req.params.value
    User.findOneAndUpdate({_id: req.params.id}, {parameter: value}, (err, user) => {
        err ? console.log(err) : res.send('User edited successfully.<br><br>' + user)
    })
})

app.delete('/user/:id', (req ,res) => {
    User.findOneAndUpdate({_id: req.params.id}, {hidden: true}, (err, user) => {
        err ? console.log(err) : res.send('User deleted successfully.<br><br>' + user)
    })
})

app.listen(3000, () => {
    console.log('app listening on port 3000');
})