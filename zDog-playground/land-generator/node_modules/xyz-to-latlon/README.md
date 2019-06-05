# xyz-to-latlon

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Converts to x,y,z position on a unit sphere to latitude,longitude.

## Usage

```javascript
var xyzToLatLon = require('xyz-to-latlon')

//
var coord = xyzToLatLon([ 0.6224144446694938, 0.7826866171599899, 0.0013850579111009925 ])
//[51.507222, -0.1275]
```

## API

### `xyzToLatLon(normalizedPosition, [out])`

Converts to x,y,z position on a unit sphere to latitude,longitude.

- `normalizedPosition`: vec3, position on a unit sphere
- `out`: vec2

Returns out or new `vec2` with lat,lon coordinates.

## License

MIT, see [LICENSE.md](http://github.com/vorg/xyz-to-latlon/blob/master/LICENSE.md) for details.
