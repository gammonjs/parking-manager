import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe("Locations", () => {
    var location = {
        name: "Parking Lot TEST",
        street: "123 Street A",
        state: "TX",
        zip: "78711",
        hours: "M-F 9-5",
        price: 16,
    };

    it("shoud post a single location record", (done) => {
        chai.request(app)
            .post('/api/locations', location)
            .send(location)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.name.should.eql(location.name);
                location.id = res.body.id;
                done();
            });
    });

    it("should 400 when posting a record that already exists", (done) => {
        chai.request(app)
            .post('/api/locations')
            .send(location)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('array');
                res.body[0].message.should.eql("PRIMARY must be unique");
                done();
            });
    });

    it("should put a single location record", (done) => {
        const newStreet = "123 Street B";
        chai.request(app)
            .put(`/api/locations/${location.id}`)
            .send({...location, street: newStreet})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.name.should.eql(location.name);
                location.id = res.body.id;
                res.body.street.should.eql(newStreet);
                location = res.body;
                done();
            });
    });

    it("should get a single location record", (done) => {
        chai.request(app)
            .get(`/api/locations/${location.id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.name.should.eql(location.name);
                done();
            });
    });

    it("should get all location records", (done) => {
        chai.request(app)
            .get('/api/locations')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it("should delete a single location record", (done) => {
        chai.request(app)
            .delete(`/api/locations/${location.id}`)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });

    it("should 404 when getting a non-existent location record", (done) => {
        chai.request(app)
            .get(`/api/locations/${location.id}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it("should 404 when putting a non-existent location record", (done) => {
        chai.request(app)
            .put(`/api/locations/${location.id}`)
            .send(location)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it("should 404 when deleting a non-existent location record", (done) => {
        chai.request(app)
            .delete(`/api/locations/${location.id}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });


});
