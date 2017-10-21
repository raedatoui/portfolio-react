// @flow
/* eslint no-shadow: 0, no-unused-vars: 0 */
import { TestRunner, aroundEach, beforeEach } from './TestRunner';

const makeMockTestRunner = () => {
    const mockMochaDeps = {
        describe: (description: string, cont) => cont(),
        it: (description: string, cont) => cont()
    };
    return new TestRunner(mockMochaDeps, test => test);
};

describe('TestRunner', () => {
    describe('beforeEach', () => {
        it('is able to add to context', () => {
            const t = makeMockTestRunner();
            t.describe('foo', beforeEach(ctx => ({ foo: 1 })), (t) => {
                t.it('works', (ctx) => {
                    expect(ctx.foo).toEqual(1);
                });
            });
        });

        it('is able to read from context', () => {
            const t = makeMockTestRunner();
            t.describe('foo', beforeEach(ctx => ({ foo: 1 })), (t) => {
                t.describe('foo', beforeEach(ctx => ({ bar: ctx.foo + 1 })), (t) => {
                    t.it('works', (ctx) => {
                        expect(ctx.bar).toEqual(2);
                    });
                });
            });
        });

        it('merges new context variables with old ones, prefering new ones', () => {
            const t = makeMockTestRunner();
            t.describe('foo', beforeEach(ctx => ({ foo: 1, bar: 0 })), (t) => {
                t.describe('foo', beforeEach(ctx => ({ bar: 2 })), (t) => {
                    t.it('works', (ctx) => {
                        expect(ctx.foo).toEqual(1);
                        expect(ctx.bar).toEqual(2);
                    });
                });
            });
        });
    });

    describe('aroundEach', () => {
        it('allows code to be run before and after the test', () => {
            const t = makeMockTestRunner();
            const calls = [];
            const contextExtension = aroundEach(test => (ctx) => {
                calls.push(1);
                test({});
                calls.push(3);
            });
            t.describe('foo', contextExtension, (t) => {
                t.it('works', (ctx) => {
                    calls.push(2);
                });
            });
            expect(calls).toEqual([1, 2, 3]);
        });

        it('is able to add to context', () => {
            const t = makeMockTestRunner();
            t.describe('foo', aroundEach(test => ctx => test({ foo: 1 })), (t) => {
                t.it('works', (ctx) => {
                    expect(ctx.foo).toEqual(1);
                });
            });
        });

        it('is able to read from context', () => {
            const t = makeMockTestRunner();
            t.describe('foo', aroundEach(test => ctx => test({ foo: 1 })), (t) => {
                t.describe(
                    'foo',
                    aroundEach(test => ctx => test({ bar: ctx.foo + 1 })),
                    (t) => {
                        t.it('works', (ctx) => {
                            expect(ctx.bar).toEqual(2);
                        });
                    }
                );
            });
        });

        it('merges old context variables with new ones, prefering new ones', () => {
            const t = makeMockTestRunner();
            t.describe(
                'foo',
                aroundEach(test => ctx => test({ foo: 1, bar: 0 })),
                (t) => {
                    t.describe('foo', aroundEach(test => ctx => test({ bar: 2 })), (t) => {
                        t.it('works', (ctx) => {
                            expect(ctx.foo).toEqual(1);
                            expect(ctx.bar).toEqual(2);
                        });
                    });
                }
            );
        });

        it('enforces usage of test in the aroundEach body', () => {
            const invalidContextExtension = aroundEach(test => (deps) => {
                // Do nothing
            });
            const t = makeMockTestRunner();
            expect(() => {
                t.describe('foo', invalidContextExtension, (t) => {
                    t.it('works', (ctx) => {});
                });
            }).toThrow();
        });
    });
});
