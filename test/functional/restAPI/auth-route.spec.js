import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;

chai.use(chaiHttp);
describe('Authentication Test', () => {
    it('Test auth logout', async () => {
        const resp = await chai
            .request('http://localhost:8080')
            .get('/restify-bff/auth/logout');
        expect(resp).to.have.status(404);
    });
    it('Test user is not login', async () => {
        const resp = await chai
            .request('http://localhost:8080')
            .get('/restify-bff/auth/user');
        expect(resp).to.have.status(401);
    });
    // it('Test user is Authenicated', async () => {
    //     await chai.request('http://localhost:8080').get('/restify-bff/auth/test');
    //     const resp = await chai
    //         .request('http://localhost:8080')
    //         .get('/restify-bff/auth/user');
    //     // console.log(resp);
    //     expect(resp).to.have.status(404);
    // });
});
