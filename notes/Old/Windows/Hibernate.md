Disable Hibernation / Remove hiberfil.sys
=========================================

### To delete the hibernate.sys file

Open Power Options window
(Ctrl +R | powercfg.cpl)

Change plan settings

Make sure that hibernate is not used

Must be administartor to run
C:\windows\system32>powercfg -h off


## To turn on hibernation again

C:\windows\system32>powercfg -h on

http://tekeye.biz/2014/hiberfil-sys-windows-8-1-delete

