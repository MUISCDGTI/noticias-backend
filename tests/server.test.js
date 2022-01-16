const News = require("../src/models/News.js");
const app = require("../src/server.js");
const request = require("supertest");
const ApiKey = require("../src/models/apikeys.js");
describe("News API", () => {
    describe("GET /", () => {
        it("should return an HTML document", () => {
        return request(app)
            .get("/")
            .then((response) => {
            expect(response.status).toBe(200);
            expect(response.type).toEqual(expect.stringContaining("html"));
            expect(response.text).toEqual(expect.stringContaining("h1"));
            });
        });
    });

    describe("GET /news", () => {
        beforeEach(() => {
            const news = [
                {
                    title: "Nueva pelicula de Spiderman",
                    text: "Proximamente en cines estará disponible la nueva película de Spiderman",
                    author: "Jose Enrique",
                }

            ];

            const user = {
                user: "test",
                apikey: "1"
            }

            dbFind = jest.spyOn(News, "find");
            dbFind.mockImplementation((query, callback) => {
                callback(null, news);
            });

            auth = jest.spyOn(ApiKey, "findOne");
            auth.mockImplementation((query, callback) => {
                callback(null, new ApiKey(user));
            })
        });

        it("Should return all news", () => {

            return request(app)
                .get("/api/v1/news").set('apikey', '1')
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    expect(dbFind).toBeCalledWith({}, expect.any(Function));
                });
        });
    });
    describe("POST /news", () => {
        it("Should add a news item", () => {
            const news = {
                title: "Nueva pelicula de Spiderman",
                text: "Proximamente en cines estará disponible la nueva película de Spiderman",
                author: "Jose Enrique",
            }

            dbInsert = jest.spyOn(News, "create");
            dbInsert.mockImplementation((n, callback) => {
                callback(true);
            }) 

            return request(app).post('/api/v1/news').send(news).then((response) => {
                expect(response.statusCode).toBe(201);
                expect(dbInsert).toBeCalledWith(news, expect.any(Function));
            })
            
        });
    });
});