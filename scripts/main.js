// imports
import locationsArray from '../init-locations.js';


// loaction id assigned to locationElement
let locationElement = document.getElementById("location");

window.addEventListener('load', main);
locationElement.addEventListener('click', locationHandler);
locationElement.addEventListener('touch', locationHandler);

function main() {
    console.log('Page is fully loaded');
}

// initializing the current position lat and lon and error to true
let currentlat;
let currentlon;
let error = true;

// collects current location
async function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(position => {
        return position;
    });
}

// getLocation function to itearte through the list of locations

async function locationHandler() {
    let locText = await getLocation();
    currentlat = locText.coords.latitude;
    document.getElementById("device-lat").innerHTML = "This is about device-lat: " + currentlat.toFixed(6);
    currentlon = locText.coords.longitude;
    document.getElementById("device-long").innerHTML = "This is about device-long: " + currentlon.toFixed(6);

    locationsArray.forEach(function(value) {
        if (isInside(value.Latitude, value.Longitude)) {
            document.getElementById("locationAnswer").innerHTML = value.Name;
            error = false;
        }
    });

    if (error) {
        document.getElementById("error-message").innerHTML = "You're not within the range of the location.";
    } else {
        document.getElementById("error-message").innerHTML = "";
    }
}


// distance between the locations

function distanceBetweenLocations(questLat, questLon) {
    const R = 6371e3;
    const φ1 = currentlat * Math.PI / 180;
    const φ2 = questLat * Math.PI / 180;
    const Δφ = (questLat - currentlat) * Math.PI / 180;
    const Δλ = (questLon - currentlon) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d; // in metres
}


//Calculates distance and checks if within the range of 20 meters
function isInside(questLat, questLon) {
    let distance = distanceBetweenLocations(questLat, questLon);
    console.log("distance: " + distance);
    if (distance < 20) {
        return true;
    } else {
        return false;
    }
}