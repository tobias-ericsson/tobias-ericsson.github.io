
### Bootable USB Media from ISO in Ubuntu Linux

If you don't have "Startup Disk Creator" installed this is a command line alternative.

```
sudo apt install gddrescue
sudo fdisk -l
ddrescue path/to/.iso /dev/sdx --force -D
``` 
Replace the x and path/to/.iso with your specific device block name and the path for the iso file.



#########

### rEFInd boot manager

https://www.rodsbooks.com/refind/installing.html#packagefile
