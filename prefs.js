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
let path, email


// Helpers
function generateLabel(text) {
  return new Gtk.Label({
    label: `<b>${text}</b>`,
    use_markup: true,
    xalign: 0
  })
}

function addFileChooser() {
  const fileChooserBox = new Gtk.VBox({ border_width: 10 })
  const fileChooserLabel = generateLabel('Path to git repository')
  const fileChooser = new Gtk.FileChooserButton({
    title: 'Select git directory',
    action: 2
  })

  fileChooserBox.pack_start(fileChooserLabel, false, false, 10)
  fileChooserBox.pack_end(fileChooser, false, false, 0)
  settingsBox.pack_start(fileChooserBox, true, false, 0)
}


function addEntry({ placeholder, label, text = '' }) {
  const entryBox = new Gtk.VBox({ border_width: 10 })
  const entryLabel = generateLabel(label)
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
  try { email = getEmail() } catch { email = '' }

  addFileChooser()
  addEntry({
    placeholder: 'example@example.com',
    label: 'Your git email',
    text: email
  })
  addEntry({
    placeholder: '30',
    label: 'Interval between checks (in minutes)',
    text: getInterval().toString()
  })

  settingsBox.show_all()
  return settingsBox
}
