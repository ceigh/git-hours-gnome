/* global imports */

const Main = imports.ui.main
const { St } = imports.gi.St

let label

// eslint-disable-next-line no-unused-vars
function init () {
  label = new St.Label({
    style_class: 'label',
    text: 'starting...'
  })
}

// eslint-disable-next-line no-unused-vars
function enable () {
  Main.panel._rightBox.insert_child_at_index(label, 1)
}

// eslint-disable-next-line no-unused-vars
function disable () {
  Main.panel._rightBox.remove_child(label)
}
