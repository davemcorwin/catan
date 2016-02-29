import React, { Component }   from 'react'
import { bindActionCreators } from 'redux'
import * as GameActions       from 'actions/GameActions'

export default class ActiveGame extends Component {

  static propTypes = {
    game:    React.PropTypes.object,
    actions: React.PropTypes.object
  };

  render() {

    const { game } = this.props

    return (
      <h1>Active</h1>
    )
  }
}
