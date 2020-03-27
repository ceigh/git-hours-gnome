// Imports
const St = imports.gi.St
const Gio = imports.gi.Gio
const GLib = imports.gi.GLib
const Main = imports.ui.main
const MainLoop = imports.mainloop

const Me = imports.misc.extensionUtils.getCurrentExtension()


// Vars
let settings, label, timer, home
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

function getInterval() {
  // temporary
  return 25 * 60.0
}

function update() {
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


// Exports
/* eslint-disable-next-line no-unused-vars */
function init() {
  settings = getSettings()
  label = new St.Label({ text: '0' })
  home = GLib.getenv('HOME')

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
