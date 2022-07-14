import sinon from 'sinon';
import { Logs } from '../../../app/util/log.js';
describe('Test we can do a logger', () => {
    const logger = new Logs();
    const log = logger.logger;
    beforeEach(() => {});
    it('Test we call info when we call info', () => {
        const spy = sinon.spy(log, 'info');
        logger.info('test');
        sinon.assert.calledOnce(spy);
    });
    it('Test we call error when we call error', () => {
        const spy = sinon.spy(log, 'error');
        logger.error('test');
        sinon.assert.calledOnce(spy);
    });
    it('Test we call warn when we call warn', () => {
        const spy = sinon.spy(log, 'warn');
        logger.warn('test');
        sinon.assert.calledOnce(spy);
    });
    it('Test we call fatal when we call fatal', () => {
        const spy = sinon.spy(log, 'fatal');
        logger.fatal('test');
        sinon.assert.calledOnce(spy);
    });
    it('Test we call trace when we call trace', () => {
        const spy = sinon.spy(log, 'trace');
        logger.trace('test');
        sinon.assert.calledOnce(spy);
    });
    it('Test we call debug when we call trace', () => {
        const spy = sinon.spy(log, 'debug');
        logger.debug('debug');
        sinon.assert.calledOnce(spy);
    });
    afterEach(() => {
        sinon.restore();
    });
});
describe('Test we can do a logger with ENV set to prod', () => {
    let log;
    let logger;
    let originalEnv;
    beforeEach(() => {
        originalEnv = process.env;
        process.env.ENV = 'prod';
        Object.defineProperty(process, 'env', {
            ENV: 'prod',
        });
        logger = new Logs();
        log = logger.logger;
    });

    it('Test we call debug when we call trace', () => {
        console.log(process.env.ENV);
        const spy = sinon.spy(log, 'debug');
        logger.debug('debug');
        sinon.assert.calledOnce(spy);
    });
    afterEach(() => {
        Object.defineProperty(process, 'env', {
            ENV: originalEnv,
        });
    });
});
