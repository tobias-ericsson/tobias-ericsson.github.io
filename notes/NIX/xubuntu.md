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