import { StatusBar } from 'expo-status-bar';
import { ImageBackground, View } from 'react-native';
import { s } from "./App.style";
import hotBackground from "./assets/hot.png";
import coldBackground from "./assets/cold.png";
import { InputTemperature } from './components/InputTemperature/InputTemperature';
import { TemperatureDisplay } from './components/TemperatureDisplay/TemperatureDisplay';
import { useEffect, useState } from 'react';
import { DEFAULT_TEMPERATURE, DEFAULT_UNIT } from './constant';
import { getOppositUnit, convertTemperatureTo, isIceTemperature } from './services/temperature-service';
import { ButtonConvert } from './components/ButtonConvert/ButtonConvert';

export default function App() {

  // State qui stock la valeur inscrit dans l'input et mise à défaut à 0°C
  const [inputValue, setInputValue] = useState(DEFAULT_TEMPERATURE);
  // State qui stock l'unité de température mise par defaut en °C
  const [currentUnit, setCurrentUnit] = useState(DEFAULT_UNIT);
  // State qui stock l'image de fond de l'application
  const [currentBackground, setCurrentBackground] = useState();
  const oppositeUnit = getOppositUnit(currentUnit);

  // Utilisation du useEffect afin de récupérer et de contrôler la valueur de l'input, si elle existe alors l'image de fond change en fonction de la température indiquée (utilisation du ternaire en destructuring)
  useEffect(() => {
    const temperatureAsFloat = Number.parseFloat(inputValue)
    if (!isNaN(temperatureAsFloat)) {
      const isColdBackground = isIceTemperature(inputValue, currentUnit)
      setCurrentBackground(isColdBackground ? coldBackground : hotBackground)
    }
  }, [inputValue, currentUnit])

  // fonction permettant de convertir la valeur de l'input dans l'unité auquel il appartient en son opposé.
  function getConvertedTemperature() {
    const valueAsFloat = Number.parseFloat(inputValue);
    return isNaN(valueAsFloat) ? "" : convertTemperatureTo(oppositeUnit, valueAsFloat).toFixed(1);
    //convertTemperatureTo(oppositeUnit, inputValue)
  }

  return (
    // Image de fond de l'application
    <ImageBackground source={currentBackground} style={s.container}>
      {/* Fenetre principale de travail */}
      <View style={s.workspace}>
        {/* Affichage de la conversion de la temperature */}
        <TemperatureDisplay
          value={getConvertedTemperature()}
          unit={getOppositUnit(currentUnit)}
        />
        {/* Champs Input permettant à l'utilisateur de taper son nombre */}
        <InputTemperature
          onChangeText={setInputValue}
          defaultValue={DEFAULT_TEMPERATURE}
          unit={currentUnit}
        />
        {/* Bouton de conversion Celcius vers Faraneigt et inversement */}
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