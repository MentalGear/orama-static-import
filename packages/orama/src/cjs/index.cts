// import type { create as esmCreate } from '../methods/create.js'
// import type { count as esmCount, getByID as esmGetByID } from '../methods/docs.js'
// import type { insert as esmInsert, insertMultiple as esminsertMultiple } from '../methods/insert.js'
// import type { remove as esmRemove, removeMultiple as esmRemoveMultiple } from '../methods/remove.js'
// import type { search as esmSearch } from '../methods/search.js'
// import type { searchVector as esmSearchVector } from '../methods/search-vector.js'
// import type { load as esmLoad, save as esmSave } from '../methods/serialization.js'
// import type { update as esmUpdate, updateMultiple as esmUpdateMultiple } from '../methods/update.js'

// let _esmCount: typeof esmCount
// let _esmCreate: typeof esmCreate
// let _esmGetByID: typeof esmGetByID
// let _esmInsert: typeof esmInsert
// let _esmInsertMultiple: typeof esminsertMultiple
// let _esmLoad: typeof esmLoad
// let _esmRemove: typeof esmRemove
// let _esmRemoveMultiple: typeof esmRemoveMultiple
// let _esmSave: typeof esmSave
// let _esmSearch: typeof esmSearch
// let _esmUpdate: typeof esmUpdate
// let _esmUpdateMultiple: typeof esmUpdateMultiple
// let _esmSearchVector: typeof esmSearchVector

import  { create as esmCreate } from '../methods/create.js'
import  { count as esmCount, getByID as esmGetByID } from '../methods/docs.js'
import  { insert as esmInsert, insertMultiple as esminsertMultiple } from '../methods/insert.js'
import  { remove as esmRemove, removeMultiple as esmRemoveMultiple } from '../methods/remove.js'
import  { search as esmSearch } from '../methods/search.js'
import  { searchVector as esmSearchVector } from '../methods/search-vector.js'
import  { load as esmLoad, save as esmSave } from '../methods/serialization.js'
import  { update as esmUpdate, updateMultiple as esmUpdateMultiple } from '../methods/update.js'

let _esmCount = esmCount
let _esmCreate = esmCreate
let _esmGetByID = esmGetByID
let _esmInsert = esmInsert
let _esmInsertMultiple = esminsertMultiple
let _esmLoad = esmLoad
let _esmRemove = esmRemove
let _esmRemoveMultiple = esmRemoveMultiple
let _esmSave = esmSave
let _esmSearch = esmSearch
let _esmUpdate = esmUpdate
let _esmUpdateMultiple = esmUpdateMultiple
let _esmSearchVector = esmSearchVector

export async function count(...args: Parameters<typeof esmCount>): ReturnType<typeof esmCount> {
  if (!_esmCount) {
    const imported = await import('../methods/docs.js')
    _esmCount = imported.count
  }

  return _esmCount(...args)
}

export async function create(...args: Parameters<typeof esmCreate>): ReturnType<typeof esmCreate> {
  if (!_esmCreate) {
    const imported = await import('../methods/create.js')
    _esmCreate = imported.create
  }

  return _esmCreate(...args)
}

export async function getByID(...args: Parameters<typeof esmGetByID>): ReturnType<typeof esmGetByID> {
  if (!_esmGetByID) {
    const imported = await import('../methods/docs.js')
    _esmGetByID = imported.getByID
  }

  return _esmGetByID(...args)
}

export async function insert(...args: Parameters<typeof esmInsert>): ReturnType<typeof esmInsert> {
  if (!_esmInsert) {
    const imported = await import('../methods/insert.js')
    _esmInsert = imported.insert
  }

  return _esmInsert(...args)
}

export async function insertMultiple(
  ...args: Parameters<typeof esminsertMultiple>
): ReturnType<typeof esminsertMultiple> {
  if (!_esmInsertMultiple) {
    const imported = await import('../methods/insert.js')
    _esmInsertMultiple = imported.insertMultiple
  }

  return _esmInsertMultiple(...args)
}

export async function load(...args: Parameters<typeof esmLoad>): ReturnType<typeof esmLoad> {
  if (!_esmLoad) {
    const imported = await import('../methods/serialization.js')
    _esmLoad = imported.load
  }

  return _esmLoad(...args)
}

export async function remove(...args: Parameters<typeof esmRemove>): ReturnType<typeof esmRemove> {
  if (!_esmRemove) {
    const imported = await import('../methods/remove.js')
    _esmRemove = imported.remove
  }

  return _esmRemove(...args)
}

export async function removeMultiple(
  ...args: Parameters<typeof esmRemoveMultiple>
): ReturnType<typeof esmRemoveMultiple> {
  if (!_esmRemoveMultiple) {
    const imported = await import('../methods/remove.js')
    _esmRemoveMultiple = imported.removeMultiple
  }

  return _esmRemoveMultiple(...args)
}

export async function save(...args: Parameters<typeof esmSave>): ReturnType<typeof esmSave> {
  if (!_esmSave) {
    const imported = await import('../methods/serialization.js')
    _esmSave = imported.save
  }

  return _esmSave(...args)
}

export async function search(...args: Parameters<typeof esmSearch>): ReturnType<typeof esmSearch> {
  if (!_esmSearch) {
    const imported = await import('../methods/search.js')
    _esmSearch = imported.search
  }

  return _esmSearch(...args)
}

export async function update(...args: Parameters<typeof esmUpdate>): ReturnType<typeof esmUpdate> {
  if (!_esmUpdate) {
    const imported = await import('../methods/update.js')
    _esmUpdate = imported.update
  }

  return _esmUpdate(...args)
}

export async function updateMultiple(
  ...args: Parameters<typeof esmUpdateMultiple>
): ReturnType<typeof esmUpdateMultiple> {
  if (!_esmUpdateMultiple) {
    const imported = await import('../methods/update.js')
    _esmUpdateMultiple = imported.updateMultiple
  }

  return _esmUpdateMultiple(...args)
}

export async function searchVector(
  ...args: Parameters<typeof esmSearchVector>
): ReturnType<typeof esmSearchVector> {
  if (!_esmSearchVector) {
    const imported = await import('../methods/search-vector.js')
    _esmSearchVector = imported.searchVector
  }

  return _esmSearchVector(...args)
}

export * as components from './components/defaults.cjs'
export * as internals from './internals.cjs'
