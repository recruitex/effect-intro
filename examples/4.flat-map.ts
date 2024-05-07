import { Effect } from "effect";
import { Terminal } from "@effect/platform";
import { BunTerminal } from "@effect/platform-bun";

const program = Effect.gen(function* () {
  const terminal = yield* Terminal.Terminal;
  yield* terminal.display(
    "I have a number 12. What do you want it divided by? "
  );
  const input = yield* terminal.readLine;
  const parsed = Number(input);

  if (isNaN(parsed)) {
    yield* Effect.fail("Not a number!");
  }

  return parsed;
}).pipe(
  Effect.flatMap((num) => {
    if (num === 0) {
      return Effect.fail("Cannot divide by 0");
    }

    return Effect.succeed(12 / num);
  })
);

const runnable = program.pipe(Effect.provide(BunTerminal.layer));

Effect.runPromise(runnable).then(console.log).catch(console.info);
