const News = require("../src/models/News.js");
const app = require("../src/server.js");
const request = require("supertest");

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

describe("News API", () => {

    describe("GET /news", () => {

        beforeEach(() => {

            const news = [
                {
                    title: "Nueva pelicula de Spiderman",
                    text: "Proximamente en cines estará disponible la nueva película de Spiderman",
                    author: "Jose Enrique",
                },
                {
                    title: "Nueva pelicula de Batman",
                    text: "Proximamente en cines estará disponible la nueva película de Batman",
                    author: "Jose Enrique",
                },
                {
                    title: "Nueva pelicula de Nolan",
                    text: "Proximamente en cines estará disponible la nueva película de Nolan",
                    author: "Jose Manuel",
                },
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