import React, { Component }   from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import * as GameActions       from 'actions/GameActions'

export class Home extends Component {

  static propTypes = {
    actions: React.PropTypes.object
  };

  createGame(e) {
    e.preventDefault()
    this.props.actions.createGame(this.refs.name.value)
  }

  fetchGame(e) {
    e.preventDefault()
    this.props.actions.fetchGame(this.refs.code.value)
  }

  render() {

    const { actions } = this.props

    return (
      <div>
        <h1>Welcome to Settlers of Shvazztan!!!</h1>
        <h2>Create a new game</h2>
        <form onSubmit={::this.createGame}>
          <input name="name" type="text" ref="name"/>
        </form>
        <h2>Join an existing game</h2>
        <form onSubmit={::this.fetchGame}>
          <input name="code" type="text" ref="code"/>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(GameActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
