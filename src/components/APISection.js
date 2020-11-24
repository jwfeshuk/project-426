import {Card,Button} from 'react-bootstrap';
import React, {Component} from 'react';

class APISection extends Component {
    constructor() {
        super()
        this.state = {
            isClicked: false,
            close: false,
            middle: false,
            ready: false,
            latlon: []
        }
        this.onClick = this.onClick.bind(this)
    }

    // getLocation() {
    //     navigator.geolocation.getCurrentPosition(() => {
    //         this.setState({latlon: [Math.round((position.coords.latitude + Number.EPSILON) * 10) / 10, Math.round((position.coords.longitude + Number.EPSILON) * 10) / 10]})
    //     });
    // }

    getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
    }
      
    deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    async onClick() {
        this.setState({isClicked: true})
        await this.getLocation()
        let distance = this.getDistanceFromLatLonInKm(this.state.latlon[1], this.state.latlon[0], 35.9132, 79.0558)
        if (distance < 10) {
            this.setState({close: true})
        } else if (distance < 25) {
            this.setState({middle: true})
        } else {
            this.setState({far: true})
        }
    }

    render() {
        return(
            <Card>
                <Card.Body>
                    {(this.state.isClicked)
                    ?(this.state.close)
                        ? <div>You better watch what you say! Rameses' is nearby.</div>
                        :(this.state.middle)
                            ? <div>You might be safe, but for how long? Ramses has good hearing...</div>
                            : <div>You're quite far away, so maybe your words won't reach Ramses...</div>
                    :<Button onClick={this.onClick} >Click if you dare!</Button>
                        }
                </Card.Body>
            </Card>
        )
    }
}
export default APISection;