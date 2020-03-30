// Imports
const Me = imports.misc.extensionUtils.getCurrentExtension()
imports.searchPath.unshift(Me.path)

const Gtk = imports.gi.Gtk
const _ = imports.helpers


// Vars
let settings
let settingsBox, fileChooser, entry, scale


// Helpers
function generateFileChooser() {
  const fileChooserBox = new Gtk.VBox({ border_width: 10 })
  const fileChooserLabel = _.generateLabel('Path to git repository')

  let path
  try { path = _.getPath() } catch { path = '' }

  const fileChooser = new Gtk.FileChooserButton({
    title: 'Select git directory',
    action: 2,
    select_multiple: false
  })
  fileChooser.set_current_folder(path || '/home')

  fileChooserBox.pack_start(fileChooserLabel, false, false, 10)
  fileChooserBox.pack_end(fileChooser, false, false, 0)
  settingsBox.pack_start(fileChooserBox, true, false, 0)

  return fileChooser
}

function generateEntry() {
  const entryBox = new Gtk.VBox({ border_width: 10 })
  const entryLabel = _.generateLabel('Your git email')

  let email
  try { email = _.getEmail() } catch { email = '' }

  const entry = new Gtk.Entry({
    placeholder_text: 'example@example.com',
    text: email
  })

  entryBox.pack_start(entryLabel, false, false, 10)
  entryBox.pack_end(entry, false, false, 0)
  settingsBox.pack_start(entryBox, true, false, 0)

  return entry
}

function generateScale() {
  const scaleBox = new Gtk.VBox({ border_width: 10 })
  const scaleLabel = _.generateLabel('Interval between checks (in minutes)')
  const scale = Gtk.Scale.new_with_range(0, 5, 120, 5)
  scale.set_value(_.getInterval())

  scaleBox.pack_start(scaleLabel, false, false, 10)
  scaleBox.pack_end(scale, false, false, 10)
  settingsBox.pack_start(scaleBox, true, false, 0)

  return scale
}

function addBtn() {
  const btnBox = new Gtk.VBox({ border_width: 10 })
  const btn = Gtk.Button.new_with_label('Save')

  btn.connect('clicked', save)

  btnBox.pack_start(btn, false, false, 10)
  settingsBox.pack_start(btnBox, true, false, 0)
}

function save() {
  settings.set_string('path', fileChooser.get_filename())
  settings.set_string('email', entry.get_text())
  settings.set_int('interval', scale.get_value())
}

// Exports
/* eslint-disable-next-line no-unused-vars */
function init() {
  settings = _.getSettings()
  settingsBox = new Gtk.VBox({ border_width: 10 })

  fileChooser = generateFileChooser()
  entry = generateEntry()
  scale = generateScale()

  addBtn()
}

/* eslint-disable-next-line no-unused-vars */
function buildPrefsWidget() {
  settingsBox.show_all()
  return settingsBox
}
