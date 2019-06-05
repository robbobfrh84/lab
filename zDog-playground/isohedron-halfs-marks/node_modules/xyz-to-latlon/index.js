function xyzToLatLon (normalizedPosition, out) {
  out = out || [0, 0]
  out[0] = 90 - Math.acos(normalizedPosition[1]) / Math.PI * 180
  out[1] = -Math.atan2(normalizedPosition[2], normalizedPosition[0]) / Math.PI * 180
  return out
}

module.exports = xyzToLatLon
