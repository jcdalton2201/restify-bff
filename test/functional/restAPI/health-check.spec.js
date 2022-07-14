import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
chai.use(chaiHttp);
describe('Function tests', () => {
    it('Test health check', async () => {
        const resp = await chai
            .request('http://localhost:8080')
            .get('/restify-bff/healthcheck');
        expect(resp).to.have.status(200);
    });
});
