(function(angular) {
    'use strict';
	angular.module('IntelLearner').factory('User', ['$rootScope', '$http','Server', function($rootScope, $http, Server){
	
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
			// connet to server for registeration
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
						User.connetToServer("1", "2",null, function(result){
							if(result == "Access Denied"){
								console.log("Access Denied");
							}else{
								console.log("Dummy success");
								var UserObject = JSON.parse(result.toJSON().Body[Object.keys(result.toJSON().Body)[0]][Object.keys(result.toJSON().Body[Object.keys(result.toJSON().Body)[0]])]);
								var dummyUSer = new User("David", "Antoon", username, "david.antoon@hotmail.com", "https://graph.facebook.com/100003370268591/picture", "Learner");
								//dummyUSer.updateCoockies();
								callback(dummyUSer);
								return;
							}
					});
				}else{
					User.connetToServer(username, password, null, function(result){
						if(result == "Access Denied"){
							console.log("Access Denied no dummy");
						}else{
							console.log("user success");
							var UserObject = JSON.parse(result.toJSON().Body[Object.keys(result.toJSON().Body)[0]][Object.keys(result.toJSON().Body[Object.keys(result.toJSON().Body)[0]])]);
							var newUser = new User(UserObject);
							//newUser.updateCoockies();
							callback(newUser);
							return;
						}
					});
				}
			}catch(e){
					
			}
		}


		User.connetToServer = function(userName, passWord, connection, callback){
			$.soap({
			    url: 'http://31.154.164.129:8888/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php/',
			    method: 'logIn',

			    data: {serverHash:"DAVID&AMEER", username: userName , password: passWord},

			    success: function (soapResponse) {
			    	console.log("soap success");
			        callback(soapResponse);
			    },
			    error: function (SOAPResponse) {
			    	if(SOAPResponse == "Access Denied")
			        	callback("Access Denied");
			        else 
			        	callback(SOAPResponse);
			    }
			});
		}
		User.prototype = {

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









