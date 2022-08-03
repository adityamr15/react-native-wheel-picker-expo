import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';

const PROVINCES = 'DKI,NTB,JABAR,JATIM'.split(',');
const CITIES = 'Jakarta,Bandung,Sumbawa,Taliwang,Lombok,Bima'.split(',');

/* eslint-disable react-native/no-inline-styles */

export default function App() {
  const [province, setProvince] = React.useState('');
  const [city, setCity] = React.useState('');
  const wheelRef = React.useRef<WheelPickerExpo>(null);

  return (
    <>
      <View style={styles.container}>
        <WheelPickerExpo
          ref={wheelRef}
          backgroundColor="#F00F00"
          selectedStyle={{ borderColor: '#202124', borderWidth: 2 }}
          height={300}
          initialSelectedIndex={1}
          items={PROVINCES.map((name) => ({ label: name, value: '' }))}
          onChange={({ item }) => setProvince(item.label)}
          renderItem={(props) => (
            <Text
              style={[
                styles.text,
                {
                  fontSize: props.fontSize,
                  color: props.fontColor,
                  textAlign: props.textAlign,
                },
              ]}
            >
              {props.label}
            </Text>
          )}
        />

        <WheelPickerExpo
          backgroundColor="#202124"
          selectedStyle={{ borderColor: '#F00F00', borderWidth: 2 }}
          height={300}
          width={150}
          initialSelectedIndex={3}
          items={CITIES.map((name) => ({ label: name, value: '' }))}
          onChange={({ item }) => setCity(item.label)}
          haptics={true}
        />
      </View>

      <View style={styles.container2}>
        <Text>Selected Value:</Text>
        <Text style={styles.text}>{province}</Text>
        <Text style={styles.text}>{city}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
