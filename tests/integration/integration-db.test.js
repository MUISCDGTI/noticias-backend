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

    it('Writes a news item in the DB', (done) => {
        const news = new News({title: 'Vuelve spiderman', text: 'Prueba de noticia', author:'Jose'});
        news.save((err, news) => {
            expect(err).toBeNull();
            News.find({}, (err, news) => {
                expect(news).toBeArrayOfSize(1);
                done();
            });
        });
    });

    
    it('Not writes a news item in the DB without title', (done) => {
        const news = new News({text: 'Prueba de noticia', author:'Jose'});
        news.save((err, news) => {
            expect(err.message).toEqual("News validation failed: title: Path `title` is required.")
            done();
        });
    });

    it('Not writes a news item in the DB without author', (done) => {
        const news = new News({title: 'Spiderman', text: 'Prueba de noticia'});
        news.save((err, news) => {
            expect(err.message).toEqual("News validation failed: author: Path `author` is required.")
            done();
        });
    });

    it('Not writes a news item in the DB without text', (done) => {
        const news = new News({title: 'Spiderman', author:'Jose'});
        news.save((err, news) => {
            expect(err.message).toEqual("News validation failed: text: Path `text` is required.")
            done();
        });
    });


    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

})