# Background Location Expo Task
I made this repo as an example of how to use Location and Background task in order to send my location to my backend or in this case just show a notification with the coords even if the app is minimized or the phone is locked.

## Important🛑
You have to build  your app. Generate apk to test it. For some reason It does not work in development flow.



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