// Imports
const St = imports.gi.St
const Gio = imports.gi.Gio
const GLib = imports.gi.GLib
const Main = imports.ui.main
const MainLoop = imports.mainloop

const Me = imports.misc.extensionUtils.getCurrentExtension()


// Vars
let settings, label, timer
let path, email, interval


// Helpers
function getSettings() {
  const GioSSS = Gio.SettingsSchemaSource
  const schemaSource = GioSSS.new_from_directory(
    Me.dir.get_child('schemas').get_path(),
    GioSSS.get_default(),
    false
  )
  const id = 'org.gnome.shell.extensions.git-hours@ceigh'
  const schemaObj = schemaSource.lookup(id, true)
  if (!schemaObj) throw new Error(`Cannot find ${id} schema!`)
  return new Gio.Settings({ settings_schema: schemaObj })
}

// since runtime didnt convert `out` to string
function toString(byteArray) {
  return String.fromCharCode
    .apply(null, byteArray).replace('\n', '')
}

function getPath() {
  const path = settings.get_string('path')
  if (!path) {
    throw new Error('Set path to repository in preferences!')
  }
  // log(`Repository directory: ${path}.`)
  return path
}

function getEmail() {
  let email = settings.get_string('email')
  // log(`User email: ${email}.`)
  if (email) return email

  const [res, out, err, code] = GLib
    .spawn_command_line_sync('git config user.email')
  if (!res || code) {
    throw new Error(`Getting email: msg - "${err}", code - ${code}!`)
  }

  email = toString(out)
  // log(`User email: ${email}.`)
  return email
}

function getInterval() {
  const interval = 60.0 * (settings.get_int('interval') || 30)
  // log(`Interval: ${interval}.`)
  return interval
}

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
  settings = getSettings()
  label = new St.Label({ text: '0' })

  path = getPath()
  email = getEmail()
  interval = getInterval()
}

/* eslint-disable-next-line no-unused-vars */
function enable() {
  update()
  Main.panel._rightBox.insert_child_at_index(label, 0)
  timer = MainLoop.timeout_add_seconds(interval, update)
}

/* eslint-disable-next-line no-unused-vars */
function disable() {
  Main.panel._rightBox.remove_child(label)
  MainLoop.source_remove(timer)
}
