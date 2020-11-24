import {Card,Button} from 'react-bootstrap';
import React, {Component} from 'react';
import { app } from '../base';

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

    async getLocation() {
        await navigator.geolocation.getCurrentPosition((position) => {
            this.setState({latlon: (this.updateLoc(position.coords.latitude, position.coords.longitude))});
            // app.firebase().collection("/users").doc(app.auth().currentUser.uid).update({
            //     location: this.state.latlon
            // });
            this.testMan();
        })
    }

    updateLoc(lat, long) {
        return([Math.round((lat + Number.EPSILON) * 10) / 10, Math.round((long + Number.EPSILON) * 10) / 10])
    }

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

    testMan() {
        let distance = this.getDistanceFromLatLonInKm(this.state.latlon[0], this.state.latlon[1], 35.9132, -79.0558)
        if (distance < 50) {
            this.setState({close: true})
        } else if (distance < 200) {
            this.setState({middle: true})
        } else if (this.state.latlon){
            this.setState({far: true})
        } else {            
        }
    }

    onClick() {
        this.setState({isClicked: true})
        this.getLocation()
    }

    render() {
        return(
            <Card style={{width: "60%", marginLeft: "20%"}}>
                <Card.Title style={{marginTop: "10px", marginBottom: "0px"}} className="text-center">Use this button to determine your proximity to danger!</Card.Title>
                <Card.Body className="text-center" color="#97c0e6">
                    {(this.state.isClicked)
                    ?(this.state.close)
                        ? <div style={{backgroundColor: "#FF0000"}}>You better watch what you say! Rameses' is nearby.</div>
                        :(this.state.middle)
                            ? <div style={{backgroundColor: "#ffa500"}}>You might be safe, but for how long? Ramses has good hearing...</div>
                            : (this.state.far)
                                ?<div style={{backgroundColor: "#00FF00"}}>You're quite far away, so maybe your words won't reach Ramses...</div>
                                :<Button style={{backgroundColor: "#13294B"}}>Click if you dare!</Button>
                        :<Button onClick={this.onClick} style={{backgroundColor: "#13294B"}}>Click if you dare!</Button>
                        }
                </Card.Body>
            </Card>
        )
    }
}
export default APISection;