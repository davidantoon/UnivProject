(function(angular) {
    // 'use strict';
	angular.module('IntelLearner').factory('Storage', ["$rootScope", "Globals", "TypeOf", "Content","Log", "$httpR", function($rootScope, Globals, TypeOf, Content, Log, $httpR){


		/**
		 * Default constructor to prevent errors!
		 */
		function Storage(){}
		Storage.prototype = {
			/**
			 * Saves value in local storage
			 * @param  {String}   key      key of th value we are going to save
			 * @param  {String}   value    the value we are going to search
			 * @param  {Function} callback callback function
			 */
			save: function(key, value, callback){},

			/**
			 * Gets the value by key from local storage
			 * @param  {String}   key      the key we want to get
			 * @param  {Function} callback callback function
			 */
			get: function(key, callback){},

			/**
			 * Clears the local storage or removes item from it
			 * @param  {string}   key      the key we are going to remove
			 * @param  {string}   value    the value we are going to remove
			 * @param  {Function} callback callback funtion
			 */
			clear: function(key, value, callback){},

			/**
			 * Gets Steps, Settings, currentUser
			 * @param  {Function} callback ({Steps, Settings, CurrentUser}, error)
			 */
			getWorkspaceData: function(stringType, callback){},

			/**
			 * Save Steps, Settings, currentUser
			 * @param {Steps}   steps       Current Steps object
			 * @param {Settings}   settings    Current Settings obejct
			 * @param {Object}   currentUser Current logged user
			 * @param {Function} callback    (success, error)
			 */
			setWorkspaceData: function(steps, settings, currentUser, callback){},

			/**
			 * Gets elemtent or creates new onw if it doesnt exist
			 * @param  {number}   elemId            element id
			 * @param  {object}   jsonObject        content object
			 * @param  {boolean}  forceLastmodefied true if force last modified change
			 * @param  {boolean}  forceServerPull   true if force pull from server
			 * @param  {Function} callback          callback function
			 */
			getElementById: function(jsonObject, forceLastmodefied, forceServerPull, callback){}
		}