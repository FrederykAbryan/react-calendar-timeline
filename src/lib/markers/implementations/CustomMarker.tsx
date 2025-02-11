import React from 'react'
import { createMarkerStylesWithLeftOffset, createDefaultRenderer } from './shared'
import { MarkerRendererType } from '../markerType'

const defaultCustomMarkerRenderer = createDefaultRenderer('default-customer-marker-id')

type CustomMarkerProps = {
  date: number
  getLeftOffsetFromDate: (date: number) => number
  renderer?: MarkerRendererType // ✅ Optional with default value
}

/**
 * CustomMarker that is placed based on passed-in date prop.
 */
const CustomMarker: React.FC<CustomMarkerProps> = ({
  date,
  getLeftOffsetFromDate,
  renderer = defaultCustomMarkerRenderer, // ✅ Default parameter
}) => {
  const leftOffset = getLeftOffsetFromDate(date)
  const styles = createMarkerStylesWithLeftOffset(leftOffset)

  return renderer({ styles, date })
}

export default CustomMarker
