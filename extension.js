/* global imports */
const St = imports.gi.St
const Main = imports.ui.main
const MainLoop = imports.mainloop
const GLib = imports.gi.GLib
let label, timer

// Defaults
// TODO: configuration
const env = getEnv()
const path = `${env.HOME}/.local/share/gnome-shell/extensions/git-hours@ceigh`
const email = getEmail()
const interval = 25

function call (command) {
  const [, out] = GLib.spawn_command_line_sync(command)
  return out.toString()
}

function getEnv () {
  const lines = call('env').split('\n')
  const entries = lines.map(l => l.split('='))
  return Object.fromEntries(entries)
}

function getEmail () {
  // eslint-disable-next-line no-useless-escape
  const cfg = call(`cat ${env.HOME}/.gitconfig`)
  return cfg.split('\n')[1].split(' ')[2]
}

async function getHours () {
  const total = call(`docker run --rm -v ${path}:/code zaherg/git-hours`)
  label.set_text(JSON.parse(total)[email].hours.toString())
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
