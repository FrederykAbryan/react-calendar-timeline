import React, { useState, useEffect } from 'react';
import { createMarkerStylesWithLeftOffset, createDefaultRenderer } from './shared';
import { HandleCanvasMouseOver, MarkerCanvasConsumer } from '../MarkerCanvasContext';
import { MarkerRendererType } from '../markerType';

const defaultRenderer = createDefaultRenderer('default-cursor-marker');

type CursorMarkerProps = {
  getLeftOffsetFromDate: (date: number) => number;
  renderer?: MarkerRendererType;
  subscribeToCanvasMouseOver: (p: HandleCanvasMouseOver) => () => void;
};

const CursorMarker: React.FC<CursorMarkerProps> = ({
  renderer = defaultRenderer, // ✅ Default parameter instead of defaultProps
  subscribeToCanvasMouseOver,
}) => {
  const [cursorState, setCursorState] = useState({
    leftOffset: 0,
    date: 0,
    isShowingCursor: false,
  });

  useEffect(() => {
    // Subscribe to canvas mouse events
    const unsubscribe = subscribeToCanvasMouseOver(({ leftOffset, date, isCursorOverCanvas }) => {
      setCursorState({ leftOffset, date, isShowingCursor: isCursorOverCanvas });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [subscribeToCanvasMouseOver]);

  if (!cursorState.isShowingCursor) return null;

  const styles = createMarkerStylesWithLeftOffset(cursorState.leftOffset);
  return renderer({ styles, date: cursorState.date });
};

// Wrapper component to consume MarkerCanvas context and pass subscription
const CursorMarkerWrapper: React.FC<Omit<CursorMarkerProps, 'subscribeToCanvasMouseOver'>> = (props) => {
  return (
    <MarkerCanvasConsumer>
      {({ subscribeToMouseOver }) => <CursorMarker subscribeToCanvasMouseOver={subscribeToMouseOver} {...props} />}
    </MarkerCanvasConsumer>
  );
};

CursorMarkerWrapper.displayName = 'CursorMarkerWrapper';

export default CursorMarkerWrapper;
