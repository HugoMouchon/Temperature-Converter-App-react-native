import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { s } from "./App.style";
import hotBackground from "./assets/hot.png";
import { InputTemperature } from './components/InputTemperature/InputTemperature';
import { TemperatureDisplay } from './components/TemperatureDisplay/TemperatureDisplay';
import { useState } from 'react';
import { DEFAULT_TEMPERATURE, DEFAULT_UNIT, UNITS } from './constant';
import { getOppositUnit, convertTemperatureTo } from './services/temperature-service';
import { ButtonConvert } from './components/ButtonConvert/ButtonConvert';

export default function App() {

  const [inputValue, setInputValue] = useState(DEFAULT_TEMPERATURE)
  const [currentUnit, setCurrentUnit] = useState(DEFAULT_UNIT)
  const oppositeUnit = getOppositUnit(currentUnit);

  function getConvertedTemperature() {
    const valueAsFloat = Number.parseFloat(inputValue);
    return isNaN(valueAsFloat) ? "" : convertTemperatureTo(oppositeUnit, valueAsFloat).toFixed(1);
    //convertTemperatureTo(oppositeUnit, inputValue)
  }

  return (
    <ImageBackground source={hotBackground} style={s.container}>
      <View style={s.workspace}>
        <TemperatureDisplay
          value={getConvertedTemperature()}
          unit={getOppositUnit(currentUnit)}
        />
        <InputTemperature
          onChangeText={setInputValue}
          defaultValue={DEFAULT_TEMPERATURE}
          unit={currentUnit}
        />
        <ButtonConvert
          onPress={() => {
            setCurrentUnit(oppositeUnit);
          }}
          unit={currentUnit}
        />
      </View>
    </ImageBackground>
  );
}

