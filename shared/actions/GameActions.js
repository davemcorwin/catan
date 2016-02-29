import page from 'page'

import * as types from '../constants/ActionTypes'

const boiler = (type, params) => {
  return fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, ...params })
  })
  .then(res => res.json()
    .then(json => {
      if (res.ok)
        return json
      else
        throw new Error(`Error: ${json.error}`)
    })
  )
  .catch(err => console.error(err.message))
}

export function createGame(name) {
  return dispatch =>
    boiler(types.CREATE_GAME, { name })
      .then(json => {
        dispatch(updateGame(json.game))
        page(`/${json.game.code}`)
      })
}

export function fetchGame(code) {
  return dispatch =>
    boiler(types.FETCH_GAME, { code })
      .then(json => {
        dispatch(updateGame(json.game))
        page(`/${json.game.code}`)
      })
}

export function joinGame(code, name) {
  return dispatch =>
    boiler(types.JOIN_GAME, { code, name })
}

export function startGame(code) {
  return dispatch =>
    boiler(types.START_GAME, { code })
}

export function endGame(code) {
  return dispatch =>
    boiler(types.END_GAME, { code })
}

export function updateGame(game) {
  return {
    type: types.UPDATE_GAME,
    game
  }
}
