import React, { useState, useEffect } from 'react'
import { createMarkerStylesWithLeftOffset, createDefaultRenderer } from './shared'
import { MarkerRendererType } from '../markerType'

const defaultRenderer = createDefaultRenderer('default-today-line')

type TodayMarkerProps = {
  getLeftOffsetFromDate: (date: number) => number
  renderer?: MarkerRendererType // ✅ Optional with default value
  interval?: number // ✅ Optional with default value
}

/**
 * Marker that is placed based on the current date.
 * This component updates itself on a set interval, dictated by the 'interval' prop.
 */
const TodayMarker: React.FC<TodayMarkerProps> = ({
  getLeftOffsetFromDate,
  renderer = defaultRenderer, // ✅ Default function parameter
  interval = 10000, // ✅ Default update interval: 10 seconds
}) => {
  const [date, setDate] = useState<number>(Date.now())

  useEffect(() => {
    // Function to update the date
    const updateDate = () => setDate(Date.now())

    // Start interval
    const intervalToken = setInterval(updateDate, interval)

    // Cleanup on unmount or interval change
    return () => clearInterval(intervalToken)
  }, [interval]) // ✅ Effect re-runs only when `interval` changes

  const leftOffset = getLeftOffsetFromDate(date)
  const styles = createMarkerStylesWithLeftOffset(leftOffset)

  return renderer({ styles, date })
}

export default TodayMarker
