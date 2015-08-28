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
				this.creationDate = new Date(tempJson.creationDate);
				this.profilePicture = tempJson.profilePicture;
				this.role = tempJson.role;
				this.token = tempJson.token;

			}else{
				this.UID = UID;
				this.firstname = firstname;
				this.lastname = lastname
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
		User.login = function(username, password, callback){
			try{
				if(username == "dummy" && password =="dummy"){
					// dummy login
					var data = {
						username: "1",
						password: "2"
					};
					Soap.connetToServer(data,logIn, function(result){
						if(result == "Access Denied"){
							console.log("Access Denied");
						}else{
							console.log("Dummy success");
							var UserObject = JSON.parse(result.toJSON().Body[Object.keys(result.toJSON().Body)[0]][Object.keys(result.toJSON().Body[Object.keys(result.toJSON().Body)[0]])]);
							var dummyUSer = new User("David", "Antoon", username, "david.antoon@hotmail.com", "https://graph.facebook.com/100003370268591/picture", "Learner");
							//dummyUSer.updateCookies();
							callback(dummyUSer);
							return;
						}
					});
				}else{
					var data = {
						username: username,
						password: password
					};
					Soap.connetToServer(data, logIn, function(result){
						if(result == "Access Denied"){
							console.log("Access Denied no dummy");
						}else{
							console.log("user success");
							var UserObject = JSON.parse(result.toJSON().Body[Object.keys(result.toJSON().Body)[0]][Object.keys(result.toJSON().Body[Object.keys(result.toJSON().Body)[0]])]);
							var newUser = new User(UserObject);
							//newUser.updateCookies();
							callback(newUser);
							return;
						}
					});
				}
			}catch(e){
					
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
			var data = {
				firstname: firstname,
				lastname: lastname,
				username: username,
				email: email,
				password: password,
				profilePicture: profilePicture,
				role: role
			};
			Soap.connetToServer(data, signUp, function(result){
				if(result == "Error"){
					callback(result);
				}
				else{
					var newUser = user(result);
					// newUser.updateCookies();
					callback(newUser);
					return;
				}
			});
		}
		User.prototype = {

			updateCookies: function(newName, newValue, newDays){
				if (days) {
			        var date = new Date();
			        date.setTime(date.getTime()+(days*24*60*60*1000));
			        var expires = "; expires="+date.toGMTString();
			    }
			    else var expires = "";
			    document.cookie = name+"="+value+expires+"; path=/";
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
			}
		}
	}]);
})(window.angular);









