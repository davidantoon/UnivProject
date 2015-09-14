(function(angular) {
    // 'use strict';
    angular.module('IntelLearner').factory('User', ['$rootScope', '$http', 'Server', '$httpR', 'Globals', 'Log', 'Storage',
        function($rootScope, $http, Server, $httpR, Globals, Log, Storage) {

            function User(tempJson, id, firstName, lastName, username, email, profilePicture, role, token) {
                if (tempJson) {
                    if(tempJson.UID){
                        this.id = tempJson.UID;
                        this.firstName = tempJson.FIRST_NAME;
                        this.lastName = tempJson.LAST_NAME
                        this.username = tempJson.USERNAME;
                        this.email = tempJson.EMAIL;
                        this.creationDate = new Date(tempJson.CREATION_DATE);
                        this.profilePicture = tempJson.PROFILE_PICTURE;
                        this.role = tempJson.ROLE;
                        this.token = tempJson.token;
                    }else{
                        this.id = tempJson.id;
                        this.firstName = tempJson.firstName;
                        this.lastName = tempJson.lastName;
                        this.username = tempJson.username;
                        this.email = tempJson.email;
                        this.creationDate = new Date(tempJson.creationDate);
                        this.profilePicture = tempJson.profilePicture;
                        this.role = tempJson.role;
                        this.token = tempJson.token;
                    }

                } else {
                    this.id = id;
                    this.firstName = firstName;
                    this.lastName = lastName
                    this.username = username;
                    this.email = email;
                    this.creationDate = new Date();
                    this.profilePicture = profilePicture;
                    this.role = role;
                    this.token = token;
                }
            }


            /**
             * Connets with server, check the entered username and password for login
             * @param {String} username username
             * @param {String} Password password
             * @return {User} return null if wrong info, else User Object
             */
            User.login = function(username, password, callback) {
                try {
                    if (username == "dummy" && password == "dummy") {
                        // dummy login
                        Log.i("User", "login", "Logged as dummy user");
                        var dummyUSer = new User(null, "David", "Antoon", username, "david.antoon@hotmail.com", "https://graph.facebook.com/100003370268591/picture", "Learner");
                        callback(dummyUSer);
                    } else {
                        var data = {
                            "username": username,
                            "password": password
                        };
                        $httpR.connectToServer(data, $httpR.logIn, Globals, function(result, error) {
                            if (result) {
                                Log.d("User","login","User login success", {LogObject:result});
                                var newUser = new User(result);
                                callback(newUser);
                            } else {
                                Log.e("User","login","User cannot login", {LogObject:error});
                                callback(null, error);
                            }
                        });
                    }
                } catch (e) {
                    Log.e("User","login","User cannot login", {LogObject:e});
                    callback(null, e);
                }
            }

            /**
             * registers for the server
             * @param  {String}   firstName      first name
             * @param  {String}   lastName       last name
             * @param  {String}   username       username
             * @param  {Strinf}   password       password
             * @param  {String}   email          E-mail
             * @param  {String}   profilePicture profile picture link
             * @param  {String}   role           what is the role of the user
             * @param  {Function} callback       callback function
             */
            User.signUp = function(firstName, lastName, username, password, email, profilePicture, role, callback) {
                try {
                    var data = {
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                        email: email,
                        password: password,
                        profilePicture: profilePicture,
                        role: role
                    };
                    $httpR.connectToServer(data, $httpR.signUp, Globals, function(result, error) {
                        if ((result) && error != null) {
                            Log.d("User","signUp","User signUp success", {LogObject:result});
                            var newUser = new User(result);
                            callback(newUser);
                        } else {
                            Log.e("User","signUp","User cannot signUp", {LogObject:error});
                            callback(null, error);
                        }
                    });
                } catch (e) {
                    Log.e("User","signUp","User cannot signUp", {LogObject:e});
                    callback(null, e);
                }
            }

            


            User.prototype = {

                /**
                 * logout
                 * @param  {Function} callback callback function
                 */
                logout: function(callback){
                    try{
                        var data = {
                            Token: this.token
                        };
                        $httpR.connectToServer(data, $httpR.USERlogout, Globals, function(result, error){
                            if(error || !success){
                                Log.e("User","logout","User cannot logout", {LogObject:error});
                                callback(null, error);
                            }else{
                                Log.d("User","logout","User logout success", {LogObject:success});
                                callback(success);
                            }
                        });
                    }catch(e){
                        Log.e("User","logout","User cannot logout", {LogObject:e});
                        callback(null, e);
                    }
                },

                /**
                 * Changes the password for the use
                 * @param  {String} newPassword new password
                 */
                changePassword: function(oldpassword, newPassword, callback) {
                    try {
                        var data = {
                            Token: this.token,
                            password: oldpassword,
                            new_password: newPassword
                        }
                        var passThis = this;
                        $httpR.connectToServer(data, $httpR.changePassword, Globals, function(success, error) {
                            if (error || !success) {
                                Log.e("User","changePassword","Could not update user password", {LogObject:error});
                                callback(false);
                            } else {
                                Log.d("User","changePassword","User password updated", {LogObject:success});
                                passThis.token = success.token;
                                var stor = new Storage();
                                stor.setWorkspaceData(null, null, Globals.CurrentUser, function(){
                                    callback(true);
                                });
                            }
                        });
                    }catch(e){
                        Log.e("User","changePassword","Could not update user password", {LogObject:error});
                        callback(false);
                    }
                },

                /**
                 * Updates the user information
                 * @param  {string}   firstName      first name
                 * @param  {string}   lastName       last name
                 * @param  {string}   email          email
                 * @param  {string}   profilePicture picture link
                 * @param  {string}   role           role of the user
                 * @param  {Function} callback       callback function
                 */
                updateUser: function(firstName, lastName, email, callback) {
                    try {
                        var data = {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            profilePicture: this.profilePicture,
                            role: " "
                        };
                        var passThis = this;
                        $httpR.connectToServer(data, $httpR.updateUser, Globals, function(success, error) {
                            if (error || !success){
                                Log.e("User","updateUser","Could not update profile", {LogObject:error});
                                callback(false);
                            }else{
                                Log.d("User","updateUser","User profile updated", {LogObject:success});
                                passThis.firstName = success["FIRST_NAME"];
                                passThis.lastName = success["LAST_NAME"];
                                passThis.email = success["EMAIL"];
                                passThis.profilePicture = success["PROFILE_PICTURE"];
                                var stor = new Storage();
                                stor.setWorkspaceData(null, null, Globals.CurrentUser, function(){
                                    callback(true);
                                });
                            }
                        });
                    } catch (e) {
                        Log.e("User","updateUser","Could not update profile", {LogObject:e});
                        callback(null, e);
                    }
                },

                updateProfilePicture: function(profilePicture, ext, callback){
                    try{
                        var Data = {
                          data: profilePicture,
                          extension : ext
                        };
                        var passThis = this;
                        $httpR.connectToServer(Data, $httpR.USERsaveProfilePicture, Globals, function(success, error){
                            if(error || !success){
                                Log.e("User","updateProfilePicture","Could not update picture", {LogObject:error});
                                callback(null, error);
                            }else{
                                Log.d("User","updateProfilePicture","User picture updated", {LogObject:success});
                                passThis.profilePicture = success["PROFILE_PICTURE"];
                                callback(true);
                            }
                        });
                    }catch(e){
                        Log.e("User","updateProfilePicture","Could not update picture", {LogObject:error});
                        callback(null, e);
                    }
                },

                checkValidToken: function(callback){
                    var data = {};
                    var passThis = this;
                    $httpR.connectToServer(data, $httpR.USERvalidateToken, Globals, function(success, error){
                        if(error || !success){
                            callback(false);
                        }else{
                            Log.d("User","checkValidToken","Valid token", {LogObject:success});
                            passThis.id = success.UID;
                            passThis.username = success.USERNAME;
                            passThis.firstName = success.FIRST_NAME;
                            passThis.lastName = success.LAST_NAME
                            passThis.email = success.EMAIL;
                            passThis.profilePicture = success.PROFILE_PICTURE;
                            passThis.role = success.ROLE;
                            callback(true);
                        }
                    });
                },

                toJSON: function() {
                    try {
                        return {
                            "id": this.id,
                            "firstName": this.firstName,
                            "lastName": this.lastName,
                            "username": this.username,
                            "email": this.email,
                            "creationDate": this.creationDate,
                            "profilePicture": this.profilePicture,
                            "role": this.role,
                            "token": this.token
                        }
                    } catch (e) {
                        Log.d("User","toJson", {LogObject:e});
                        return null;
                    }
                }
            }
            return User;
        }
    ]);
})(window.angular);






















