// Imports
const Gio = imports.gi.Gio
const GLib = imports.gi.GLib
const Me = imports.misc.extensionUtils.getCurrentExtension()


// Vars
const settings = getSettings()


// Exports
/* eslint-disable-next-line no-unused-vars */
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
/* eslint-disable-next-line no-unused-vars */
function toString(byteArray) {
  return String.fromCharCode
    .apply(null, byteArray).replace('\n', '')
}

/* eslint-disable-next-line no-unused-vars */
function getPath() {
  const path = settings.get_string('path')
  if (!path) {
    throw new Error('Set path to repository in preferences!')
  }
  // log(`Repository directory: ${path}.`)
  return path
}

/* eslint-disable-next-line no-unused-vars */
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

/* eslint-disable-next-line no-unused-vars */
function getInterval() {
  const interval = settings.get_int('interval') || 30
  // log(`Interval: ${interval}.`)
  return interval
}
