const { MongoClient } = require("mongodb");
const mongo = require("mongodb")
// const MongoBench = require('mongo-bench');
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Test variable class, use the benchmark to create mongodb values out of the
// log collections
// MongoBench.mongo(mongo, {
//   'logsCollection': 'mongologs',
//   calculateQueryFingeprint: false
// });
var _db;

// Connect to the server via module exports to automatically connect when a value
// is created, more so used to create the functions we will use later.
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("Classes");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
         });
  },

  getDb: function () {
    return _db;
  },
};
