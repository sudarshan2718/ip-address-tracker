
// const url = "https://geo.ipify.org/api/v1?apiKey=at_w8CWWvvo7xkcfmWPurm7dvD7N0xYf&ipAddress=2409:4070:4896:a574:11bd:b489:819c:dd62"
// async function fetchLocation(url){
//     const response = await fetch(url)
//     const data = await response.json()
//     const {ip, isp,location} = data;
//     const ipData = {
//         ip,isp,location: `${location.city},${location.region} ${location.postalCode}`
//     }
//     const ipLocation = {
//         latitude: location.lat,longitude: location.lng
//     }
//     return {ipData, ipLocation};
// }

// // fetchLocation(url).then(data => {
// //     console.log(data)
// // })
let map = L.map('map').setView([20.593683, 78.962883], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const mapIcon = L.icon({
    iconUrl: './images/icon-location.svg', iconSize: [30, 38]
}) 
L.marker([19.07283,72.88261], {
    icon: mapIcon
}).addTo(map);