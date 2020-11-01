---
title: macOS Cookbook
type: docs
date: 2020-11-01T13:56:14.668Z
path: /docs/
TOC: true
---
### Access macOS' clipboard via command line

Use `pbcopy` & `pbpaste`

```bash
# copy the output of the `pwd` command to the clipboard.
pwd | pbcopy
```

[source](https://stackoverflow.com/questions/1753110/how-do-i-capture-bash-output-to-the-mac-os-x-clipboard)

---

### Increase the key repeat rate beyond OSX's limit

On Mac OS X, open the Global Preferences plist

```bash
open ~/Library/Preferences/.GlobalPreferences.plist
```

Then change the KeyRepeat field. Smaller numbers will speed up your cursor rate. The settings dialog will only set it to a minimum of 2, so if you go to 0 or 1, you'll get a faster cursor.

I had to reboot for this to take effect.

[source](https://stackoverflow.com/questions/171326/how-can-i-increase-the-key-repeat-rate-beyond-the-oss-limit)

---

### Change where screenshots are saved

In terminal, edit the preferences of the `screencapture` utility:

```bash
defaults write com.apple.screencapture location /folder/path
```

[source]()

---

### Open a plist file and display it in a human readable format

In terminal, use the `plutil` utility:

```bash
plutil -p ~/path/to/pref-file/com.vendor.app.plist
```

[source]()

---

### Restart OSX's SystemUIServer

In terminal, type:

```bash
killall SystemUIServer
```

[source]()

---

### List all volumes

```bash
diskutil list
```

---

### Hide/unhide a system file or folder

Hide:

```bash
chflags hidden {target}
```

Unhide:

```bash
chflags nohidden {target}
```

---

### Show hidden files

In Finder, use this shortcut: `<kbd>CMD</kbd> <kbd>SHIFT</kbd> <kbd>DOT</kbd>`.

---

### Manage, create, delete Firefoxuser profiles

From terminal, navigate to `/Applications` and enter the following command:

```bash
/Applications/Firefox.app/Contents/MacOS/firefox-bin -P
```

The Profile Manager window will open, allowing to visually manage and edit profiles.

[source](https://support.mozilla.org/en-US/kb/profile-manager-create-and-remove-firefox-profiles#w_starting-the-profile-manager)

---

### Flush the system's DNS cache

In a shell, type:

```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

[source](http://)