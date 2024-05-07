import { Effect } from "effect";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";

const helloWorld = of("Hello World!");

helloWorld
  .pipe(
    map((hello) => hello.length),
    map((hello) => hello + 10),
    map((result) => {
      throw new Error("xD");
    }),
    catchError((error) => of(error.message))
  )
  .subscribe(console.log);

const helloWorldEffect = Effect.succeed("Hello World!");

class MyError extends Error {
  readonly _tag = "MyError";
  context = "Context";
}

const program = helloWorldEffect.pipe(
  Effect.map((hello) => hello.length),
  Effect.map((hello) => hello + 10),
  Effect.tryMap({
    try(result) {
      throw new Error("xD");
    },
    catch(error) {
      // Effect correctly assumes error type as unknown, but to make it more aligned with RxJS example I force it here to treat as Error
      return new MyError((error as Error).message);
    },
  })
);

const result = Effect.runSync(program);

console.log(result);
