import React, { Component }   from 'react'
import { bindActionCreators } from 'redux'
import * as GameActions       from 'actions/GameActions'

export default class EndedGame extends Component {

  static propTypes = {
    game:    React.PropTypes.object,
    actions: React.PropTypes.object
  };

  render() {

    const { game } = this.props

    return (
      <h1>Ended</h1>
    )
  }
}
