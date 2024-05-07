import { Duration, Effect } from "effect";

export class MyCustomError extends Error {
  readonly _tag = "MyCustomError";
}

export class MyCustomError2 extends Error {
  readonly _tag = "MyCustomError2";
}

const failed = Effect.fail(
  Math.random() > 0.5
    ? new MyCustomError("Something went wrong!")
    : new MyCustomError2("Blah, blah!")
);
const fixed = failed.pipe(
  Effect.catchTag("MyCustomError2", (e) => Effect.succeed(e.message)),
  Effect.catchAll((e) => Effect.succeed(e.message + " - catch all"))
);

const failedResult = Effect.runSyncExit(failed);
console.log(failedResult);
console.log("-----------");
const fixedResult = Effect.runSync(fixed);
console.log(fixedResult);
