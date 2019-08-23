#installing

Problem booting ubuntu

[   3.516984] bcma: Unsupported SPROM revision: 11
[   3.517071] bcma: bus0: No SPROM available

* add nomodset to boot params (between quiet and splash)

Problem installing GRUB2 (grub-efi-amd64-signed failed installation /target/)

* you need to ensure that a partition of the ‘EFI system partition’ type is mounted at /boot/efi
* disable secure boot in UEFI BIOS



*** Problem = no wireless

`dmesg` shows
Broadcom 4352 WLAN found
ERROR: FOUND UNSUPPORTED PHY
```
sudo update && sudo apt-get install bcmwl-kernel-source
```

*** install NVIDIA drivers

```
ubuntu-drivers devices
sudo ubuntu-drivers autoinstall
```

# Window manager shortcuts

Alt+F7 for maximizing windows (both vertically and horizontally)
Alt+Space for the window operations menu

## grab and move key

Alt + left mouse button




### Gnome lockscreen

change background on lockscreen, screensaver
```
gsettings list-keys org.gnome.login-screen
gsettings set org.gnome.desktop.screensaver picture-options 'scaled'
gsettings set org.gnome.desktop.screensaver picture-uri file:///xxx.png
gsettings set org.gnome.desktop.background picture-uri file:///xxx.png
```

### Configure displays

if display is stuck in 'disabled' it might help to change 'Active' to true in

.config/xfce4/xfconf/xfce-perchannel-xml/displays.xml


### Get notification on long running processes

##### sound notification with spd-say

spd-say is the default Ubuntu text-to-speech utility.

Example:

```
sudo apt update; spd-say done
```

##### text notification with notify-send

Example:

```
sudo apt update; notify-send done
```


