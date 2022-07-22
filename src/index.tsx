import React, { PureComponent } from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { adaptiveColor, setAlphaColor } from './util';
import type {
  ItemType,
  IViuPickerProps,
  IViuPickerState,
  RenderItemProps,
} from './types';
import * as Haptics from 'expo-haptics';

class ViuPicker extends PureComponent<IViuPickerProps, IViuPickerState> {
  static defaultProps = {
    items: [],
    backgroundColor: '#FFFFFF',
    width: 150,
    haptics: false,
  };

  flatListRef = React.createRef<FlatList>();
  backgroundColor = setAlphaColor(this.props.backgroundColor as any, 1);

  state = {
    selectedIndex: 0,
    itemHeight: 40,
    listHeight: 200,
    data: [],
  };

  userTouch = false;
  momentumScrolling = false;

  componentDidUpdate(prevProps: IViuPickerProps) {
    if (this.props.items?.length !== prevProps.items?.length) {
      this.setData();
    }
  }

  componentDidMount() {
    this.setData();
  }

  get gradientColor(): string {
    return Platform.select({
      ios: setAlphaColor(this.backgroundColor, 0.2),
      android: setAlphaColor(this.backgroundColor, 0.4),
    }) as string;
  }

  handleOnSelect(index: number) {
    const { items, onChange, haptics } = this.props;
    const selectedIndex = Math.abs(index);

    if (selectedIndex >= 0 && selectedIndex <= items.length - 1) {
      if (
        haptics &&
        (this.userTouch || this.momentumScrolling) &&
        this.state.selectedIndex !== selectedIndex
      ) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

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
    const { width, initialSelectedIndex, flatListProps, selectedStyle } =
      this.props;
    const gradientContainerStyle = [
      { height: 2 * itemHeight, borderColor: selectedStyle?.borderColor },
      styles.gradientContainer,
    ];

    return (
      <View
        style={{
          height: listHeight,
          width,
          backgroundColor: this.backgroundColor,
        }}
      >
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={(options) =>
            PickerItem(
              options,
              selectedIndex,
              {
                ...styles.listItem,
                backgroundColor: this.backgroundColor,
                fontSize: itemHeight / 2,
                height: itemHeight,
              },
              this.handleOnPressItem,
              this.props.renderItem as any
            )
          }
          onTouchStart={() => (this.userTouch = true)}
          onTouchEnd={() => (this.userTouch = false)}
          onMomentumScrollBegin={() => (this.momentumScrolling = true)}
          onMomentumScrollEnd={() => (this.momentumScrolling = false)}
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
            { borderBottomWidth: selectedStyle?.borderWidth },
          ]}
          pointerEvents="none"
        >
          <LinearGradient
            style={styles.linearGradient}
            colors={[this.backgroundColor, this.gradientColor]}
          />
        </View>
        <View
          style={[
            gradientContainerStyle,
            styles.bottomGradient,
            { borderTopWidth: selectedStyle?.borderWidth },
          ]}
          pointerEvents="none"
        >
          <LinearGradient
            style={styles.linearGradient}
            colors={[this.gradientColor, this.backgroundColor]}
          />
        </View>
      </View>
    );
  }
}

const Item = React.memo(({ fontSize, label, fontColor }: RenderItemProps) => (
  <Text style={{ fontSize, color: fontColor }}>{label}</Text>
));

const PickerItem = (
  { item, index }: any,
  indexSelected: number,
  style: any,
  onPress: (index: number) => void,
  renderItem: (props: RenderItemProps) => JSX.Element
) => {
  const gap = Math.abs(index - (indexSelected + 2));
  const sizeText = [style.fontSize, style.fontSize / 1.5, style.fontSize / 2];

  const fontSize = gap > 1 ? sizeText[2] : sizeText[gap];
  const fontColor = adaptiveColor(style.backgroundColor);

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onPress(index - 2)}>
      <View style={style}>
        {typeof renderItem === 'function' &&
          renderItem({ fontSize, fontColor, label: item.label })}
        {!renderItem && (
          <Item fontSize={fontSize} fontColor={fontColor} label={item.label} />
        )}
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
