
  let birds = [];

  fetch("https://api.ebird.org/v2/data/obs/geo/recent/rethaw?lat=40.8547659&lng=-73.940974&maxResults=50&dist=2", {
    method: "GET",
    headers: {"X-eBirdApiToken": apiKey}
  })
  .then(response => response.json())
  //call init map after fetching birds?
  .then(response => 
    response.forEach(bird => birds.push(bird)
    ))
  .catch(error => console.log('error', error));

// console.log(birds)

      var map;
      function initMap() {
          console.log('map appearing')
          //                      where it goes                 ,  object with at least center: and zoom: 
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.8580281, lng: -73.921085},
          zoom: 12
        });
        for(let i = 0; i < birds.length; i++) {
            birds[i] = new google.maps.Marker({position: {lat: birds[i].lat, lng: birds[i].lng }, map: map})
        }
        // birds.forEach(bird => bird.locId = new google.maps.Marker({position: bird, map: map}))
        // var marker = new google.maps.Marker({position: bird, map: map})
      }