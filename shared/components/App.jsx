import React from 'react'
import page  from 'page'

import Home from './Home'
import Game from './Game'
import FourOhFour from './FourOhFour'

export default class App extends React.Component {

  constructor() {
    super()
    this.state = { component: <div /> }
  }

  componentDidMount() {

    page('/', ctx =>
      this.setState({ component: <Home /> })
    )

    page('/:code', ctx =>
      this.setState({ component: <Game /> })
    )

    page('*', ctx =>
      this.setState({ component: <FourOhFour /> })
    )

    page.start()
  }

  render() {
    return this.state.component
  }
}
