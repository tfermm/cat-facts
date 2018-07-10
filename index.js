'use strict';

const rp = require('request-promise');
const merge = require('lodash.merge');
var Promise = require("bluebird");

var defaults = {
	request: {
		uri: '',
		qs: {},
		headers: {
			'User-Agent': 'Request-Promise'
		},
		// Automatically parses the JSON string in the response
		json: true
	} 
};

var methods = {};

methods.get = function(params){
	return rp(params).then(function(data) {
		return data;
	});
}

methods.init = function(params){
	var that = this;
	return new Promise(function(resolve, reject) {
		if(typeof(params) === 'undefined'){
			params = {};
		}
		that.settings = merge({}, defaults, params);
		if(typeof(params.limit) !== 'undefined'){
			that.settings.request.uri += "?limit=" + params.limit;
		}
		resolve(this);
	});
}

methods.getFact = function(params){
	var that = this;
	
	defaults.request.uri = 'https://catfact.ninja/fact';
	return that.init(params).then(function(){
		return that.get(that.settings.request);
	}).then(function(catFact){
		console.log(catFact);
		return catFact.fact;
	});
};

methods.getFacts = function(params){
	var that = this;
	defaults.request.uri = 'https://catfact.ninja/facts';

	return that.init(params).then(function(){
		return that.get(that.settings.request);
	}).then(function(catFacts){
		return {
			total: catFacts.total,
			data: catFacts.data
		};
	});
};

module.exports = methods;
