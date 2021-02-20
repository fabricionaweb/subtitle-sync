import { toMs, fromMs } from "../web_modules/hh-mm-ss.mjs"

export const REGEX = /(\d+:\d+:\d+[\.,]\d+)(?:,| --> )(\d+:\d+:\d+[\.,]\d+)/gm
const FORMAT = "h:mm:ss.ss"

export const sum = (str, ms) => fromMs(toMs(str, FORMAT) + ms, FORMAT)
export const shift = (content, ms) =>
  content.replace(REGEX, (_, start, end) => `${sum(start, ms)},${sum(end, ms)}`)

export const download = (blob, fileName) => {
  const href = URL.createObjectURL(blob)

  const $anchor = document.querySelector("[data-download]")
  $anchor.setAttribute("download", fileName)
  $anchor.setAttribute("href", href)
  $anchor.dispatchEvent(new MouseEvent("click"))

  URL.revokeObjectURL(href)
}
