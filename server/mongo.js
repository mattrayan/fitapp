var mongodb = require('mongodb'),
    Server = mongodb.Server,
    Db = mongodb.Db;

// Configure database connection
var server = new Server('localhost', 27017, {
    auto_reconnect: true
});

var db = new Db('fitdb', server, {w:1});

// Connect to the db
db.open(function(err, p_db) {
  db = p_db;
});

var onErr = function(err, cb) {
    //db.close();
    cb(err);
};


module.exports = {

    queryDb: function(collectionName, query, cb) {
        db.collection(collectionName, function(err, collection) {
            if (!err) {
                collection.find(query).toArray(function(err, docs) {
                    if (!err) {
                        if (docs.length !== 0) {
                            cb(docs);
                        } else {
                            cb("No record found");
                        }
                    } else {
                        onErr(err, cb);
                    }
                });
            } else {
                onErr(err, cb);
            }
        });
    },

    updateDb: function(collectionName, criteria, bson, cb) {
        db.collection(collectionName, function(err, collection) {
            if (!err) {
                collection.update(criteria, {$set: bson}, {w:1}, function(err) {
                    if (!err) {
                        cb("Success");
                    } else {
                        onErr(err, cb);
                    }
                });
            } else {
                onErr(err, cb);
            }
        });
    },

    insertIntoDb: function(collectionName, bson, cb) {
        db.collection(collectionName, function(err, collection) {
            if (!err) {
                collection.insert(bson, {w:1}, function(err, docs) {
                    if (!err) {
                        cb(docs);
                    } else {
                        onErr(err, cb);
                    }
                });
            } else {
                onErr(err, cb);
            }
        });
    },

    deleteDoc: function(collectionName, bson, cb) {
        db.collection(collectionName, function(err, collection) {
            if (!err) {
                collection.remove(bson, {w:1}, function(err, numDocs) {
                    if (!err) {
                        cb("Success");
                    } else {
                        onErr(err, cb);
                    }
                });
            } else {
                onErr(err, cb);
            }
        });
    },

    updateEmail: function(collectionName, eQuery, criteria, bson, cb) {
        db.collection(collectionName, function(err, collection) {
            if (!err) {
                collection.find(eQuery).toArray(function(err, docs) {
                    if (!err) {
                        if (docs.length !== 0) {
                            cb("Email conflict");
                        } else {
                            // If no conflicts, insert
                            collection.update(criteria, {$set: bson}, {w:1}, function(err) {
                                if (!err) {
                                    cb("Success");
                                } else {
                                    onErr(err, cb);
                                }
                            });
                        }
                    } else {
                        onErr(err, cb);
                    }
                });
            } else {
                onErr(err, cb);
            }
        });
    },

    updatePassword: function(collectionName, uQuery, old, criteria, bson, cb) {
        db.collection(collectionName, function(err, collection) {
            if (!err) {
                collection.find(uQuery).toArray(function(err, docs) {
                    if (!err) {
                        if (docs[0].password === old) {
                            collection.update(criteria, {$set: bson}, {w:1}, function(err) {
                                if (!err) {
                                    cb("Success");
                                } else {
                                    onErr(err, cb);
                                }
                            });
                        } else {
                            cb("Password conflict");
                        }
                    } else {
                        onErr(err, cb);
                    }
                });
            } else {
                onErr(err, cb);
            }
        });
    },

    registerUser: function(collectionName, bson, uQuery, eQuery, cb) {
        db.collection(collectionName, function(err, collection) {
            if (!err) {
                // Query for username
                collection.find(uQuery).toArray(function(err, docs1) {
                    if (!err) {
                        if (docs1.length !== 0) {
                            cb("Username conflict");
                        } else {
                            // Query for email
                            collection.find(eQuery).toArray(function(err, docs2) {
                                if (!err) {
                                    if (docs2.length !== 0) {
                                        cb("Email conflict");
                                    } else {
                                        // If no conflicts, insert
                                        collection.insert(bson, {w:1}, function(err, docs) {
                                            if (!err) {
                                                cb(docs);
                                            } else {
                                                onErr(err, cb);
                                            }
                                        });
                                    }
                                } else {
                                    onErr(err, cb);
                                }
                            });
                        }
                    } else {
                        onErr(err, cb);
                    }
                });
            } else {
                onErr(err, cb);
            }
        });
    }

};