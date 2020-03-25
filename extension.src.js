/* global imports */
const St = imports.gi.St
const Main = imports.ui.main
const MainLoop = imports.mainloop
const GLib = imports.gi.GLib
let label, timer

// Default params
const path = '/home/ceigh/.local/share/gnome-shell/extensions/git-hours@ceigh' // absolute
const email = 'ceigh@pm.me'
const mask = '%s' // with %s
const interval = 5 // minutes

async function getHours () {
  const command = `docker run --rm -v ${path}:/code zaherg/git-hours`
  const [, out] = GLib.spawn_command_line_sync(command)
  const { hours } = JSON.parse(out)[email]
  label.set_text(mask.replace('%s', hours).trim())
  return true
}

// eslint-disable-next-line no-unused-vars
function init () {
  label = new St.Label({
    text: ''
  })
  getHours()
}

// eslint-disable-next-line no-unused-vars
function enable () {
  Main.panel._rightBox.insert_child_at_index(label, 1)
  timer = MainLoop.timeout_add_seconds(60.0 * interval, getHours)
}

// eslint-disable-next-line no-unused-vars
function disable () {
  Main.panel._rightBox.remove_child(label)
  MainLoop.source_remove(timer)
}
