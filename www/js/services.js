angular.module('app.services', [])

.factory('DatabaseService', function($q) {
    // cordova & sqlitePlugin
    // var db = window.sqlitePlugin.openDatabase({name: "timedContact.db"});

    // web browser
    var db = window.openDatabase("timedContact.db", "1.0", "TimedContactDB", -1);

    return {
        load: function() {
            return this;
        },

        query: function(sql) {

            var deferred = $q.defer(),
                querySuccessCB,
                errorCB,
                checkDB;

            querySuccessCB = function(tx, results) {
                deferred.resolve(results);
            },

            errorCB = function(err) {
                deferred.reject(err);
            },

            checkDB = function(tx) {
                tx.executeSql(sql, [], querySuccessCB, errorCB);
            };

            db.transaction(checkDB, errorCB);

            return deferred.promise;
        },

        /**
         * Checks if databaese is initalized, and if not it will fail.
         *
         * Use this by passing the funtion to initialize the database in the error callback
         *
         * @param function successCB The function to be called if the database exists.
         * @param function errorCB The function to be called if the database is not yet initialized.
         *
         * @return deferred.promise
         */
        isInitialized: function(successCB, errorCB) {
            var deferred = $q.defer();

            this.query('SELECT version FROM schema').then(function(results) {
                var version = 0;
                for (var i = 0; i < results.rows.length; i++) {
                    version = results.rows.item(i).version;
                }
                deferred.resolve(version);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        },

        initializeSchema: function(tx) {

            tx.executeSql('DROP TABLE IF EXISTS schema');
            tx.executeSql('DROP TABLE IF EXISTS alert');
            tx.executeSql('DROP TABLE IF EXISTS contact');

            tx.executeSql('CREATE TABLE IF NOT EXISTS schema (version INTEGER)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, company_project TEXT, email TEXT, phone TEXT, website TEXT, contact_group TEXT, notes TEXT)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS alert (id INTEGER PRIMARY KEY AUTOINCREMENT, data)');

            tx.executeSql('INSERT INTO schema (version) VALUES ("1")');
        },

        initializeData: function(tx) {
            // demo data
            var data = [
                [
                    "Boba", "Fett", "Empire Freelance", "bobafett@jpalace.com",
                    "(555) 555-5555", "http://www.bobafett.com", "Bounty Hunters",
                    "Lorem ipsum mandalorim..."
                ],
                [
                    "Jango", "Fett", "Republic Freelance", "jangofett@kamino.com",
                    "(555) 555-5555", "http://www.jangofett.com", "Bounty Hunters",
                    "Lorem ipsum mandalorim..."
                ]
            ];

            console.log('Inserting demo data', data);

            for (var i = 0; i < data.length; i++) {
                tx.executeSql(
                    'INSERT INTO contact (first_name, last_name, company_project, email, phone, website, contact_group, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    data[i]
                );
            }
        },

        doInitialize: function() {
            var deferred = $q.defer(),
                self = this;

            populateDB = function(tx) {
                console.log("Initializing database schema");
                self.initializeSchema(tx);
                self.initializeData(tx);
            };

            // initialize the transaction, calling the error or success function
            db.transaction(populateDB, function(err) {
                deferred.reject(err);
            }, function() {
                // database initialized OK - get the schema version and return that
                self.isInitialized().then(function(version) {
                    deferred.resolve(version);
                }, function(error) {
                    deferred.resolve('Failed database check after initialize.');
                });
            });

            return deferred.promise;
        }
    }
})

.factory('Contacts', function($q, DatabaseService) {

    var db = DatabaseService.load();

    return {
        all: function() {
            var deferred = $q.defer(),
                contacts = new Array();

            db.query("SELECT * FROM contact").then(function(results){

                for (var i = 0; i < results.rows.length; i++) {
                    contacts.push(results.rows.item(i));
                }

                deferred.resolve(contacts);
            }, function(error) {
                console.log("Contacts.all() query error", error);
            });

            return deferred.promise;
        },

        get: function(contactId) {
            return ;
        }
    }
})

.factory('Alerts', function() {

});
