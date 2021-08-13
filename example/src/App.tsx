import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';

const PROVINCES = 'DKI,NTB,JABAR,JATIM'.split(',');
const CITIES = 'Jakarta,Bandung,Sumbawa,Taliwang,Lombok,Bima'.split(',');

export default function App() {
  const [province, setProvince] = React.useState('');
  const [city, setCity] = React.useState('');

  return (
    <>
      <View style={styles.container}>
        <WheelPickerExpo
          height={300}
          selectedBorderHeight={2}
          initialSelectedIndex={1}
          items={PROVINCES.map((name) => ({ label: name, value: '' }))}
          onChange={({ item }) => setProvince(item.label)}
          renderItem={(props) => (
            <Text style={[styles.text, { fontSize: props.fontSize }]}>
              {props.label}
            </Text>
          )}
        />

        <WheelPickerExpo
          height={300}
          width={150}
          selectedBorderColor="red"
          selectedBorderHeight={2}
          initialSelectedIndex={3}
          items={CITIES.map((name) => ({ label: name, value: '' }))}
          onChange={({ item }) => setCity(item.label)}
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
