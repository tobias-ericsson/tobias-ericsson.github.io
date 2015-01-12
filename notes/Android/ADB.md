Android Debug Bridge (ADB)
-------------------------

You can find the adb tool in <sdk>/platform-tools/.

Commands:

* devices

* start-server

* kill-server

* logcat

* install -r path\ProjectName.apk

* shell pm uninstall -k com.embarcadero.ProjectName

* adb shell am start -n com.embarcadero.ProjectName/com.embarcadero.firemonkey.FMXNativeActivity

* adb shell am force-stop com.embarcadero.ProjectName

* adb pull <remote> <local>

* adb push foo.txt /sdcard/foo.txt

* adb shell

http://delphi.org/2013/11/installing-and-running-android-apps-from-command-line/