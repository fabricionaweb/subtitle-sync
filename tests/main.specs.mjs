import { test } from "uvu"
import * as assert from "uvu/assert"

import { SRT, ASS } from "./mock.mjs"
import { REGEX, FORMATS, pad, shift } from "../src/main.mjs"

test("REGEX capture the <start> and <end>", () => {
  assert.equal(Array.from(SRT.matchAll(REGEX)), [
    ["00:00:04,276 --> 00:00:05,736", "00:00:04,276", " --> ", "00:00:05,736"],
    ["00:00:05,820 --> 00:00:07,947", "00:00:05,820", " --> ", "00:00:07,947"],
  ])
  assert.equal(Array.from(ASS.matchAll(REGEX)), [
    ["0:00:25.48,0:00:29.73", "0:00:25.48", ",", "0:00:29.73"],
    ["0:00:45.42,0:00:49.42", "0:00:45.42", ",", "0:00:49.42"],
  ])
})

test("FORMATS srt and ass", () => {
  // SRT format
  assert.equal(FORMATS.srt({ h: 10, m: 2, s: 0, ms: 0 }), "10:02:00,000")
  assert.equal(FORMATS.srt({ h: 1, m: 2, s: 0, ms: 99 }), "01:02:00,099")
  assert.equal(FORMATS.srt({ h: 0, m: 50, s: 50, ms: 9 }), "00:50:50,009")
  // ASS format
  assert.equal(FORMATS.ass({ h: 10, m: 2, s: 0, ms: 0 }), "10:02:00.00")
  assert.equal(FORMATS.ass({ h: 1, m: 2, s: 0, ms: 99 }), "1:02:00.99")
  assert.equal(FORMATS.ass({ h: 0, m: 50, s: 50, ms: 9 }), "0:50:50.09")
})

test("pad() adds 0 before", () => {
  assert.equal(pad(0), "00")
  assert.equal(pad(1), "01")
  assert.equal(pad(10), "10")
  assert.equal(pad(100), "100")
})

test("shift() returns the shifted content", () => {
  assert.snapshot(
    shift(SRT, 1000),
    `\
      1
      00:00:05,276 --> 00:00:06,736
      <i>Anteriormente em</i> WandaVision...

      2
      00:00:06,820 --> 00:00:08,947
      Você atravessou o limite duas vezes já.`
  )
  assert.snapshot(
    shift(ASS, 1000),
    `\
      [Script Info]
      Title: [Erai-raws] Português (Brasil)
      ScriptType: v4.00+
      WrapStyle: 0
      PlayResX: 640
      PlayResY: 360

      [V4+ Styles]
      Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
      Style: OpeningPT,Trebuchet MS,22,&H00FFFFFF,&H000000FF,&H00683D1B,&H00381B0D,-1,0,0,0,100,100,0,0,1,3,1,2,0040,0040,0015,1
      Style: OpeningJP,Trebuchet MS,22,&H00FFFFFF,&H000000FF,&H001B399D,&H0013267C,-1,-1,0,0,100,100,0,0,1,3,1,8,0040,0040,0015,1

      [Events]
      Format: Layer, Start, End, Style, Actor, MarginL, MarginR, MarginV, Effect, Text
      Dialogue: 0,0:00:26.48,0:00:30.73,OpeningJP,,0000,0000,0000,,itsuka togireta
      Dialogue: 0,0:00:46.42,0:00:50.42,OpeningPT,,0000,0000,0000,,Começa uma nova fase`
  )
})

test.run()
