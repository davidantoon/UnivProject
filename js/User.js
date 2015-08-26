app.factory('User', ['$rootScope', 'Server', function($rootScope, Server){
	
	function User(firstname, lastname, username, password, email, profilePicture, role, tempJson){
		if(tempJson){
			this.firstname = tempJson.firstname;
			this.lastname = tempJson.lastname
			this.username = tempJson.username;
			this.password = tempJson.password;
			this.email = tempJson.email;
			this.creationDate = tempJson.creationDate;
			this.profilePicture = tempJson.profilePicture;
			this.role = tempJson.role;

		}else{
			var now = new Date();
			var strDateTime = [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("-"), [AddZero(now.getHours()), AddZero(now.getMinutes()), AddZero(now.getSeconds())].join(":")].join(" ");

			//add to the given value to the left with "0" if its < 10
			function AddZero(num) {
			    return (num >= 0 && num < 10) ? "0" + num : num + "";
			}
			this.firstname = firstname;
			this.lastname = lastname
			this.username = username;
			this.password = password;
			this.email = email;
			this.creationDate = now;
			this.profilePicture = profilePicture;
			this.role = role;
		}
		// connet to server for registeration
	}


	/**
	 * Connets with server, check the entered username and password for login
	 * @param {String} userName username
	 * @param {String} Password password
	 * @return {User} return null if wrong info, else User Object
	 */
	User.login = function(userName, Password){
		try{

			return new User();
		}catch(e){
				
		}
	}
	
	User.prototype = {

		/**
		 * Changes the password for the use
		 * @param  {String} newPassword new password
		 */
		changePassword: function(newPassword){
			try{

			}catch(e){
				
			}
		},

		/**
		 * Saves new default setting for the specific user
		 * @param  {Object} newSettings new settings
		 */
		saveSettings: function(newSettings){
			try{

			}catch(e){
				
			}
		},

		/**
		 * Gets the default settings from server
		 */
		getSettings: function(){
			try{

			}catch(e){
				
			}
		},

		/**
		 * Changes the email
		 * @return {[type]} [description]
		 */
		changeEmail: function(){
			try{

			}catch(e){
				
			}
		},

		/**
		 * Gets the user's workspace from server 
		 * @return {[type]} [description]
		 */
		getMyWorkspace: function(){
			try{

			}catch(e){
				
			}
		},

		/**
		 * Changes role
		 * @param  {string} newRole new role
		 */
		changeRole: function(newRole){
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
		changeProfilePicture: function(newPicture){
			try{
				this.profilePicture = newPicture;
				//update server
			}catch(e){

			}
		}
	}
}])