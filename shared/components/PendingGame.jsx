import React, { Component }   from 'react'
import { bindActionCreators } from 'redux'
import * as GameActions       from 'actions/GameActions'

export default class PendingGame extends Component {

  static propTypes = {
    game:    React.PropTypes.object,
    actions: React.PropTypes.object
  };

  joinGame(e) {
    e.preventDefault()

    const { actions, game } = this.props,
          { name }          = this.refs

    actions.joinGame(game.code, name.value)
    name.value = ''
  }

  startGame(e) {
    e.preventDefault()

    const { actions, game } = this.props

    actions.startGame(game.code)
  }

  render() {

    const { game } = this.props

    return (
      <div>
        <h1>Waiting for more players</h1>
        { game.players.length <= 3 ?
          <div>

            <h3>Join:</h3>
            <form onSubmit={::this.joinGame}>
              <input name="name" type="text" ref="name"/>
            </form>
          </div>
          :
          <h2>You're all set to <a href="#" onClick={::this.startGame}>Start the game!</a></h2>
        }

        <h3>Players:</h3>
        <ol>
          { game.players.map(player => <li key={player}>{player}</li>) }
        </ol>

        { game.players.length === 3 ?
          <a href="#" onClick={::this.startGame}>Start Game</a> : null
        }
      </div>
    )
  }
}
