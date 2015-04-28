var cors = require('cors');
var express = require('express');
var mongo = require('./mongo.js');

var app = express();

// Configure server
var corsOptions = {
    origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));

app.configure( function() {
    app.use(express.bodyParser());    // Populate request.body
    app.use(express.methodOverride());    // Check request.body for method overrides
    app.use(app.router);  // Use router based on URL and HTTP
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));  // Show all errors
});


// Rest API and Routes
app.get('/api/login/:username/:password', function(request, response) {
    console.log(request.params);

    var query = {
        "username": request.params.username,
        "password": request.params.password
    }

    mongo.queryDb('users', query, function(result) {
        response.send(result);
    });
});

app.get('/api/info/:target/:username', function(request, response) {
    console.log(request.params);

    var query = {
        "username": request.params.username
    }

    mongo.queryDb(request.params.target, query, function(result) {
        response.send(result);
    });
});

app.post('/api/register/:username/:email/:password', function(request, response) {
    console.log(request.params);

    var data = {
        username: request.params.username,
        email: request.params.email,
        password: request.params.password,
        verified: false
    };

    var usernameQuery = {
        'username': request.params.username
    };

    var emailQuery = {
        'email': request.params.email
    };

    mongo.registerUser('users', data, usernameQuery, emailQuery, function(result) {
        response.send(result);
    });
});

app.put('/api/emailupdate/:username/:email', function(request, response) {
    console.log(request.params);

    var criteria = {
        username: request.params.username
    };

    var emailQuery = {
        'email': request.params.email
    };

    var data = {
        email: request.params.email,
        verified: false
    };

    mongo.updateEmail('users', emailQuery, criteria, data, function(result) {
        response.send(result);
    });
});

app.put('/api/passwordupdate/:username/:oldpassword/:newpassword', function(request, response) {
    console.log(request.params);

    var criteria = {
        username: request.params.username
    };

    var usernameQuery = {
        'username': request.params.username
    };

    var data = {
        password: request.params.newpassword
    };

    mongo.updatePassword('users', usernameQuery, request.params.oldpassword, criteria, data, function(result) {
        response.send(result);
    });
});

app.delete('/api/deleteaccount/:username', function(request, response) {
    console.log(request.params);

    var data = {
        username: request.params.username
    };

    mongo.deleteDoc('users', data, function(result) {
        response.send(result);
    });
});


//Start server
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('REST server listening on port %d', port);
});
