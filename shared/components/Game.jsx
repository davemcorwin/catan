import React, { Component }   from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import socketClient           from 'socket.io-client'

import * as GameActions from 'actions/GameActions'
import PendingGame      from './PendingGame'
import ActiveGame       from './ActiveGame'
import EndedGame        from './EndedGame'
import FourOhFour       from './FourOhFour'

export class Game extends Component {

  static propTypes = {
    game:    React.PropTypes.object,
    actions: React.PropTypes.object
  };

  joinGame(e) {
    e.preventDefault()

    const { actions, game } = this.props,
          { name }          = this.refs

    actions.joinGame(game.code,name.value)
    name.value = ''
  }

  componentDidMount() {

    const { actions, game } = this.props

    socketClient()
      .on(game.code, game => actions.updateGame(game))
  }

  render() {

    const { actions, game } = this.props

    switch(game.state) {
      case 'pending':
        return <PendingGame actions={actions} game={game} />
      case 'active':
        return <ActiveGame actions={actions} game={game} />
      case 'ended':
        return <EndedGame actions={actions} game={game} />
      default:
        return <FourOhFour />
    }
  }
}

function mapStateToProps(state) {
  return { game: state.game }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(GameActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
