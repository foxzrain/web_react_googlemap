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
            const map = new google.maps.Map(
                this.googleMapDiv,
                defaultMapOptions);

            const marker = new google.maps.Marker({
              position: { lat: 13.779820829768585, lng: 100.54464812602707 },
              map: map, // must have
            });
            /*
                store them in the state so you can use it later
                E.g. call a function on the map object:
                    this.state.map.panTo(...)
                E.g. create a new marker:
                    new this.state.google.maps.Marker(...)
            */
            this.setState({
                google: google,
                map: map,
                marker: marker,
            });
        });
    }

    render() {
        return (
            <div
                ref={(ref) => { this.googleMapDiv = ref }}
                style={{ height: '100vh', width: '100%' }}>
            </div>
        )
    }
}
