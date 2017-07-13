'use babel'

const ITEM_NAME = 'Trinity'

// either finds existing, or adds new
export function setRightPanel (workspace, domEl) {
  domEl.setAttribute('id', 'trinity-root') // <-- should be be moved one level up
  add(workspace, domEl)
}

function add (workspace, el) {
  return new Promise((resolve, reject) => {
    const { dispose } = workspace.onDidOpen((index, item, pane, uri) => {
      console.warn('OPEN FUCK HEAD')
      if (!item) return
      if (item.element !== el || item.getTitle !== ITEM_NAME) return
      dispose()
      resolve()
    })

    workspace.open({
      element: el,
      getTitle () { return ITEM_NAME },
      getDefaultLocation () { return 'right' }
    })
  })
}