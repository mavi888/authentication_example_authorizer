'use strict';
var request = require('request');
var Promise = require('bluebird');
var jwtVerify = Promise.promisify(require('jsonwebtoken').verify);
var env = require('./config');

function getUserProfile(authToken) {
  console.log('Get user profile');
  var secretBuffer = new Buffer(env.AUTH0_SECRET, 'base64');
  var domain = env.DOMAIN;

  var body = {
    'id_token': authToken
  };

  var options = {
    url: 'https://'+ domain + '/tokeninfo',
    method: 'POST',
    json: true,
    body: body
  };

  return jwtVerify(authToken, secretBuffer).then(function(decoded) {
    return request(options);
  }).catch(function (error) {
    console.log('Failed jwt verification: ', error, 'auth: ', authToken);
    return error;
  });
}

module.exports = {
  getUserProfile : getUserProfile
};
