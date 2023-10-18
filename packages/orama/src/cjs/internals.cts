import {
  boundedLevenshtein as esmBoundedLevenshtein,
  formatBytes as esmFormatBytes,
  formatNanoseconds as esmFormatNanoseconds,
  getNanosecondsTime as esmGetNanosecondsTime,
  uniqueId as esmUniqueId,
} from '../internals.js'

let _esmBoundedLevenshtein = esmBoundedLevenshtein
let _esmFormatBytes = esmFormatBytes
let _esmFormatNanoseconds = esmFormatNanoseconds
let _esmGetNanosecondsTime = esmGetNanosecondsTime
let _esmUniqueId = esmUniqueId

export async function boundedLevenshtein(
  ...args: Parameters<typeof esmBoundedLevenshtein>
): ReturnType<typeof esmBoundedLevenshtein> {
  if (!_esmBoundedLevenshtein) {
    const imported = await import('../internals.js')
    _esmBoundedLevenshtein = imported.boundedLevenshtein
  }

  return _esmBoundedLevenshtein(...args)
}

export async function formatBytes(...args: Parameters<typeof esmFormatBytes>): ReturnType<typeof esmFormatBytes> {
  if (!_esmFormatBytes) {
    const imported = await import('../internals.js')
    _esmFormatBytes = imported.formatBytes
  }

  return _esmFormatBytes(...args)
}

export async function formatNanoseconds(
  ...args: Parameters<typeof esmFormatNanoseconds>
): ReturnType<typeof esmFormatNanoseconds> {
  if (!_esmFormatNanoseconds) {
    const imported = await import('../internals.js')
    _esmFormatNanoseconds = imported.formatNanoseconds
  }

  return _esmFormatNanoseconds(...args)
}

export async function getNanosecondsTime(
  ...args: Parameters<typeof esmGetNanosecondsTime>
): ReturnType<typeof esmGetNanosecondsTime> {
  if (!_esmGetNanosecondsTime) {
    const imported = await import('../internals.js')
    _esmGetNanosecondsTime = imported.getNanosecondsTime
  }

  return _esmGetNanosecondsTime(...args)
}

export async function uniqueId(...args: Parameters<typeof esmUniqueId>): ReturnType<typeof esmUniqueId> {
  if (!_esmUniqueId) {
    const imported = await import('../internals.js')
    _esmUniqueId = imported.uniqueId
  }

  return _esmUniqueId(...args)
}
