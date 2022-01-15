const News = require("../src/models/News");
const app = require("../src/server");
const request = require("supertest");

describe("Hello world test", () => {

    it("Should do a test", () => {
        const a = 5;
        const b = 3;
        const sum = a + b;

        expect(sum).toBe(8);
    });

});

describe("News API", () => {

    describe("GET /news", () => {

        beforeAll(() => {

            const news = [
                {
                    id: 1,
                    title: "Nueva pelicula de Spiderman",
                    text: "Proximamente en cines estará disponible la nueva película de Spiderman",
                    createdAt: "2021-09-21T00:00:00.000Z",
                    author: "Jose Enrique",
                    tags: ["Accion", "Terror"],
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
                },
                {
                    id: 2,
                    title: "Nueva pelicula de Batman",
                    text: "Proximamente en cines estará disponible la nueva película de Batman",
                    createdAt: "2021-09-21T00:00:00.000Z",
                    author: "Jose Enrique",
                    tags: ["Accion"],
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
                },
                {
                    id: 3,
                    title: "Nueva pelicula de Nolan",
                    text: "Proximamente en cines estará disponible la nueva película de Nolan",
                    createdAt: "2021-09-21T00:00:00.000Z",
                    author: "Jose Manuel",
                    tags: ["Accion", "Terror"],
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
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