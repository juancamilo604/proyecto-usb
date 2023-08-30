const request = require('supertest');
const router = require('../src');


describe("GET /login", () => {
    test("shoul response with a 200 status code", async () => {
        const response = await request(router).get("/login").send();
        expect(response.statusCode).toBe(200)
    })
})

/// ruta logout 

describe("GET /logout", () => {
    test("shoul response with a 302 status code", async () => {
        const response = await request(router).get("/logout").send();
        expect(response.statusCode).toBe(302)
    })
})

/// ruta principal

describe("GET /", () => {
    test("shoul response with a 302 status code", async () => {
        const response = await request(router).get("/").send();
        expect(response.statusCode).toBe(302)
    })
})

/// vista cargue masivo

describe("GET /cargueMasivo", () => {
    test("shoul response with a 302 status code", async () => {
        const response = await request(router).get("/cargueMasivo").send();
        expect(response.statusCode).toBe(302)
    })
})

// Report

describe("GET /report", () => {
    test("shoul response with a 302 status code", async () => {
        const response = await request(router).get("/report").send();
        expect(response.statusCode).toBe(302)
    })
})

describe("POST /getAllDatosTarjetas", () => {
    test("shoul response with a 302 status code", async () => {
        const response = await request(router).post("/getAllDatosTarjetas").send();
        expect(response.statusCode).toBe(302)
    })
})
