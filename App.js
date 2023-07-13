import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Notifications from "expo-notifications"

const LOCATION_TASK_NAME = 'background-location-task';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification({ title, body, notiId }) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
    identifier: notiId || "normal-notification"
  });
}

const requestPermissions = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
      schedulePushNotification({ title: "Permissions", body: "All permissions were granted" })
    } else alert("background not accepted")
  } else alert("foreground not accepted")
};

const startLocation = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.Highest, showsBackgroundLocationIndicator: true, foregroundService: {
      notificationBody: "Foreground", notificationColor: "green", notificationTitle: "service running"
    }, distanceInterval: 1,
  }).then(() => schedulePushNotification({ title: "Location", body: "Started" }))
    .catch(() => schedulePushNotification({ title: "Location", body: "Failed" }))
}

const stopLocation = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME).then(() => schedulePushNotification({ title: "Location", body: "Background Task Stop Successfuly" }))
    .catch(() => schedulePushNotification({ title: "Location", body: "Background task failed to Stop" }))
}


export default function App() {
  return (
    <View style={styles.container}>
      <Button onPress={requestPermissions} title="Request Permissions" />
      <Text />
      <Button onPress={startLocation} title="Start background task" />
      <Text />
      <Button onPress={stopLocation} title="Stop background task" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    let timestamp = Math.round(+new Date() / 1000) + "";
    schedulePushNotification({ title: "Background ERROR", body: timestamp })

    return;
  }
  if (data) {
    if(!data?.locations) return
    const { latitude, longitude } = data.locations[0].coords
    
    // const { timestamp } = locations
    schedulePushNotification({ title: "Background", body: `[${latitude},${longitude}]`, notiId: "location-id" })
    console.log({latitude, longitude})
    
    // do something with the locations captured in the background
  }
});
