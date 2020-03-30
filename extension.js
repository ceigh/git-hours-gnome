// Imports
const Me = imports.misc.extensionUtils.getCurrentExtension()
imports.searchPath.unshift(Me.path)

const St = imports.gi.St
const GLib = imports.gi.GLib
const Main = imports.ui.main
const MainLoop = imports.mainloop

const {
  toString,
  getPath, getEmail, getInterval
} = imports.helpers


// Vars
let label, timer
let path, email, interval


// Core
function update() {
  const command = `docker run --rm -v ${path}:/code zaherg/git-hours`
  const [res, out, err, code] = GLib.spawn_command_line_sync(command)
  if (!res || code) {
    throw new Error(`Update hours: msg - "${err}", code - ${code}!`)
  }

  const total = toString(out)
  // log(`Total: ${total}.`)
  const totalObj = JSON.parse(total)

  if (!Object.prototype.hasOwnProperty.call(totalObj, email)) {
    throw new Error(`User ${email} didn't commit to the repository!`)
  }

  const user = totalObj[email]
  label.set_text(user.hours.toString())

  return true // for timer
}


// Exports
/* eslint-disable-next-line no-unused-vars */
function init() {
  label = new St.Label({ text: '0' })

  path = getPath()
  email = getEmail()
  interval = getInterval()
}

/* eslint-disable-next-line no-unused-vars */
function enable() {
  update()
  Main.panel._rightBox.insert_child_at_index(label, 0)
  timer = MainLoop.timeout_add_seconds(60.0 * interval, update)
}

/* eslint-disable-next-line no-unused-vars */
function disable() {
  Main.panel._rightBox.remove_child(label)
  MainLoop.source_remove(timer)
}
