import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { GRID_BORDER_COLOR } from './constants';
import { GridContext } from './GridContext';
import type { GridContextValue, GridProps } from './types';

const Grid = (props: GridProps) => {
  const {
    border = false,
    center = true,
    children,
    clickable = false,
    columnNum = 4,
    direction = 'vertical',
    gutter = 0,
    reverse = false,
    square = false
  } = props;

  const contextValue = useMemo<GridContextValue>(
    () => ({ border, center, clickable, columnNum, direction, gutter, reverse, square }),
    [border, center, clickable, columnNum, direction, gutter, reverse, square]
  );

  return (
    <GridContext.Provider value={contextValue}>
      <View
        style={[
          { flexDirection: 'row', flexWrap: 'wrap' },
          gutter > 0 && { marginHorizontal: -gutter / 2 },
          border && {
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderColor: GRID_BORDER_COLOR
          }
        ]}
      >
        {children}
      </View>
    </GridContext.Provider>
  );
};

export { Grid };
