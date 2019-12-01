import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);
chai.should();

describe("Locations", () => {

    describe("GET /", () => {

        it("should get all location records", (done) => {
             chai.request(app)
                 .get('/api/locations')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('Array');
                     done();
                  });
         });

        it("should get a single location record", (done) => {
             const id = 1;
             chai.request(app)
                 .get(`/api/locations/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
         
        it("should not get a single location record", (done) => {
             const id = 10000;
             chai.request(app)
                 .get(`/api/locations/${id}`)
                 .end((err, res) => {
                     res.should.have.status(404);
                     done();
                  });
         });
    });
});
