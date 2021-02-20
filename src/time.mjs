const MS_HOURS = 3600000
const MS_MINUTES = 60000
const MS_SECONDS = 1000

export const REGEX = /^(\d+):(\d+):(\d+)[\.,](\d+)$/m

export const toMs = time => {
  let [_, h, m, s, ms] = time.match(REGEX)
  return h * MS_HOURS + m * MS_MINUTES + s * MS_SECONDS + Math.floor(`.${ms}` * MS_SECONDS)
}

export const fromMs = time => ({
  h: Math.floor(time / MS_HOURS),
  m: Math.floor((time % MS_HOURS) / MS_MINUTES),
  s: Math.floor((time % MS_MINUTES) / MS_SECONDS),
  ms: Math.floor(time % MS_SECONDS),
})
