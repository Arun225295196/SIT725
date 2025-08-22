const expect = require("chai").expect;
const request = require("request");

describe("Calculator API", function () {
    const baseUrl = "http://localhost:3000";
    
    // Test Case 1: Basic API connectivity
    describe("API Connectivity", function () {
        it("returns status 200 to check if api works", function(done) {
            request(baseUrl, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
    
    // Test Case 2: Addition functionality
    describe("Addition (/add)", function () {
        it("should return correct sum for valid numbers", function (done) {
            request.get(`${baseUrl}/add?a=10&b=5`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("15");
                done();
            });
        });
        
        it("should handle decimal numbers", function (done) {
            request.get(`${baseUrl}/add?a=2.5&b=3.7`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("6.2");
                done();
            });
        });
        
        it("should handle negative numbers", function (done) {
            request.get(`${baseUrl}/add?a=-5&b=3`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("-2");
                done();
            });
        });
    });
    
    // Test Case 3: Subtraction functionality
    describe("Subtraction (/subtract)", function () {
        it("should return correct difference for valid numbers", function (done) {
            request.get(`${baseUrl}/subtract?a=10&b=3`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("7");
                done();
            });
        });
        
        it("should handle negative results", function (done) {
            request.get(`${baseUrl}/subtract?a=3&b=10`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("-7");
                done();
            });
        });
    });
    
    // Test Case 4: Multiplication functionality
    describe("Multiplication (/multiply)", function () {
        it("should return correct product for valid numbers", function (done) {
            request.get(`${baseUrl}/multiply?a=4&b=5`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("20");
                done();
            });
        });
        
        it("should handle multiplication by zero", function (done) {
            request.get(`${baseUrl}/multiply?a=5&b=0`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("0");
                done();
            });
        });
    });
    
    // Test Case 5: Division functionality
    describe("Division (/divide)", function () {
        it("should return correct quotient for valid numbers", function (done) {
            request.get(`${baseUrl}/divide?a=20&b=4`, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.include("5");
                done();
            });
        });
        
        it("should handle division by zero", function (done) {
            request.get(`${baseUrl}/divide?a=10&b=0`, function (error, response, body) {
                expect(response.statusCode).to.equal(400);
                expect(body).to.include("Cannot divide by zero");
                done();
            });
        });
    });
    
    // Test Case 6: Error handling for all operations
    describe("Error Handling", function () {
        it("should handle missing parameters in add", function (done) {
            request.get(`${baseUrl}/add?a=10`, function (error, response, body) {
                expect(response.statusCode).to.equal(400);
                expect(body).to.include("Invalid input");
                done();
            });
        });
        
        it("should return error for non-numeric input in add", function (done) {
            request.get(`${baseUrl}/add?a=hello&b=world`, function (error, response, body) {
                expect(response.statusCode).to.equal(400);
                expect(body).to.include("Invalid input");
                done();
            });
        });
        
        it("should handle missing parameters in multiply", function (done) {
            request.get(`${baseUrl}/multiply?b=5`, function (error, response, body) {
                expect(response.statusCode).to.equal(400);
                expect(body).to.include("Invalid input");
                done();
            });
        });
        
        it("should return error for non-numeric input in divide", function (done) {
            request.get(`${baseUrl}/divide?a=abc&b=def`, function (error, response, body) {
                expect(response.statusCode).to.equal(400);
                expect(body).to.include("Invalid input");
                done();
            });
        });
    });
});