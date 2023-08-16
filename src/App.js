import React, { Component } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Header from './Header';

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
        // function load when create page
        loader.load().then((google) => {
          this.google = google;

          const centerLocation = new google.maps.LatLng(13.779820829768585, 100.54464812602707);
          
          const defaultMapOptions = {
              center: centerLocation,
              zoom: 15,
          };

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
              position: centerLocation,
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
              location: centerLocation,
              radius: 5000, // 5 km
              type: ['restaurant']
            };
          
            // A Places Nearby search is initiated with a call to the PlacesService's nearbySearch() or PlacesService's textSearch() method
            const service = new google.maps.places.PlacesService(map);
            service.textSearch(request, (results, status) => {
              if (status === 'OK') {
                for (var i = 0; i < results.length; i++) {
                  if (!results[i].geometry || !results[i].geometry.location) {
                    return;
                  }
                  console.log(results[i].name);
                }
                map.setCenter(centerLocation);
              }
            });
        });
    }
    

    render() {
        return (
          <>
            <Header/>
            <div
                ref={(ref) => { this.googleMapDiv = ref }}
                style={{ height: '50vh', width: '50vw' }}>
            </div>
          </>
        );
    }
}
