'use strict';
var app = require('../web');
var should = require('should');
var supertest = require('supertest');

describe('article_routes_tests.js', function() {
    
    it('should test getLatestArticles', function(done) {
        supertest(app)
        .get('/api/articles/latest/1')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '20')
        .expect(200, done);
        done();
    });

    it('should test getArticleByCategory', function(done) {
        done();
    });

    it('should test getArticlesByKeyword', function(done) {
        done();
    });

    it('should test getArticlesBySource', function(done) {
        done();
    });

    it('should test getRecentCategories', function(done) {
        done();
    });

    it('should test getArticleById', function(done) {
        done();
    });

});


