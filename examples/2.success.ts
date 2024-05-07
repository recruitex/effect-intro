import { Effect } from "effect";

const helloWorld = Effect.succeed("Hello World!");
const helloLength = helloWorld.pipe(Effect.map((hello) => hello.length));
const helloLengthPlus10 = helloLength.pipe(Effect.map((hello) => hello + 10));

const result = Effect.runSync(helloLengthPlus10);

console.log(result);

// A bit more tightly

// const program = Effect.succeed("Hello World!").pipe(
//   Effect.map((hello) => hello.length),
//   Effect.map((hello) => hello + 10),
// );

// const result2 = Effect.runSync(program);

// console.log(result2);

// With frightening generators

// const program = Effect.gen(function* () {
//   const helloWorld = yield* Effect.succeed("Hello World!");
//   const helloLength = helloWorld.length;
//   const helloLengthPlus10 = helloLength + 10;

//   return helloLengthPlus10;
// });

// const result3 = Effect.runSync(program);

// console.log(result3);
