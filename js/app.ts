import View from './view.js'
import Store from './store.js'

const players = [
  {
    id: 1,
    name: 'Player 1',
    iconClass: 'fa-x',
    colorClass: 'turquoise',
  },
  {
    id: 2,
    name: 'Player 2',
    iconClass: 'fa-o',
    colorClass: 'yellow',
  }
]

function init() {
  const view = new View()
  const store = new Store('live-t3-storage-key', players)

  // Current tab state changes
  store.addEventListener('statechange', () => {
    view.render(store.game, store.stats)
  })

  // A different tab state changes
  window.addEventListener('storage', () => {
    view.render(store.game, store.stats)
  })

  // The first load of the document
  view.render(store.game, store.stats)

  view.bindGameResetEvent(() => {
    store.reset()
  })

  view.bindNewRoundEvent(() => {
    store.newRound()
  })

  view.bindPlayerMoveEvent(square => {
    const existingMove = store.game.moves.some(move => move.squareId === +square.id)

    if (existingMove) { return }

    // Advance to the next state by 
    store.playerMove(+square.id)
  })

}

window.addEventListener('load', init)
