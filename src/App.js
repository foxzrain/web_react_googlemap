import React, { Component } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

// 
const loader = new Loader({
    apiKey: "AIzaSyCNePgsE1No1WzZ_v0_2RQJh3o6CABq1_8",
    version: "weekly",
    libraries: ["places", "marker"]
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const defaultMapOptions = {
            center: {
                lat: 13.779820829768585,
                lng: 100.54464812602707
            },
            zoom: 15,
        };

        // function load when create page
        loader.load().then((google) => {
          this.google = google;

          const map = new google.maps.Map(
                this.googleMapDiv,
                defaultMapOptions);
            /*
                store them in the state so you can use it later
                E.g. call a function on the map object:
                    this.state.map.panTo(...)
                E.g. create a new marker:
                    new this.state.google.maps.Marker(...)
            */
            const marker = new google.maps.Marker({
              position: {
                lat: 13.779820829768585,
                lng: 100.54464812602707
            },
              map: map, // must have
            });

            // center location state
            this.setState({
                google: google,
                map: map,
                marker: marker,
            });

            // search restaurant, bakery and cafe in 5 km around center location
            var request = {
              location: {
                lat: 13.779820829768585,
                lng: 100.54464812602707
            },
              radius: '5000', // 5 km
              type: ['restaurant', 'Bakery', 'Cafe']
            };
          
            // A Places Nearby search is initiated with a call to the PlacesService's nearbySearch() method
            const service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, this.callback);
        });
    };

    callback(results, status) {
      if (status === 'OK') {
        for (var i = 0; i < results.length; i++) {
          if (!results[i].geometry || !results[i].geometry.location) return;
          console.log(results[i].name);
        }
      }
    };

    render() {
        return (
            <div
                ref={(ref) => { this.googleMapDiv = ref }}
                style={{ height: '100vh', width: '100%' }}>
            </div>
        )
    }
}
