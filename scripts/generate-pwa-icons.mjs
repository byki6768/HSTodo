import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const publicDir = join(root, '../public')

const TEAL = [15, 118, 110, 255]
const WHITE = [255, 255, 255, 255]

function crc32(buffer) {
  let crc = ~0
  for (const byte of buffer) {
    crc ^= byte
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1))
    }
  }
  return ~crc >>> 0
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type)
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])))
  return Buffer.concat([length, typeBuffer, data, crc])
}

function distanceToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1
  const dy = y2 - y1
  const length = dx * dx + dy * dy
  if (length === 0) return Math.hypot(px - x1, py - y1)
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / length))
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))
}

function writePng(fileName, size) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8
  ihdr[9] = 6

  const stroke = size * 0.07
  const p1 = [size * 0.28, size * 0.52]
  const p2 = [size * 0.43, size * 0.68]
  const p3 = [size * 0.74, size * 0.34]
  const raw = Buffer.alloc((size * 4 + 1) * size)

  for (let y = 0; y < size; y += 1) {
    const row = y * (size * 4 + 1)
    raw[row] = 0
    for (let x = 0; x < size; x += 1) {
      const onCheck =
        distanceToSegment(x, y, p1[0], p1[1], p2[0], p2[1]) <= stroke ||
        distanceToSegment(x, y, p2[0], p2[1], p3[0], p3[1]) <= stroke
      const color = onCheck ? WHITE : TEAL
      const index = row + 1 + x * 4
      raw[index] = color[0]
      raw[index + 1] = color[1]
      raw[index + 2] = color[2]
      raw[index + 3] = color[3]
    }
  }

  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])

  writeFileSync(join(publicDir, fileName), png)
}

writePng('pwa-192x192.png', 192)
writePng('pwa-512x512.png', 512)
writePng('apple-touch-icon.png', 180)
