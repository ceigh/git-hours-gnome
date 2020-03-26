// Imports
const St = imports.gi.St
const GLib = imports.gi.GLib
const Main = imports.ui.main
const MainLoop = imports.mainloop

let label, timer


// Defaults
const home = GLib.getenv('HOME')
const interval = getInterval()
const path = getPath()
const email = getEmail()


// Helpers
// since runtime didnt convert `out` to string
function toString(byteArray) {
  return String.fromCharCode
    .apply(null, byteArray).replace('\n', '')
}

function getInterval() {
  // temporary
  return 25 // minutes
}

function getPath() {
  // temporary
  return `${home}/.local/share/gnome-shell/extensions/git-hours@ceigh`
}

function getEmail() {
  const [res, out] = GLib.spawn_command_line_sync('git config user.email')
  if (!res) return

  const email = toString(out)
  // log(`User email: ${email}.`)
  return email
}

function getHours() {
  const command = `docker run --rm -v ${path}:/code zaherg/git-hours`
  const [res, out] = GLib.spawn_command_line_sync(command)
  if (!res) return

  const total = toString(out)
  // log(`Total: ${total}.`)
  const totalObj = JSON.parse(total)

  const user = totalObj[email]
  label.set_text(user.hours.toString())

  return true // for timer
}


// Core
/* eslint-disable-next-line no-unused-vars */
function init() {
  label = new St.Label({ text: '...' })
  getHours()
}

/* eslint-disable-next-line no-unused-vars */
function enable() {
  Main.panel._rightBox.insert_child_at_index(label, 1)
  timer = MainLoop.timeout_add_seconds(60.0 * interval, getHours)
}

/* eslint-disable-next-line no-unused-vars */
function disable() {
  Main.panel._rightBox.remove_child(label)
  MainLoop.source_remove(timer)
}
