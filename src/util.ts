export const setAlphaColor = (color: string, opacity: number = 1): string => {
  let newColor = color;

  if (!newColor.startsWith('#') || newColor.length !== 7) {
    console.warn('Make sure you set with full hex color value. Ex: #F00F00');
    newColor = '#FFFFFF';
  }

  if (opacity === 1) return newColor;

  const _opacity = Math.round(Math.min(Math.max(opacity, 0), 1) * 255);
  return newColor + _opacity.toString(16).toUpperCase();
};

export const adaptiveColor = (backgroundColor: string): string => {
  const foregroundColor = ['#000000', '#FFFFFF'];
  try {
    /*eslint no-bitwise: ["error", { "allow": ["&", ">>"] }] */
    const bgColor = backgroundColor.substring(1);
    const rgb = parseInt(bgColor, 16);
    const red = (rgb >> 16) & 0xff;
    const green = (rgb >> 8) & 0xff;
    const blue = (rgb >> 0) & 0xff;
    const brightness = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

    return brightness > 128 ? foregroundColor[0] : foregroundColor[1];
  } catch (error) {
    return foregroundColor[0]; // return black by default
  }
};
