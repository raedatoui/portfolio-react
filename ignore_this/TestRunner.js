// @flow

import Callable from 'callable-class';

type Test<A> = A => void;

// A ContextExtension from A to B
// allows us to extend the computational context in which a test is run in.
// This includes modifing the set of dependencies in which a tests are run with from type A to type B,
// and adding side effects before and after a test is run.
export type ContextExtension<A: {}, B: {}> = {
  (Test<B>): Test<A>
};

class EnrichedContextExtension<A: {}, B: {}> extends Callable<
  Test<B>,
  Test<A>
> {
    extend<C: {}>(next: ContextExtension<B, C>): EnrichedContextExtension<A, C> {
        return new EnrichedContextExtension(test => this(next(test)));
    }
}

// A Context represents a reifiable chain of ContextExtensions.
// We discharge a Context by providing the test and an empty set of dependencies.
type Context<A> = ContextExtension<{}, A>;

type BeforeEach = <A: {}, B: {}>((A) => B) => ContextExtension<A, B & A>;
export const beforeEach: BeforeEach = (<)A: {}, B: {}>(
    fn: A => B
): ContextExtension<A, B & A> => test => deps => test({ ...deps, ...fn(deps) });

type AroundEach = <A: {}, B: {}>(
  ContextExtension<A, B>
) => EnrichedContextExtension<A, B & A>;

export const aroundEach: AroundEach = (<)A: {}, B: {}>(
    aroundEachBody: ContextExtension<A, B>
): EnrichedContextExtension<A, B & A> => {
    const contextExtension = test => (deps) => {
        let testCalled = false;
        const test2 = (deps2) => {
            test({ ...deps, ...deps2 });
            testCalled = true;
        };
        aroundEachBody(test2)(deps);
        if (!testCalled) 
      throw new Error("Did you forget to call test in aroundEach?");
    
    };
    return new EnrichedContextExtension(contextExtension);
};

interface TestRunnerI<A: {}> {
  it<B: {}>(
    description: string,
    ...rest: [Test<A>] | [ContextExtension<A, B>, Test<B>]
  ): void,
  describe<B: {}>(
    description: string,
    ...rest:
      | [(TestRunnerI<A>) => void]
      | [ContextExtension<A, B>, (TestRunnerI<B>) => void]
  ): void
}

type RunnerDeps = {
  it: Function,
  describe: Function
};

export class TestRunner<A: {}> implements TestRunnerI<A> {
  context: Context<A>;
  runner: RunnerDeps;

  constructor(runner: RunnerDeps, context: Context<A>) {
      this.runner = runner;
      this.context = context;
  }

  it<B: {}>(
      description: string,
      ...rest: [Test<A>] | [ContextExtension<A, B>, Test<B>]
  ): void {
      if (rest.length === 1) 
      return this._it0(description, ...(rest: any));
    
      if (rest.length === 2) 
      return this._it1(description, ...(rest: any));
    
      return undefined;
  }

  _it0(description: string, test: A => void) {
      this.runner.it(description, () => {
          this.context(test)({});
      });
  }

  _it1<B: {}>(
      description: string,
      contextExtension: ContextExtension<A, B>,
      test: Test<B>
  ) {
      this._extend(contextExtension)._it0(description, test);
  }

  describe<B: {}>(
      description: string,
      ...rest:
      | [(TestRunnerI<A>) => void]
      | [ContextExtension<A, B>, (TestRunnerI<B>) => void]
  ): void {
      if (rest.length === 1) 
      return this._describe0(description, ...(rest: any));
    
      if (rest.length === 2) 
      return this._describe1(description, ...(rest: any));
    
      return undefined;
  }

  _extend<B: {}>(contextExtension: ContextExtension<A, B>): TestRunner<B> {
      return new TestRunner(this.runner, test =>
          this.context(contextExtension(test)));
  }

  _describe0(description: string, continuation: (TestRunner<A>) => void) {
      this.runner.describe(description, () => continuation(this));
  }

  _describe1<B: {}>(
      description: string,
      contextExtension: ContextExtension<A, B>,
      continuation: (TestRunner<B>) => void
  ) {
      this._extend(contextExtension)._describe0(description, continuation);
  }
}

type InitialTestRunner = TestRunnerI<{}>;

export const t: InitialTestRunner = new TestRunner(
    { it: global.it, describe: global.describe },
    test => test
);
