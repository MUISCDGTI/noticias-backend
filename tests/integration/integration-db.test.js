const mongoose = require('mongoose');
const dbConnect = require('../../src/db');
const News = require('../../src/models/News')
const app = require('../../src/server.js')

describe('News DB connection', () => {
    beforeAll(() => {
        dbConnect();
    })

    beforeEach((done) => {
        News.deleteMany({}, (err) => {
            done();
        });
    });

    it('Writes a news item in the DB', (done) => {
        const news = new News({title: 'Vuelve spiderman', text: 'Prueba de noticia', author:'Jose'});
        news.save((err, news) => {
            News.find({}, (err, news) => {
                expect(news).toBeArrayOfSize(1);
            });
        });
        done();
    });

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
            app.close();
        });
    });

})