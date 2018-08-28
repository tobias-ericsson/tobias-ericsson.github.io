#FOR NTFS READ SUPPORT
brew cask install Caskroom/cask/osxfuse
brew update && brew install ntfs-3g
diskutil unmountDisk /dev/disk4
diskutil list
sudo /usr/local/bin/ntfs-3g /dev/disk4s1 /Volumes/NTFS -olocal -oallow_other
