const News = require("../src/models/News.js");
const app = require("../src/server.js");
const request = require("supertest");
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

            dbFind = jest.spyOn(News, "find");
            dbFind.mockImplementation((query, sm, sort, callback) => {
                callback(null, news);
            });
        });

        it("Should return all news", () => {

            return request(app)
                .get("/api/v1/news")
                .then((response) => {

                    expect(response.statusCode).toBe(200);

                    expect(dbFind).toBeCalledWith({}, expect.any(Function));

                    expect(response => { console.log(response) })

                });
        });
    });
});