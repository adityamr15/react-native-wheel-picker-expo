# react-native-wheel-picker-expo
![npm](https://img.shields.io/npm/v/react-native-wheel-picker-expo?style=flat-square&logo=npm)
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


## Props
| Prop | Default | Type | Description |
| :--- | :---: | :---: | :--- |
| items | `Array` | `Array<ItemType>` | Data that will be rendered as options |
| onChange | `-` | `({index, item}) => void` | Function will be called during scrolling |
| onChangeEnd | `-` | `({index, item}) => void` | Function will be called after scroll end |
| initialSelectedIndex | `-` | `number` | Inital index will be selected |
| height | `200` | `number` | Style height for container |
| width | `150` | `number` | Style width for container |
| flatListProps | `-` | `FlatListProps<ItemType>` | Props of FlatList |
| backgroundColor | `#FFFFFF` | `string` | For best result this is necessary if background is not white. `Note:` Only accept `hexcolor` and have 7 length of string. Ex: `#F00F00` |
| selectedStyle | `-` | `{ borderColor: string; borderWidth: number }` | Style for selected item |
| renderItem | `-` | `(props: RenderItemProps) => JSX.Element` |Return JSX Element to override the items |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
