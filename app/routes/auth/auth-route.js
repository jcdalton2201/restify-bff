import { BaseRoute } from '../baseRoute.js';
export class AuthRoute extends BaseRoute {
    /**
     * Handles the auth routes.
     * @param {Restigy} server Restify server
     * @param {SsoService} ssoService Helper class to work with SSO
     */
    constructor(server, ssoService) {
        super(server);
        this.ssoService = ssoService;
        this.bindMethods(['logout', 'getAuthUser', 'authCallback']);
        this.createRoutes();
    }
    createGets() {
        this.server.get(
            `${this.baseRoute}/auth/okta`,
            this.ssoService.authenticate(),
            () => {}
        );
        this.server.get(`${this.baseRoute}/auth/callback`, this.authCallback);
        this.server.get(`${this.baseRoute}/auth/logout`, this.logout);
        this.server.get(`${this.baseRoute}/auth/user`, this.getAuthUser);
    }
    createPost() {}
    createPuts() {}
    createDel() {}
    authCallback(req, res, next) {
        this.logs.info('Auth CallBack is called');
        this.logs.info(req.query);
        this.ssoService.authenticate('openidconnect', (err, user) => {
            let redirectUrl = req.session.redirectUrl
                ? req.session.redirectUrl
                : '/';
            delete req.session.redirectUrl;
            console.log(user);
            if (err) {
                this.logs.error(err);
                return next(err);
            }
            if (user) {
                this.logs.info(JSON.stringify(user));
                // Login user
                req.logIn(user, function (err) {
                    if (err) {
                        this.logs.error(err);
                        return next(err);
                    } else {
                        res.redirect(redirectUrl, next);
                        // return handleResponse(req, res, redirectUrl, user);
                    }
                });
            } else {
                return res.redirect('/', next);
            }
        })(req, res, next);
    }
    logout(req, res) {
        this.logs.debug('inside logout');
        req.logOut();
        req.session = null;
        this.logs.info('Session destroy error status  : ');
        res.clearCookie(req.sessionID);
        res.redirect('/', () => {
            this.logs.info('we are redirection');
        });
    }
    getAuthUser(req, res) {
        this.logs.info('INFO redirect url :: ');
        this.logs.info(req.query.redirectUrl);

        let redirectUrl = req.query.redirectUrl;
        if (redirectUrl) {
            req.session.redirectUrl = redirectUrl;
        }
        this.logs.info('Finding if the user is still authenticated');

        if (!req.isAuthenticated || !req.isAuthenticated()) {
            this.logs.info(
                'user is not yet authenticated or authentication expired'
            );
            res.status(401);
            res.send('unauthorized');
        } else {
            this.logs.info('TODO: set up entitlements');
            this.logs.debug(JSON.stringify(req.user));
            res.json(req.user);
        }
    }
}
