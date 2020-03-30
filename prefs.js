// Imports
const Me = imports.misc.extensionUtils.getCurrentExtension()
imports.searchPath.unshift(Me.path)

const Gtk = imports.gi.Gtk
const {
  getSettings,
  getPath, getEmail, getInterval
} = imports.helpers


// Vars
let settings, settingsBox
let path


// Helpers
function addEntry({ placeholder, label, text = '' }) {
  const entryBox = new Gtk.VBox({ border_width: 10 })
  const entryLabel = new Gtk.Label({
    label: `<b>${label}</b>`,
    use_markup: true,
    xalign: 0
  })
  const entry = new Gtk.Entry({
    placeholder_text: placeholder,
    text
  })

  entryBox.pack_start(entryLabel, false, false, 10)
  entryBox.pack_end(entry, false, false, 0)
  settingsBox.pack_start(entryBox, true, false, 0)
}


// Exports
/* eslint-disable-next-line no-unused-vars */
function init() {
  settings = getSettings()
  settingsBox = new Gtk.VBox({ border_width: 10 })
}

/* eslint-disable-next-line no-unused-vars */
function buildPrefsWidget() {
  try { path = getPath() } catch { path = '' }

  addEntry({
    placeholder: '/home/user/work/repository',
    label: 'Absolute path to local git repository',
    text: path
  })
  addEntry({
    placeholder: 'example@example.com',
    label: 'Your git email',
    text: getEmail()
  })
  addEntry({
    placeholder: '30',
    label: 'Interval between checks (in minutes)',
    text: getInterval().toString()
  })

  settingsBox.show_all()
  return settingsBox
}
