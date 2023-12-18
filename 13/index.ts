import { Expect, Equal } from "type-testing";

// Only work for specific test:
// type DayCounter<Start, Stop, Counter extends 1[] = [1, 1]> = Start extends Stop
//  ? Start
//  : Start | DayCounter<Counter["length"], Stop, [1, ...Counter]>;

// Thanks to https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f
// Another great article: https://konstantinlebedev.com/typescript-advanced-esoteric/
// Copy paste BuildTuple and Add tuple
type BuildTuple<
  Length extends number,
  Tuple extends number[] = []
> = Tuple["length"] extends Length ? Tuple : BuildTuple<Length, [...Tuple, 0]>;

type Add<A extends number, B extends number> = [
  ...BuildTuple<A>,
  ...BuildTuple<B>
]["length"] &
  number;

type DayCounter<Start extends number, End extends number> = Start extends End
  ? End
  : Start | DayCounter<Add<Start, 1>, End>;

type TwelveDaysOfChristmas = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type test_0_actual = DayCounter<1, 12>;
//   ^?
type test_0_expected = TwelveDaysOfChristmas;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type DaysUntilChristmas =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;
type test_1_actual = DayCounter<1, 25>;
//   ^?
type test_1_expected = DaysUntilChristmas;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;
