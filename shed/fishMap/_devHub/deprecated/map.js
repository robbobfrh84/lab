function _mapGo({set1}){
  const fishes = set1.map(x=>{ x._Id=JSON.parse(x._Id); return x })

  function onMove(e) {
    console.log('onMove')
    var coords = e.lngLat;
    // canvas.style.cursor = 'grabbing';
    canvas.style.cursor = 'crosshair';

    geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
    map.getSource('point').setData(geojson);
  }

  function onUp(e) {
    console.log('onUp')
    var coords = e.lngLat;
    coordinates.style.display = 'block';
    coordinates.innerHTML = 'Longitude: ' + coords.lng + '<br />Latitude: ' + coords.lat;
    canvas.style.cursor = '';
    map.off('mousemove', onMove);
    map.off('touchmove', onMove);
    console.log('coords.lng, coords.lat: ', coords.lng, coords.lat);
    navBarLon.innerHTML = 'Lat: '+coords.lng
    navBarLat.innerHTML = 'Lon: '+coords.lat
  }

  function buildFish(fish, i) {
    map.loadImage(fish.image, function(error, image) {
      if (error) throw error;
      map.addImage('image-'+i, image);
      map.addLayer({
        "id": "fish-"+i,
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [ fish.lat, fish.lon ],
              }
            }]
          }
        },
        "layout": {
          "icon-image": 'image-'+i,
          "icon-size": 0.25
        }
      })
    })
  }

  function mapOnLoad(){
    map.on('load', function() {

      for (const i in fishes) {
        buildFish(fishes[i], i)
      }

      map.on('mouseUp', function(e) {
        // e.preventDefault()
        // canvas.style.cursor = 'grab'
        // map.on('mousemove', onMove)
        // map.once('mouseup', onUp)
        console.log('onUp')
        var coords = e.lngLat;
        coordinates.style.display = 'block';
        coordinates.innerHTML = 'Longitude: ' + coords.lng + '<br />Latitude: ' + coords.lat;
        canvas.style.cursor = '';
        // map.off('mousemove', onMove);
        // map.off('touchmove', onMove);
        console.log('coords.lng, coords.lat: ', coords.lng, coords.lat)
      })

      map.addSource('point', {
        "type": "geojson",
        "data": geojson
      })

      map.addLayer({
        "id": "point",
        "type": "symbol",
        "source": "point",
        "layout": {
          "text-field": "✛",
          "text-size": 25,
          // "text-letter-spacing": 0.05,
          // "text-offset": [0, 1.5]
        },
        "paint": {
          "text-color": "rgba(255,255,255,0.7)",
          "text-halo-color": "rgba(0,0,0,0.7)",
          "text-halo-width": 2
        },
      })

    // * * * 🚨 * * * Bob's End * * * 🚨 * * *

      // map.addSource('point', {
      //   "type": "geojson",
      //   "data": geojson
      // })
      //
      // map.addLayer({
      //   "id": "point",
      //   "type": "circle",
      //   "source": "point",
      //   "paint": {
      //     "circle-radius": 10,
      //     "circle-color": "#3887be"
      //   }
      // })

      map.on('mouseenter', 'point', function() {
        console.log('mouseenter')
        // map.setPaintProperty('point', 'circle-color', '#3bb2d0');
        // canvas.style.cursor = 'move';
        canvas.style.cursor = 'move';
      })

      map.on('mouseleave', 'point', function() {
        console.log('mouseleave')
        // map.setPaintProperty('point', 'circle-color', '#3887be');
        canvas.style.cursor = '';
      })

      map.on('mousedown', 'point', function(e) {
        console.log('mousedown')
        e.preventDefault()
        // canvas.style.cursor = 'grab'
        // canvas.style.cursor = 'none'
        canvas.style.cursor = 'crosshair';
        map.on('mousemove', onMove)
        map.once('mouseup', onUp)
      })

      // map.on('touchstart', 'point', function(e) {
      //   console.log('touchstart')
      //   if (e.points.length !== 1) return;
      //   e.preventDefault();
      //   map.on('touchmove', onMove);
      //   map.once('touchend', onUp);
      // })

    })

  }

  mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iYm9iZnJoODQiLCJhIjoiY2pvamcyNXUzMDFiMDNwcnc2Z2dibm10ZCJ9.y7ll2wHKfb5WIwtAtK9eJA';
  var coordinates = document.getElementById('coordinates');
  var map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/mapbox/streets-v9',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-121.4316425272457, 41.095638225895186],
    zoom: 6
  });

  var canvas = map.getCanvasContainer();

  var geojson = {
    "type": "FeatureCollection",
    "features": [
      // {
      //   "type": "Feature",
      //   "geometry": {
      //     "type": "Point",
      //     "coordinates": [-121.4316425272457, 41.095638225895186]
      //   }
      // },
      {
        "type": "Feature",
        // "properties": {
        //   "icon": "theatre"
        // },
        "geometry": {
          "type": "Point",
          "coordinates": [-122.4316425272457, 40.095638225895186]
        }
      }
    ]
  }

  mapOnLoad()

}
