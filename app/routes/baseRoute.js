import { Logs } from '../util/log.js';
// import PostgresUtils from '../databases/postgres-utils.js';
export class BaseRoute {
    constructor(server) {
        this.logs = new Logs();
        this.bindMethods([
            'createGets',
            'createPost',
            'createPuts',
            'createDel',
        ]);
        this.server = server;
        this.baseRoute = '/restify-bff';
        // this.pg = new PostgresUtils();
    }
    createRoutes() {
        this.createGets();
        this.createPost();
        this.createPuts();
        this.createDel();
    }
    bindMethod(method) {
        this[method] = this[method].bind(this);
    }
    bindMethods(methods) {
        methods.forEach((item) => this.bindMethod(item));
    }
}
