import { test } from "uvu"
import * as assert from "uvu/assert"

import * as mock from "./mock.mjs"
import * as main from "../src/main.mjs"

test("REGEX should capture the match groups", () => {
  const { REGEX } = main
  const { SRT, ASS } = mock

  assert.equal(
    [...SRT.matchAll(REGEX)],
    [
      ["00:00:04,276 --> 00:00:05,736", "00:00:04,276", " --> ", "00:00:05,736"],
      ["00:00:05,820 --> 00:00:07,947", "00:00:05,820", " --> ", "00:00:07,947"],
    ]
  )
  assert.equal(
    [...ASS.matchAll(REGEX)],
    [
      ["0:00:25.48,0:00:29.73", "0:00:25.48", ",", "0:00:29.73"],
      ["0:00:45.42,0:00:49.42", "0:00:45.42", ",", "0:00:49.42"],
    ]
  )
})

test.run()
