const express   = require('express'),
      app       = express(),
      User      = require('./models/user'),
      Permission = require('./models/permission'),
      mongoose  = require('mongoose')

mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/certichallenge", { useNewUrlParser: true, useUnifiedTopology: true });

//DETAILS:
/*
    Stack:
        Node.js, express, mongoDB w/mongoose
        to make a minimum viable product faster
        it is essential to prototype fast,
        and noSQL is the best solution for that.

        I started with postgres with sequelize
        but changed to MongoDB w/mongoose about halfway through.

        It's like Python, where if you want to hack
        something together fast it's a really good tool.

        MongoDB is also scalable, though.

    Auth:
        None. It was not required.

    Standard:
        REST Api implemented exactly as requested, with some modifications to fit the database decision.

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

    switch (param) {
        case 'username':
            User.findOneAndUpdate({_id: req.params.id}, {username: value}, (err, user) => {
                err ? console.log(err) : res.send('User edited successfully.' + user)
            })
        break;

        case 'age':
            User.findOneAndUpdate({_id: req.params.id}, {age: value}, (err, user) => {
                err ? console.log(err) : res.send('User edited successfully.' + user)
            })
        break;

        default:
        break;
    }
})

app.post('/user/:id/claim/:pname', (req, res) => {
    Permission.find({name: req.params.pname}, (err, permission) => {
        let list = []
        User.find({_id: req.params.id}, (err, user) => {
            list.push(permission)
            let previous = user[0]['permissions'].toObject()
            if(previous[0] !== undefined){
                previous.forEach(element => {
                    list.push(element)
                });
            }
        let stringified = list.map(JSON.stringify)
        let stringArray = Array.from(new Set(stringified))
        let unique = Array.from(stringArray, JSON.parse)
        User.findOneAndUpdate({_id: req.params.id}, {permissions: unique}, (err, user) => {
            err ? console.log(err) : res.send("User edited. Added new permissions.")
        })
     })
    })
})

app.delete('/user/:id', (req ,res) => {
    User.findOneAndUpdate({_id: req.params.id}, {hidden: true}, (err, user) => {
        err ? console.log(err) : res.send('User deleted successfully.')
    })
})

//Permission routes

app.get('/claim', (req, res) => {
    Permission.find({hidden: false}, (err, permissions) => {
        err ? console.log(err) : res.send(permissions);
    })
})

app.post('/claim/:name/:description', (req, res) => {
    try{
        Permission.find({name: req.params.name, hidden: false}, (err, permission) => {
            if(!permission[0]){
                Permission.create({
                    name: req.params.name,
                    description: req.params.description,
                    hidden: false
                }, function(err, permission){
                if(err){
                    console.log(err);
                } else{
                    console.log("Permission created successfully!")
                    Permission.find({name: req.params.name}, (err, permission) => {
                        err ? console.log(err) : res.send(permission);
                    });
                };
                });
            } else{
                res.send("Permission name already exists in database!")
            }
        })
    } catch(err){
        console.log(err)
    }
})

app.delete('/claim/:id', (req, res) => {
    Permission.findOneAndUpdate({_id: req.params.id}, {hidden: true}, (err, permission) => {
        err ? console.log(err) : res.send('Permission deleted successfully.')
    })
})

app.put('/claim/:id/:parameter/:value', (req, res) => {
    let param = req.params.parameter
    let value = req.params.value

    switch (param) {
        case 'name':
            User.findOneAndUpdate({_id: req.params.id}, {name: value}, (err, permission) => {
                err ? console.log(err) : res.send('Permission edited successfully.' + permission)
            })
        break;

        case 'description':
            User.findOneAndUpdate({_id: req.params.id}, {description: value}, (err, permission) => {
                err ? console.log(err) : res.send('Permission edited successfully.' + permission)
            })
        break;

        default:
        break;
    }
})

app.listen(3000, () => {
    console.log('app listening on port 3000');
})