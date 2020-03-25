# ⏲️ git-hours for GNOME

> Simple GNOME extension, that help you 
> track your activity, while working.

This extension is use
[this](https://github.com/linuxjuggler/git-hours)
docker image, and original utility is
[here](https://github.com/kimmobrunfeldt/git-hours).


## Dependencies
- You need to install [docker](https://hub.docker.com/search?q=&type=edition&offering=community&operating_system=linux).


## Install

- Set your git email:
  ```shell
  git config --global user.email 'USER@example.com'
  ```

- Clone:
  ```shell
  git -C ~/.local/share/gnome-shell/extensions/git-hours@ceigh \
    clone git@github.com:ceigh/git-hours-gnome.git
  ```

- Enable it:
  ```shell
  gnome-extensions enable git-hours@ceigh
  ```

- Restart GNOME:

  Press `Alt+F2`, type `r` and press `Enter`.
  *(restart session required on Wayland).*
