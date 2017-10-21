// @flow
/* eslint no-shadow: 0, no-unused-expressions: 0 */
import { t, beforeEach, aroundEach } from './TestRunner';

/*
   it
*/

t.it('test', (ctx) => {
    // $FlowFixMe
    (ctx.foo: 1);
});

/*
   describe
*/

t.describe('Foo', (t) => {
    t.it('test', (ctx) => {
    // $FlowFixMe
        ctx.foo;
    });
});

() => {
    const withFoo = test => ctx => test({ ...ctx, foo: 1 });
    t.describe('Foo', withFoo, (t) => {
        t.it('test', (ctx) => {
            (ctx.foo: number);
            // $FlowFixMe
            (ctx.foo: void);
            ctx.baz; // Note: this should error ideally
        });
    });
};

() => {
    const withFoo = test => ctx => test({ ...ctx, foo: 1 });
    t.describe('Foo', withFoo, (t) => {
        t.describe('Bar', (t) => {
            t.it('test', (ctx) => {
                (ctx.foo: number);
                // $FlowFixMe
                (ctx.foo: void);
                ctx.baz; // Note: this should error ideally
            });
        });
    });
};

() => {
    const withFoo = test => ctx => test({ ...ctx, foo: 1 });
    const withBar = test => ctx => test({ ...ctx, bar: 1 });
    t.describe('Foo', withFoo, (t) => {
        t.describe('Bar', withBar, (t) => {
            t.it('test', (ctx) => {
                (ctx.foo: number);
                (ctx.bar: number);
                // $FlowFixMe
                (ctx.foo: void);
                // $FlowFixMe
                (ctx.bar: void);
                ctx.baz; // Note: this should error ideally
            });
        });
    });
};

/*
   beforeEach
*/

t.describe('Foo', beforeEach(() => ({ foo: 'hello' })), (t) => {
    t.it('works', (ctx) => {
        (ctx.foo: string);
        // $FlowFixMe
        (ctx.foo: number);
        // $FlowFixMe
        ctx.bar;
    });
});

t.describe(
    'Foo asdfdsfasdf asdfasdf',
    beforeEach(() => ({ foo: 'hello' })),
    (t) => {
        t.describe(
            'Bar asdfasdf asdfasdfasdf',
            beforeEach(ctx => ({ bar: `${ctx.foo} world` })),
            (t) => {
                t.it('works', (ctx) => {
                    (ctx.foo: string);
                    (ctx.bar: string);
                    // $FlowFixMe
                    (ctx.foo: number);
                    // $FlowFixMe
                    (ctx.bar: number);
                    // $FlowFixMe
                    ctx.baz;
                });
            }
        );
    }
);

t.describe(
    'Foo asdfdsfasdf asdfasdf',
    aroundEach(test => () => {
        test({ foo: 'hello' });
    }),
    (t) => {
        t.describe(
            'Bar asdfasdf asdfasdfasdf',
            aroundEach(test => (ctx) => {
                test({ bar: ctx.foo });
            }),
            (t) => {
                t.it('works', (ctx) => {
                    (ctx.foo: string);
                    (ctx.bar: string);
                    // $FlowFixMe
                    (ctx.foo: number);
                    // $FlowFixMe
                    (ctx.bar: number);
                    // $FlowFixMe
                    ctx.baz;
                });
            }
        );
    }
);
