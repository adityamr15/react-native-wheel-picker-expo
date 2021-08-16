# react-native-wheel-picker-expo
![npm](https://img.shields.io/npm/v/react-native-wheel-picker-expo?label=version&style=flat-square)
![npm](https://img.shields.io/npm/dt/react-native-wheel-picker-expo?color=4caf50&logo=react-native-wheel-picker-expo&style=flat-square)
![npm type definitions](https://img.shields.io/npm/types/react-native-wheel-picker-expo?style=flat-square)

React Native wheel picker like iOS without ejected Expo/CRNA

![](./example/demo.gif)

#### Demo with [Expo](https://expo.dev/@adityamr15/react-native-wheel-picker-expo-example)
![](./example/expo-demo.png)

## Installation

```sh
expo install react-native-wheel-picker-expo
```
or
```sh
npm install react-native-wheel-picker-expo
```

## Sample Code

```js
import React from 'react';
import WheelPickerExpo from 'react-native-wheel-picker-expo';

const CITIES = 'Jakarta,Bandung,Sumbawa,Taliwang,Lombok,Bima'.split(',');

function App() {
    return (
        <WheelPickerExpo
          height={300}
          width={150}
          initialSelectedIndex={3}
          items={CITIES.map(name => ({ label: name, value: '' }))}
          onChange={({ item }) => setCity(item.label)} />
    );
}

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
