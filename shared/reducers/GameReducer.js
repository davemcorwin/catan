import * as types from '../constants/ActionTypes'

const merge = (game, obj={}) =>
  Object.assign({}, game, obj)

export default function(game = {}, action) {
  switch(action.type) {

    case types.UPDATE_GAME:
      return action.game

    default:
      return game
  }
}
