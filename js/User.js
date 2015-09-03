(function(angular) {
    // 'use strict';
    angular.module('IntelLearner').factory('User', ['$rootScope', '$http', 'Server', '$httpR', 'Globals',
        function($rootScope, $http, Server, $httpR, Globals) {

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
                        console.warn("Logged as dummy user");
                        var dummyUSer = new User(null, "David", "Antoon", username, "david.antoon@hotmail.com", "https://graph.facebook.com/100003370268591/picture", "Learner");
                        callback(dummyUSer);
                    } else {
                        var data = {
                            "username": username,
                            "password": password
                        };
                        $httpR.connectToServer(data, $httpR.logIn, Globals, function(result, error) {
                            if (result) {
                                // console.log("connectToServer response: ", result);
                                var newUser = new User(result);
                                callback(newUser);
                            } else {
                                console.error("error logging in: ", error);
                                callback(null, error);
                            }
                        });
                    }
                } catch (e) {
                    console.error("User.login: ", e);
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
            User.singup = function(firstName, lastName, username, password, email, profilePicture, role, callback) {
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
                            var newUser = new User(result);
                            callback(newUser);
                        } else {
                            console.error("error signing up: ", error);
                            callback(null, error);
                        }
                    });
                } catch (e) {
                    console.error("singup: ", e);
                    callback(null, e);
                }
            }

            /**
             * logout
             * @param  {Function} callback callback function
             */
            User.logout = function(callback){
                try{
                    $httpR.connectToServer({},$httpR.USERlogout, Globals, function(result, error){
                        if(error || !success){
                            console.error('Could not log out');
                            callback(null, error);
                        }else{
                            callback(success);
                        }
                    });
                }catch(e){
                    console.error("logout: ", e);
                    callback(null, e);
                }
            }


            User.prototype = {

                
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
                        $httpR.connectToServer(data, $httpR.changePassword, Globals, function(success, error) {
                            if (error || !success) {
                                console.error("could not change password: ", error);
                                callback(null, error);
                            } else {
                                callback(success);
                            }
                        });
                    } catch (e) {
                        console.error("changePassword: ", e);
                        callback(null, e);
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
                updateUser: function(firstName, lastName, email, profilePicture, callback) {
                    try {
                        var data = {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            profilePicture: profilePicture,
                            role: this.role
                        };
                        var passThis = this;
                        $httpR.connectToServer(data, $httpR.updateUser, Globals, function(success, error) {
                            if (error || !success){
                                console.error("could not update data: ", error);
                                callback(null, error);
                            }else{
                                passThis.firstName = success["FIRST_NAME"];
                                passThis.lastName = success["LAST_NAME"];
                                passThis.email = success["EMAIL"];
                                callback(passThis);
                            }
                        });
                    } catch (e) {
                        console.error("updateUser: ", e);
                        callback(null, e);
                    }
                },

                updateProfilePicture: function(profilePicture, callback){
                    try{
                        
                        var data = {
                            firstName: this.firstName,
                            lastName: this.lastName,
                            email: this.email,
                            profilePicture: profilePicture,
                            role: this.role
                        };
                        var passThis = this;
                        $httpR.connectToServer(data, $httpR.updateUser, Globals, function(success, error){
                            if(error || !success){
                                console.error("could not update profile picture: ", error);
                                callback(null, error);
                            }else{
                                passThis.profilePicture = success["PROFILE_PICTURE"];
                                callback(passThis);
                            }
                        });
                    }catch(e){
                        console.error("updateProfilePicture: ", e);
                        callback(null, e);
                    }
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
                        $rootScope.currentScope.Toast.show("Error!", "There was an error in converting to JSON", Toast.LONG, Toast.ERROR);
                        console.error("toJson: ", e);
                        return null;
                    }
                }
            }
            return User;
        }
    ]);
})(window.angular);






















