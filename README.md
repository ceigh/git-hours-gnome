# ⏲️ git-hours for GNOME

> Simple GNOME extension, that help you 
> track your activity, while working.

This extension is use
[this](https://github.com/linuxjuggler/git-hours)
docker image, and original utility is
[here](https://github.com/kimmobrunfeldt/git-hours).


## Dependencies
- You need to install
[docker](https://hub.docker.com/search?q=&type=edition&offering=community&operating_system=linux).


## TODO
- [x] Configurable settings
- [ ] Add salary per hour parameter
- [ ] Move to native JS from docker
- [ ] Add time intervals by date


## Install
- Clone and move:
  ```shell
  git clone git@github.com:ceigh/git-hours-gnome.git \
    && mv git-hours-gnome ~/.local/share/gnome-shell/extensions/git-hours@ceigh
  ```

- Enable it:
  ```shell
  gnome-extensions enable git-hours@ceigh
  ```

- Restart GNOME:

  Press `Alt+F2`, type `r` and press `Enter`.
  *(restart session required on Wayland).*


## Setup
Open extension preferences and just set path, interval and email.

Also you can put email field empty if you are using git config:
```shell
git config --global user.email 'example@example.com'
```


## Debug
If something went wrong, or just didn't work, please see output of shell:
```shell
journalctl -f /usr/bin/gnome-shell | grep -E --color=always 'git-hours@ceigh'
```


## Development
If you want to help me in development, you can simply clone this repo like on install,

run `yarn # or npm i` and start.

Also you can simply open issues if you have found a *bug* 🐛️.
