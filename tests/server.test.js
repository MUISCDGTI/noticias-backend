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

    describe("GET /news BY ID", () => {
        beforeAll(() => {
          const news = 
            {
              _id: "61e3f651bb7477b9959fe4b1",
              title: "Nueva pelicula de Spiderman",
              text: "Proximamente en cines estará disponible la nueva película de Spiderman",
              author: "Jose Enrique",
            };
    
          const user = {
            user : 'test',
            apikey: '1'
          };
    
          dbFindById = jest.spyOn(News, "findById");
          dbFindById.mockImplementation((r, callback) => {
            callback(null, news);
          });
    
          auth = jest.spyOn(ApiKey, "findOne");
          auth.mockImplementation((query, callback) => {
            callback(null, new ApiKey(user));
          });
        });
    
        it("should return a news item by id", () => {
          return request(app)
            .get("/api/v1/news/61e3f651bb7477b9959fe4b1")
            .set('apikey', '1')
            .then((response) => {
              expect(response.statusCode).toBe(200);
              expect(response.body).toStrictEqual({
                _id: "61e3f651bb7477b9959fe4b1",
                title: "Nueva pelicula de Spiderman",
                text: "Proximamente en cines estará disponible la nueva película de Spiderman",
                author: "Jose Enrique"
              });
              expect(dbFindById).toBeCalledWith("61e3f651bb7477b9959fe4b1" ,
                expect.any(Function)
              );
            });
        });
    
        it("should not return any news due to incorrect id", () => {
          dbFindById.mockImplementation((r, callback) => {
            callback(`CastError: Cast to ObjectId failed for value "61e3f651bb7477b9959fe4b1" (type Object) at path "_id" for model "News"`, null);
          });
    
          return request(app)
            .get("/api/v1/news/61e3f651bb7477b9959fe4b2")
            .set('apikey', '1')
            .then((response) => {
              expect(response.statusCode).toBe(500);
              expect(response.body).toStrictEqual({});
              expect(dbFindById).toBeCalledWith(
               "61e3f651bb7477b9959fe4b1",
                expect.any(Function)
              );
            });
        });
      });

    describe("POST /news", () => {

        const news = {
            title: "Nueva pelicula de Spiderman",
            text: "Proximamente en cines estará disponible la nueva película de Spiderman",
            author: "Jose Enrique"
        };

        let dbInsert;

        beforeEach(() => {

            const user = {
                user: "test",
                apikey: "1"
            };

            dbInsert = jest.spyOn(News, "create");

            auth = jest.spyOn(ApiKey, "findOne");
            auth.mockImplementation((query, callback) => {
                callback(null, new ApiKey(user));
            })

        });

        it("Should add a news item", () => {
            dbInsert.mockImplementation((n, callback) => {
                callback(false);
            });
            return request(app).post("/api/v1/news").set('apikey', '1').send(news).then((response) => {
                expect(response.statusCode).toBe(201);
                expect(dbInsert).toBeCalledWith(news, expect.any(Function));
            })
            
        });

        it("should return 500 if there is a problem with the DB", () => {
            dbInsert.mockImplementation((r, callback) => {
              callback(true);
            });
      
            return request(app)
              .post("/api/v1/news")
              .set('apikey', '1')
              .send(news)
              .then((response) => {
                expect(response.statusCode).toBe(500);
              });
          });
    });
});