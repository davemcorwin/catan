import React              from 'react'
import { renderToString } from 'react-dom/server'
import { Provider }       from 'react-redux'
import express            from 'express'
import bodyParser         from 'body-parser'
import http               from 'http'
import socketIO           from 'socket.io'

import configureStore from './shared/utils/configureStore'
import App            from './shared/components/App'
import * as types     from './shared/constants/ActionTypes'

const
  database   = {},
  app        = express(),
  httpServer = http.createServer(app),
  io         = socketIO(httpServer),

  createGame = (name) => {
    const
      id   = Date.now(),
      code = id.toString(36),
      game = {
        id:      id.toString(),
        code:    code,
        players: [name],
        state:   'pending'
      }

    database[code] = game

    return game
  },

  fetchGame = (code) => database[code],

  joinGame = (code, name) => {
    const game = database[code]
    game.players = game.players.concat([name])
    io.emit(game.code, game)
  },

  endGame = (code) => {
    const game = database[code]
    game.state = 'ended'
    io.emit(game.code, game)
  },

  startGame = (code) => {
    const game = database[code]
    game.state = 'active'
    io.emit(game.code, game)
  }

app.use(bodyParser.json())

app.post('/api', (req,res) => {
  switch(req.body.type) {

    case types.CREATE_GAME:
      res.json({ game: createGame(req.body.name) })
      break

    case types.FETCH_GAME:
      res.json({ game: fetchGame(req.body.code) })
      break

    case types.JOIN_GAME:
      joinGame(req.body.code, req.body.name)
      res.json({ result: 'success' })
      break

    case types.END_GAME:
      endGame(req.body.code)
      res.json({ result: 'success' })
      break

    case types.START_GAME:
      startGame(req.body.code)
      res.json({ result: 'success' })
      break

    default:
      res.status(500).json({error: `Unknown action type ${req.body.type}`})
  }
})

app.get('/', (req, res) => {
  res.end(buildPage())
})

app.get('/:code', (req, res) => {
  res.end(buildPage(req.params.code))
})

const buildPage = (code) => {
  const
    initialState = code ? { game: database[code] } : {},
    store = configureStore(initialState),
    componentHTML = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    ),
    HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Settlers of Shvazztan!</title>
          <script type="application/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `
  return HTML
}

export default httpServer
