const mongoose = require('mongoose');
const dbConnect = require('../../src/db');
const News = require('../../src/models/News')

describe('News DB connection', () => {
    beforeAll(() => {
        return dbConnect();
    })

    beforeEach((done) => {
        News.deleteMany({}, (err) => {
            done();
        });
    });

    it('Writes a news item in the DB', async (done) => {
        const news = new News({title: 'Vuelve spiderman', text: 'Prueba de noticia', author:'Jose'});
        await news.save((err, news) => {
            expect(err).toBeNull();
            News.find({}, (err, news) => {
                expect(news).toBeArrayOfSize(1);
                done();
            });
        });
    });

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

})