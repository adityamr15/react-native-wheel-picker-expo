# react-native-wheel-picker-expo

React Native wheel picker like iOS

![](./example/demo.gif)

## Installation

```sh
npm install react-native-wheel-picker-expo
```
or
```sh
npm install react-native-wheel-picker-expo
```

## Sample Code

```js
import React from 'react';
import { WheelPickerSimple } from 'rn-wheel-picker-simple';

const CITIES = 'Jakarta,Bandung,Sumbawa,Taliwang,Lombok,Bima'.split(',');

function App() {
    return (
        <WheelPickerSimple
          height={300}
          width={150}
          selectedBorderColor='red'
          selectedBorderHeight={1}
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
