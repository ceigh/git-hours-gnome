const Gtk = imports.gi.Gtk


/* eslint-disable-next-line no-unused-vars */
function init() {}

/* eslint-disable-next-line no-unused-vars */
function buildPrefsWidget() {
  const notebook = new Gtk.Notebook()

  const settingsBox = new Gtk.VBox({ border_width: 10 })
  const aboutBox = new Gtk.VBox({ border_width: 10 })

  settingsBox.pack_start(
    new Gtk.Label({
      label: '<b>Settings</b>',
      use_markup: true
    }),
    true, // expand
    true, // fill
    0
  )
  aboutBox.pack_start(
    new Gtk.Label({
      label: '<b>Git Hours</b>',
      use_markup: true
    }),
    true, // expand
    true, // fill
    0
  )

  notebook.append_page(
    settingsBox,
    new Gtk.Label({ label: 'Settings' })
  )
  notebook.append_page(
    aboutBox,
    new Gtk.Label({ label: 'About' })
  )

  notebook.show_all()
  return notebook
}
