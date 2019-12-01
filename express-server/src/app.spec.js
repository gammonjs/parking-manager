import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);
chai.should();

describe("App", () => {

    it('responds to /api/locations', (done) => {
        chai.request(app)
            .get('/api/locations')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('404 everything else', (done) => {
        chai.request(app)
            .get('/foo/bar')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
        });
});