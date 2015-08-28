(function(angular) {
    'use strict';
	angular.module('IntelLearner').factory('User', ['$rootScope', '$http','Server','Soap', function($rootScope, $http, Server,Soap){
	
		function User(UID, firstname, lastname, username, email, profilePicture, role,token, tempJson){
			if(tempJson){
				this.UID = tempJson.UID;
				this.firstname = tempJson.firstname;
				this.lastname = tempJson.lastname
				this.username = tempJson.username;
				this.email = tempJson.email;
				this.creationDate = tempJson.creationDate;
				this.profilePicture = tempJson.profilePicture;
				this.role = tempJson.role;
				this.token = tempJson.token;

			}else{
				var now = new Date();
				var strDateTime = [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("-"), [AddZero(now.getHours()), AddZero(now.getMinutes()), AddZero(now.getSeconds())].join(":")].join(" ");

				//add to the given value to the left with "0" if its < 10
				function AddZero(num) {
				    return (num >= 0 && num < 10) ? "0" + num : num + "";
				}
				this.UID = UID;
				this.firstname = firstname;
				this.lastname = lastname
				this.username = username;
				this.email = email;
				this.creationDate = now;
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
		User.login = function(username, password, callback){
			try{
				if(username == "dummy" && password =="dummy"){
					// dummy login
					console.warn("Logged as dummy user");
					var dummyUSer = new User("David", "Antoon", username, "david.antoon@hotmail.com", "https://graph.facebook.com/100003370268591/picture", "Learner");
					dummyUSer.updateCookies();
					callback(dummyUSer);
					return;
				}else{
					var data = {
						username: username,
						password: password
					};
					Soap.connetToServer(data, Soap.logIn, function(success, error){
						if(error != null && (success)){
							var newUser = new User(result);
							newUser.updateCookies(function(success, error){
								if(success){
									callback(newUser);
									return;
								}else{
									console.error("could not update cookies: ", error)
									callback(null, error);
								}
							});
						}else{
							console.error("error logging in: ", error);
							callback(null, error);
						}
					});
				}
			}catch(e){
				console.error("error logging in: ", e );
				callback(null, e);
			}
		}

		/**
		 * registers for the server
		 * @param  {String}   firstname      first name
		 * @param  {String}   lastname       last name
		 * @param  {String}   username       username
		 * @param  {Strinf}   password       password
		 * @param  {String}   email          E-mail
		 * @param  {String}   profilePicture profile picture link
		 * @param  {String}   role           what is the role of the user
		 * @param  {Function} callback       callback function
		 */
		User.singup = function(firstname, lastname, username, password, email, profilePicture, role, callback){
			try{
				var data = {
					firstname: firstname,
					lastname: lastname,
					username: username,
					email: email,
					password: password,
					profilePicture: profilePicture,
					role: role
				};
				Soap.connetToServer(data, signUp, function(success, error){
					if((success) && error != null){
						var newUser = user(success);
						newUser.updateCookies();
						callback(newUser);
						return;
					}
					else{
						console.error("error signing up: ", error);
						callback(null, error);
					}
				});
			}catch(e){
				console.error("error signing up: ", e);
				callback(null, e);
			}
		}
		User.prototype = {

			/**
			 * saves user object in local storage
			 * @return {[type]}      [description]
			 */
			updateCookies: function(callback){
				try{
					localStorage.setItem("com.intel.user", this.toJSON());
					callback(true);
				}catch(e){
					callback(null, false);
				}
			}

			/**
			 * removes user from local storage
			 */
			removeCookies: function(){
				localStorage.removeItem("com.intel.user");
			}
			/**
			 * Changes the password for the use
			 * @param  {String} newPassword new password
			 */
			changePassword: function(newPassword, callback){
				try{

				}catch(e){
					
				}
			},

			/**
			 * Changes the email
			 * @return {[type]} [description]
			 */
			changeEmail: function(newEmail, callback){
				try{

				}catch(e){
					
				}
			},

			/**
			 * Gets the user's workspace from server (include settings and steps)
			 * @return {[type]} [description]
			 */
			getMyWorkspace: function(callback){
				try{

				}catch(e){
					
				}
			},

			/**
			 * Save user's workspace in server (include settings and steps)
			 * @return {[type]} [description]
			 */
			setMyWorkspace: function(callback){
				try{

				}catch(e){
					
				}
			},

			/**
			 * Changes role
			 * @param  {string} newRole new role
			 */
			changeRole: function(newRole, callback){
				try{
					this.role = newRole;
					// update server server
				}catch(e){

				}
			},

			/**
			 * Change profile picture
			 * @param  {String} newPicture New profile picture
			 */
			changeProfilePicture: function(newPicture, callback){
				try{
					this.profilePicture = newPicture;
					//update server
				}catch(e){

				}
			},

			toJSON: function(){
				try{
					return {
						"UID" = this.UID;
						"firstname" = this.firstname;
						"lastname" = this.lastname
						"username" = this.username;
						"email" = this.email;
						"creationDate" = this.creationDate;
						"profilePicture" = this.profilePicture;
						"role" = this.role;
						"token" = this.token;
					}
				}catch(e){
					$rootScope.currentScope.Toast.show("Error!","There was an error in converting to JSON", Toast.LONG, Toast.ERROR);
	           		console.error("toJson: ", e);
	           		return null;
				}
			}
		}
	}]);
})(window.angular);









