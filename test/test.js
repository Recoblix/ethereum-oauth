const request = require('supertest');
const express = require('express');
const assert = require('assert');
 
//const app = require('../app');
 
describe('Api tests', function() {
  var app;

  before(function(){
    app=require('../app');
  });

  after(function(done) {
    app.close(done);
    process.exit(0);
  });

  describe('login', function() {
    it('should redirect without arguments', function(done) {
      request(app)
        .get('/login')
        .expect('Content-Type', /text/)
        .expect(302, done)
    });

    //TODO: post
  });

  describe('logout', function() {
    it('should redirect without having been logged in already', function(done) {
      request(app)
        .get('/logout')
        .expect('Content-Type', /text/)
        .expect(302, done)
    });
  });

  describe('account', function() {
    it('should redirect without arguments', function(done) {
      request(app)
        .get('/account')
        .expect('Content-Type', /text/)
        .expect(302,done)
    });
  });

  describe('success', function() {
    it('should return successfully', function(done) {
      request(app)
        .get('/success')
        .expect('Content-Type', /html/)
        .expect(200,done)
    });
  });

  describe('fail', function() {
    it('should return successfully', function(done) {
      request(app)
        .get('/fail')
        .expect('Content-Type', /html/)
        .expect(200,done)
    });
  });

  describe('challenge', function() {
    it('should return successfully', function(done) {
      request(app)
        .post('/challenge')
        .expect('Content-Type', /json/)
        .expect(200,done)
    });
  });

  describe('authorize', function() {
    it('should redirect without arguments', function(done) {
      request(app)
        .get('/dialog/authorize')
        .expect('Content-Type', /text/)
        .expect(302,done)
    });
  });

  describe('decision', function() {
    it('should redirect without arguments', function(done) {
      request(app)
        .post('/dialog/authorize/decision')
        .expect('Content-Type', /text/)
        .expect(302,done)
    });
  });

  describe('token', function() {
    it('should fail without credentials', function(done) {
      request(app)
        .post('/oauth/token')
        .expect(401,done)
    });
  });

  describe('userinfo', function() {
    it('should fail without credentials', function(done) {
      request(app)
        .get('/api/userinfo')
        .expect(401,done)
    });
  });

  describe('clientinfo', function() {
    it('should fail without credentials', function(done) {
      request(app)
        .get('/api/clientinfo')
        .expect(401,done)
    });
  });

});

