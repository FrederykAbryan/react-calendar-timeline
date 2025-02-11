import React, { useEffect } from 'react'
import { SubscribeReturn, TimelineMarkersConsumer } from '../TimelineMarkersContext'
import { MarkerRendererType, MarkerType, TimelineMarkerType } from '../markerType'

export type TodayMarkerProps = {
  interval?: number
  updateMarker: (marker: MarkerType) => void
  subscribeMarker: (m: MarkerType) => SubscribeReturn
  children?: MarkerRendererType
}

/**
 * TodayMarker that subscribes to the timeline marker system and updates based on the given interval.
 */
const TodayMarker: React.FC<TodayMarkerProps> = ({
  interval = 10000, // ✅ Default to 10 seconds
  subscribeMarker,
  children,
}) => {
  useEffect(() => {
    const { unsubscribe } = subscribeMarker({
      type: TimelineMarkerType.Today,
      renderer: children,
      interval,
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, [interval, subscribeMarker, children]); // ✅ Re-subscribe only when interval or renderer changes

  return null;
}

// Wrapper to inject context dependencies
const TodayMarkerWrapper: React.FC<Omit<TodayMarkerProps, 'updateMarker' | 'subscribeMarker'>> = (props) => {
  return (
    <TimelineMarkersConsumer>
      {({ subscribeMarker, updateMarker }) => (
        <TodayMarker subscribeMarker={subscribeMarker} updateMarker={updateMarker} {...props} />
      )}
    </TimelineMarkersConsumer>
  );
};

TodayMarkerWrapper.displayName = 'TodayMarkerWrapper';

export default TodayMarkerWrapper;
