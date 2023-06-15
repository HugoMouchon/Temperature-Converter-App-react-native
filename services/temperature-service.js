import { UNITS } from "../constant";

// fonction permettant de récupérer l'unité opposé.
function getOppositUnit(unit) {
    return unit == UNITS.celcius ? UNITS.faranheigt : UNITS.celcius;
}

// fonction permettant de convertire des degrés celcius en faraneigt et inversement.
function convertTemperatureTo(unit, value) {
    if (unit == UNITS.celcius) {
        return (value - 32) / 1.8;
    } else {
        return value * 1.8 + 32;
    }
}

// fonction permettant de savoir si la valeur inscrite est négative (soit en °C ou en °F)
function isIceTemperature(value, unit) {
    if (unit == UNITS.celcius) {
        return value <= 0
    } else {
        return value <= 32
    }
}

export { getOppositUnit, convertTemperatureTo, isIceTemperature };