/** Generated file, modifications will be overwritten! **/
search.addDoc(
`!/usr/bin/env bash
echo 0 | sudo tee /sys/class/leds/asus::kbd_backlight/brightness
`,"keyboard-backlight-off.sh","script","2018-08-13");
search.addDoc(
`!/usr/bin/env bash
echo 2 | sudo tee /sys/class/leds/asus::kbd_backlight/brightness
`,"keyboard-backlight-on.sh","script","2018-08-13");
search.addDoc(
`!/usr/bin/env bash
echo > hostname -I
hostname
hostname -I
echo
echo > curl http://ip-api.com/line/
curl http://ip-api.com/line/
echo
echo > ip route
ip route
`,"myip.sh","script","2018-08-13");
search.addDoc(
`xrandr --output HDMI1 --auto
xrandr --output eDP1 --off
`,"output-hdmi-only.sh","script","2018-08-13");
search.addDoc(
`xrandr --output eDP1 --auto
xrandr --output HDMI1 --off
`,"output-laptop-only.sh","script","2018-08-13");
