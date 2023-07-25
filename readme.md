# Background Location Expo Task
I made this repo as an example of how to use Location and Background task in order to send my location to my backend or in this case just show a notification with the coords even if the app is minimized or the phone is locked.

## Important🛑
Background feature will not work as expected unless you create a "development build" of your app.
[What is it?](https://docs.expo.dev/develop/development-builds/introduction/)
[Development builds Installation](https://docs.expo.dev/develop/development-builds/installation/)
[Create a development build](https://docs.expo.dev/develop/development-builds/installation/)

Or watch this [video](https://youtu.be/LUFHXsBcW6w)

If you don't want to use the "development mode", just build the apk and try it.

## Configuration

on your *app.json* add next permissions

```bash
  "ios": {
      "supportsTablet": true,
      "infoPlist": {
        "UIBackgroundModes": [
          "location",
          "fetch"
        ]
      }
    },
```

```bash
 "android": {
      "permissions": [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "VIBRATE",
        "FOREGROUND_SERVICE"
      ],
```
```bash
 "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location. xd"
        }
      ]
    ],
```


# Issues
For some reason, after the phone is locked the location is sent correctly for 3-4 minutes and then just stops. It works properly after the phone is unlocked.
If you find any solutions to this, please let me know.
