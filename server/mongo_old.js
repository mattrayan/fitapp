var mongodb = require('mongodb'),
    Server = mongodb.Server,
    Db = mongodb.Db;

// Configure database connection
var server = new Server('localhost', 27017, {
    auto_reconnect: true
});

var db = new Db('fitdb', server, {w:1});


var onErr = function(err, cb) {
    db.close();
    cb(err);
};


module.exports = {

    queryDb: function(collectionName, query, cb) {
        db.open(function(err, db) {
            if (!err) {
                db.collection(collectionName, function(err, collection) {
                    if (!err) {
                        collection.find(query).toArray(function(err, docs) {
                            if (!err) {
                                db.close();
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
            } else {
                onErr(err, cb);
            }
        });
    },

    updateDb: function(collectionName, criteria, bson, cb) {
        db.open(function(err, db) {
            if (!err) {
                db.collection(collectionName, function(err, collection) {
                    if (!err) {
                        collection.update(criteria, {$set: bson}, {w:1}, function(err) {
                            if (!err) {
                                db.close();
                                cb("Success");
                            } else {
                                onErr(err, cb);
                            }
                        });
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
        db.open(function(err, db) {
            if (!err) {
                db.collection(collectionName, function(err, collection) {
                    if (!err) {
                        collection.insert(bson, {w:1}, function(err, docs) {
                            if (!err) {
                                db.close();
                                cb(docs);
                            } else {
                                onErr(err, cb);
                            }
                        });
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
        db.open(function(err, db) {
            if (!err) {
                db.collection(collectionName, function(err, collection) {
                    if (!err) {
                        collection.remove(bson, {w:1}, function(err, numDocs) {
                            if (!err) {
                                db.close();
                                cb("Success");
                            } else {
                                onErr(err, cb);
                            }
                        });
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
        db.open(function(err, db) {
            if (!err) {
                db.collection(collectionName, function(err, collection) {
                    if (!err) {
                        collection.find(uQuery).toArray(function(err, docs) {
                            if (!err) {
                                if (docs[0].password === old) {
                                    collection.update(criteria, {$set: bson}, {w:1}, function(err) {
                                        if (!err) {
                                            db.close();
                                            cb("Success");
                                        } else {
                                            onErr(err, cb);
                                        }
                                    });
                                } else {
                                    db.close();
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
            } else {
                onErr(err, cb);
            }
        });
    },

    registerUser: function(collectionName, bson, uQuery, eQuery, cb) {
        db.open(function(err, db) {
            if (!err) {
                db.collection(collectionName, function(err, collection) {
                    if (!err) {
                        // Query for username
                        collection.find(uQuery).toArray(function(err, docs1) {
                            if (!err) {
                                if (docs1.length !== 0) {
                                    db.close();
                                    cb("Username conflict");
                                } else {
                                    // Query for email
                                    collection.find(eQuery).toArray(function(err, docs2) {
                                        if (!err) {
                                            if (docs2.length !== 0) {
                                                db.close();
                                                cb("Email conflict");
                                            } else {
                                                // If no conflicts, insert
                                                collection.insert(bson, {w:1}, function(err, docs) {
                                                    if (!err) {
                                                        db.close();
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
            } else {
                onErr(err, cb);
            }
        });
    }

};