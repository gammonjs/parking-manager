const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

var expect = chai.expect;
chai.use(chaiHttp);

describe("GET /api", () => {

    it("should get response with INDEX text", (done) => {
        chai.request(app)
            .get('/api')
            .end((err, res) => {
                console.log(res.text);
                expect(res).to.have.status(200);
                expect(res.text).to.equal('INDEX');
                done();
            });
    });
});
