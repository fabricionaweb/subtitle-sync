import { toMs, fromMs } from "./web_modules/hh-mm-ss.mjs"

const REGEX = /^Dialogue:\s(\d+),(\d+:\d+:\d+\.\d+),(\d+:\d+:\d+\.\d+)/gm
const FORMAT = "h:mm:ss.ss"

document.addEventListener("DOMContentLoaded", function () {
  const [$source, $ms, $sync] = document.querySelector("[data-form]").elements
  const $anchor = document.querySelector("[data-download]")

  const download = (blob, fileName) => {
    const href = URL.createObjectURL(blob)

    $anchor.setAttribute("download", fileName)
    $anchor.setAttribute("href", href)
    $anchor.dispatchEvent(new MouseEvent("click"))

    URL.revokeObjectURL(href)
  }

  const sync = str => fromMs(toMs(str, FORMAT) + Number($ms.value), FORMAT)

  const onSyncClick = async () => {
    const { files = [] } = $source
    if (!files.length) return

    const zip = new JSZip()
    for (let file of files) {
      const content = await file.text()
      const synced = content.replaceAll(REGEX, (_, marked, start, end) => {
        return `Dialogue: ${marked},${sync(start)},${sync(end)}`
      })

      zip.file(file.name, synced)
    }

    const blob = await zip.generateAsync({ type: "blob" })
    download(blob, `Subs ${$ms.value}.zip`)
  }

  $sync.addEventListener("click", onSyncClick)
})
