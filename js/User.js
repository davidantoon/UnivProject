app.factory('User', ['$rootScope', 'Server', function($rootScope, Server){
	
	function User(username, password, email, SQ, SA, tempJson){
		if(tempJson){
			this.username = tempJson.username;
			this.password = tempJson.password;
			this.email = tempJson.email;
			this.SQ = tempJson.SQ;
			this.SA =tempJson.SA;
		}else{
			this.username = username;
			this.password = password;
			this.email = email;
			this.SQ = SQ;
			this.SA = SA;
		}
		// connet to server for registeration
	}


	/**
	 * Connets with server, check the entered username and password for login
	 * @param {String} userName username
	 * @param {String} Password password
	 */
	function login(userName, Password){
		try{

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
		 * Changes security question
		 * @param  {String} newQA new security question
		 */
		changeSQ: function(newSQ){
			try{
				this.QA = newQA;
				// update server
			}catch(e){

			}
		},

		/**
		 * Changes the security answer
		 * @param  {String} newSA new security answer
		 * @return {[type]}       [description]
		 */
		changeSA: function(newSA){
			try{
				this.SA = newSA;
				// update server
			}catch(e){

			}
		}
	}
}])