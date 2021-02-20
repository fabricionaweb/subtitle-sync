import { fromMs, toMs } from "./time.mjs"

export const pad = (str, pad = "00") => (pad + str).slice(pad.length * -1)
export const REGEX = /(\d+:\d+:\d+[\.,]\d+)(,| --> )(\d+:\d+:\d+[\.,]\d+)/gm
export const FORMATS = {
  srt: ({ h, m, s, ms }) => `${pad(h)}:${pad(m)}:${pad(s)},${ms}`,
  ass: ({ h, m, s, ms }) => `${h}:${pad(m)}:${pad(s)}.${`${ms}`.substring(0, 2)}`,
}

export const shift = (content, ms) => {
  const sum = key => time => FORMATS[key](fromMs(toMs(time) + ms))

  return content.replace(REGEX, (_, start, spacer, end) => {
    const format = sum(spacer.includes("-->") ? "srt" : "ass")
    return format(start) + spacer + format(end)
  })
}

export const download = (blob, fileName) => {
  const href = URL.createObjectURL(blob)

  const $anchor = document.querySelector("[data-download]")
  $anchor.setAttribute("download", fileName)
  $anchor.setAttribute("href", href)
  $anchor.dispatchEvent(new MouseEvent("click"))

  URL.revokeObjectURL(href)
}
