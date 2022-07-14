import passport from 'passport-restify';
import { Strategy as OidcStrategy } from 'passport-openidconnect';
// import { OAuth2Strategy } from 'passport-google-oauth';
import util from 'util';
import { Logs } from '../util/log.js';
const logger = new Logs();
export default class SSOService {
    constructor(settings) {
        let reqSettings = [
            // 'issuer',
            'clientID',
            'clientSecret',
            // 'redirectUri',
            // 'authorizationURL',
            // 'tokenURL',
            'scope',
            // 'userInfoURL',
            // 'skipUserProfile',
            'callbackURL',
            // 'pkce',
            // 'appBaseUrl',
        ];
        let isSuperset = reqSettings.every(function (val) {
            return Object.keys(settings).indexOf(val) >= 0;
        });
        if (!isSuperset) {
            throw new Error(
                'required settings are: ' +
                    util.inspect(reqSettings, false, null)
            );
        }
        //------------------------------------------------------------------------------------------------------------------
        // Session setup
        //------------------------------------------------------------------------------------------------------------------
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
        try {
            passport.use(
                new OidcStrategy(
                    // new OAuth2Strategy(
                    settings,
                    function (
                        iss,
                        sub,
                        profile,
                        accessToken,
                        refreshToken,
                        verified
                    ) {
                        process.nextTick(function () {
                            logger.debug(profile);
                            let userObj = {
                                id: profile.id,
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            };
                            if (profile.id) {
                                if (settings.skipUserProfile) {
                                    verified(null, userObj);
                                } else {
                                    userObj.name = profile.displayName;
                                    userObj.email = profile._json.email.value;
                                    // userObj.imgUrl = profile.photos[0].value;
                                    verified(null, userObj);
                                }
                            } else {
                                verified(new Error('EID not found'), null);
                            }
                        });
                    }
                )
            );
        } catch (error) {
            console.log(error);
        }
    }
    initialize() {
        logger.info('passport.initalize');
        // GlobalUtil.globalTunnelOn();
        return passport.initialize();
    }
    /**
     * Get the current session for the call
     * @returns Session
     */
    session() {
        logger.info('passport.session');
        return passport.session();
    }
    /**
     *
     * @param {Function} cb Callback for the authentication
     * @param {Strategy} strategy What strategy should be used
     * @returns
     */
    authenticate(strategy = 'openidconnect', cb) {
        logger.info('passport.authenticate');
        return passport.authenticate(strategy, {}, cb);
    }
}
