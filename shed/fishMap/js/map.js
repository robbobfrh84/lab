function _mapGo({set1}){
  const fishes = set1.map(x=>{ x._Id=JSON.parse(x._Id); return x })
  const center = [-121.4316425272457, 41.095638225895186]

  mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iYm9iZnJoODQiLCJhIjoiY2pvamcyNXUzMDFiMDNwcnc2Z2dibm10ZCJ9.y7ll2wHKfb5WIwtAtK9eJA';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9', // 'mapbox://styles/mapbox/streets-v9',
    center: center,
    zoom: 6
  })

  function onUp(e) {
    coords = e.lngLat;
    navBarLng.innerHTML = 'Lng: '+coords.lng
    navBarLat.innerHTML = 'Lat: '+coords.lat
  }

  addbtn.onclick = function() {
    const center = map.getCenter()
    const color = "blue"
    const newFish = {
      lng: center.lng,
      lat: center.lat,
      color: color,
      image: fishColors[color],
      time: "-"
    }

    buildFish(newFish, fishCnt)

    _gas.crud( "CREATE" , "row", {
      sheetName: "set1",
      content: newFish
    }).then( payload => {
      //
    })

  }

  function mapOnLoad(){
    map.on('load', function() {

      for (const i in fishes) {
        buildFish(fishes[i], i)
      }

      map.on('mouseup', function(e) {
        e.preventDefault()
        onUp(e)
      })

      navBarLng.innerHTML = 'Lng: '+center[0]
      navBarLat.innerHTML = 'Lat: '+center[1]

    })
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
                "coordinates": [ fish.lng, fish.lat ],
              }
            }]
          }
        },
        "layout": {
          "icon-allow-overlap": true,
          "icon-image": 'image-'+i,
          "icon-size": 0.25,
          "icon-offset": [4,4],
          'icon-anchor': "bottom"
        }
      })
      fishCnt++
    })
  }

  mapOnLoad()

}
