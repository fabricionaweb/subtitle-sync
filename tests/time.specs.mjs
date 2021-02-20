import { test } from "uvu"
import * as assert from "uvu/assert"

import { REGEX, toMs, fromMs } from "../src/time.mjs"

test("REGEX capture the time format <h> <m> <s> <ms>", () => {
  // SRT format
  assert.equal(Array.from("00:00:04,276".match(REGEX)), ["00:00:04,276", "00", "00", "04", "276"])
  // ASS format
  assert.equal(Array.from("0:00:25.48".match(REGEX)), ["0:00:25.48", "0", "00", "25", "48"])
})

test("toMs() returns the miliseconds", () => {
  // SRT format
  assert.equal(toMs("00:00:29,730"), 29730)
  assert.equal(toMs("00:00:00,999"), 999)
  // ASS format
  assert.equal(toMs("0:00:29.73"), 29730)
  assert.equal(toMs("0:00:00.99"), 990)
})

test("fromMs() returns an object with { h, m, s, ms }", () => {
  assert.equal(fromMs(29730), { h: 0, m: 0, s: 29, ms: 730 })
  assert.equal(fromMs(1000), { h: 0, m: 0, s: 1, ms: 0 })

  assert.equal(fromMs(63730), { h: 0, m: 1, s: 3, ms: 730 })
  assert.equal(fromMs(99), { h: 0, m: 0, s: 0, ms: 99 })
})

test.run()
