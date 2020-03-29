// Imports
const Gtk = imports.gi.Gtk


// Vars
let settingsBox


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
  settingsBox = new Gtk.VBox({ border_width: 10 })
}

/* eslint-disable-next-line no-unused-vars */
function buildPrefsWidget() {
  addEntry({
    placeholder: '/home/user/work/repository',
    label: 'Absolute path to local git repository'
  })
  addEntry({
    placeholder: 'example@example.com',
    label: 'Your git email, leave blank if you are using git config'
  })
  addEntry({
    placeholder: '30',
    label: 'Interval between checks (in minutes)',
    text: '30'
  })

  settingsBox.show_all()
  return settingsBox
}
