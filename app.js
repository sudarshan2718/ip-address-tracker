const ipInput = document.querySelector('.ipinput');
const btn = document.querySelector('.arrow');
const ip = document.querySelector('#ip');
const isp = document.querySelector('#isp');
const location_display = document.querySelector('#location');
const timezone = document.querySelector('#timezone');
const apiKey = "at_w8CWWvvo7xkcfmWPurm7dvD7N0xYf";
let ipAddress = '';
let domain = '';
let coordinates = [19.07283,72.88261]

async function fetchLocation(url){
    const response = await fetch(url)
    const data = await response.json()
    const {ip, isp,location} = data;
    
    const ipData = {
        ip,isp,location: `${location.city},${location.region} ${location.postalCode}`,timezone: location.timezone
    }
    const ipLocation = {
        latitude: location.lat,longitude: location.lng
    }
    return {ipData, ipLocation};
}
function checkIsValidDomain(domain) { 
    var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
    return domain.match(re)? true : false;
}

let map = L.map('map').setView(coordinates, 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const mapIcon = L.icon({
    iconUrl: './images/icon-location.svg', iconSize: [30, 38]
})
let marker = L.marker(coordinates, {
    icon: mapIcon
}).addTo(map);
let loadDiv = document.querySelector('#load');
loadDiv.classList.add('load');
let animate = () => loadDiv.classList.toggle('load');
animate();

// animate();
async function sendRequest(){
    
    if(ipInput.value && ipInput.value.length > 0) {
        let url = ''
        if(checkIsValidDomain(ipInput.value)){
            domain = ipInput.value;
            url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${domain}`;
        }else{
            ipAddress = ipInput.value;
            url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`;
        }

        setTimeout(function() {
            animate();
            fetchLocation(url).then(data => {
                ip.innerHTML = data.ipData.ip;
                isp.innerHTML = data.ipData.isp;
                location_display.innerHTML = data.ipData.location;
                timezone.innerHTML = `UTC` + data.ipData.timezone;
                coordinates = [data.ipLocation.latitude, data.ipLocation.longitude];
                map.removeLayer(marker)
                map.setView(coordinates, 5);
                marker = L.marker(coordinates, {
                    icon: mapIcon
                }).addTo(map);
            }).catch(function (err) {
                alert('please try again, network error');
            })
        },1999)
        animate();
    }
    ipInput.value = '';
}
btn.addEventListener('click',  sendRequest)
ipInput.addEventListener('keypress', async(event) => {
    if(event.keyCode === 13) {
        sendRequest();
    }
})
