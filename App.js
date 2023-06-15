import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { s } from "./App.style";
import hotBackground from "./assets/hot.png";

export default function App() {
  return (
    <ImageBackground source={hotBackground} style={s.container}>
      <View style={s.workspace}>
        <View><Text>Température</Text></View>
        <View><Text>Input</Text></View>
        <View><Text>Button</Text></View>
      </View>
    </ImageBackground>
  );
}

