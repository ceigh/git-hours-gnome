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

  let path
  try { path = getPath() } catch { path = '' }

  const fileChooser = new Gtk.FileChooserButton({
    title: 'Select git directory',
    action: 2,
    select_multiple: false
  })
  fileChooser.set_current_folder(path || '/home')

  fileChooserBox.pack_start(fileChooserLabel, false, false, 10)
  fileChooserBox.pack_end(fileChooser, false, false, 0)
  settingsBox.pack_start(fileChooserBox, true, false, 0)
}

function addEntry() {
  const entryBox = new Gtk.VBox({ border_width: 10 })
  const entryLabel = generateLabel('Your git email')

  let email
  try { email = getEmail() } catch { email = '' }

  const entry = new Gtk.Entry({
    placeholder_text: 'example@example.com',
    text: email
  })

  entryBox.pack_start(entryLabel, false, false, 10)
  entryBox.pack_end(entry, false, false, 0)
  settingsBox.pack_start(entryBox, true, false, 0)
}

function addRange() {
  const rangeBox = new Gtk.VBox({ border_width: 10 })
  const rangeLabel = generateLabel('Interval between checks (in minutes)')
  const range = Gtk.Scale.new_with_range(0, 5, 120, 5)
  range.set_value(getInterval())

  rangeBox.pack_start(rangeLabel, false, false, 10)
  rangeBox.pack_end(range, false, false, 10)
  settingsBox.pack_start(rangeBox, true, false, 0)
}


// Exports
/* eslint-disable-next-line no-unused-vars */
function init() {
  settings = getSettings()
  settingsBox = new Gtk.VBox({ border_width: 10 })
}

/* eslint-disable-next-line no-unused-vars */
function buildPrefsWidget() {
  addFileChooser()
  addEntry()
  addRange()
  settingsBox.show_all()
  return settingsBox
}
