const express = require('express'),
      app = express();

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


app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(3000, () =>{
    console.log('app listening on port 3000')
})