'use babel'

// either finds existing, or adds new
export function setRightPanel (workspace, domEl) {
  domEl.setAttribute('id', 'trinity-root'
  let panels = workspace.getRightPanels()
  if (panels.length === 0) return workspace.addRightPanel({ item: domEl })

  let panel
  for (panel of panels) {
    if (panel.item.id === 'trinity-root') break;
  }

  if (panel) {
    let parent = panel.item.parentNode
    parent.removeChild(panel.item)
    parent.appendChild(domEl)
    panel.item = domEl
  } else {
    workspace.addRightPanel({ item: domEl })
  }
}
