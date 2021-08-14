import React, { PureComponent } from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  FlatListProps,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ItemType = { label: string; value: any };
type RenderItemProps = { fontSize: number; label: string };

interface IViuPickerProps {
  items: ItemType[];
  onChange: (item: { index: number; item: ItemType }) => void;
  initialSelectedIndex?: number;
  height?: number;
  width?: any;
  flatListProps?: Partial<FlatListProps<ItemType>>;
  backgroundColor?: string;
  selectedBorderColor?: string;
  selectedBorderHeight?: number;
  renderItem?: (props: RenderItemProps) => JSX.Element;
}

interface IViuPickerState {
  selectedIndex: number;
  itemHeight: number;
  listHeight: number;
  data: ItemType[];
}

const GRADIENT_COLOR = Platform.select({
  ios: 'rgba( 255, 255, 255, .2 )',
  android: 'rgba( 255, 255, 255, .4 )',
}) as string;

class ViuPicker extends PureComponent<IViuPickerProps, IViuPickerState> {
  static defaultProps = {
    items: [],
    backgroundColor: '#FFF',
    selectedBorderHeight: 0,
    width: 150,
  };

  flatListRef = React.createRef<FlatList>();

  state = {
    selectedIndex: 0,
    itemHeight: 40,
    listHeight: 200,
    data: [],
  };

  componentDidUpdate(prevProps: IViuPickerProps) {
    if (this.props.items?.length !== prevProps.items?.length) {
      this.setData();
    }
  }

  componentDidMount() {
    this.setData();
  }

  handleOnSelect(index: number) {
    const { items, onChange } = this.props;
    const selectedIndex = Math.abs(index);

    if (selectedIndex >= 0 && selectedIndex <= items.length - 1) {
      this.setState({ selectedIndex });
      onChange &&
        onChange({ index: selectedIndex, item: items[selectedIndex] });
    }
  }

  handleOnPressItem = (index: number) => {
    if (index >= 0 && index <= this.props.items.length - 1) {
      this.flatListRef.current?.scrollToIndex({
        animated: true,
        index: index,
      });
    }
  };

  setData() {
    let { itemHeight, listHeight } = this.state;
    const { items, height } = this.props;

    if (items?.length) {
      const additionalItem = { label: '', value: null };
      const data = [
        additionalItem,
        additionalItem,
        ...items,
        additionalItem,
        additionalItem,
      ] as ItemType[];

      if (height) {
        listHeight = height;
        itemHeight = listHeight / 5;
      }

      this.setState({ data, itemHeight, listHeight });
    }
  }

  render() {
    const { data, itemHeight, listHeight, selectedIndex } = this.state;
    const {
      width,
      initialSelectedIndex,
      flatListProps,
      backgroundColor = '',
      selectedBorderColor,
      selectedBorderHeight,
    } = this.props;
    const gradientContainerStyle = [
      { height: 2 * itemHeight, borderColor: selectedBorderColor },
      styles.gradientContainer,
    ];

    return (
      <View style={{ height: listHeight, width, backgroundColor }}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={(options) =>
            PickerItem(
              options,
              selectedIndex,
              {
                ...styles.listItem,
                fontSize: itemHeight / 2,
                height: itemHeight,
              },
              this.handleOnPressItem,
              this.props.renderItem as any
            )
          }
          {...flatListProps}
          ref={this.flatListRef}
          initialScrollIndex={initialSelectedIndex}
          data={data}
          onScroll={(event) => {
            let index = Math.round(
              event.nativeEvent.contentOffset.y / itemHeight
            );
            this.handleOnSelect(index);
          }}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: index * itemHeight,
            index,
          })}
          snapToInterval={itemHeight}
        />
        <View
          style={[
            gradientContainerStyle,
            styles.topGradient,
            { borderBottomWidth: selectedBorderHeight },
          ]}
          pointerEvents="none"
        >
          <LinearGradient
            style={styles.linearGradient}
            colors={[backgroundColor, GRADIENT_COLOR]}
          />
        </View>
        <View
          style={[
            gradientContainerStyle,
            styles.bottomGradient,
            { borderTopWidth: selectedBorderHeight },
          ]}
          pointerEvents="none"
        >
          <LinearGradient
            style={styles.linearGradient}
            colors={[GRADIENT_COLOR, backgroundColor]}
          />
        </View>
      </View>
    );
  }
}

const Item = React.memo(({ fontSize, label }: any) => {
  return <Text style={{ fontSize }}>{label}</Text>;
});

const PickerItem = (
  { item, index }: any,
  indexSelected: number,
  style: any,
  onPress: (index: number) => void,
  renderItem: (props: RenderItemProps) => JSX.Element
) => {
  const gap = Math.abs(index - (indexSelected + 2));
  const sizeText = [style.fontSize, style.fontSize / 1.5, style.fontSize / 2];

  let fontSize = sizeText[gap];
  if (gap > 1) {
    fontSize = sizeText[2];
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onPress(index - 2)}>
      <View style={style}>
        {typeof renderItem === 'function' &&
          renderItem({ fontSize, label: item.label })}
        {!renderItem && <Item fontSize={fontSize} label={item.label} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientContainer: {
    position: 'absolute',
    width: '100%',
  },
  linearGradient: { flex: 1 },
  topGradient: { top: 0 },
  bottomGradient: { bottom: 0 },
});

const WheelPickerExpo = ViuPicker;
export default WheelPickerExpo;
