import 'https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.js'

const mapbox_Token="pk.eyJ1Ijoicml5YWJhamFqIiwiYSI6ImNreTF6am53MzBnbTAycm1rdTNlZmdjZGgifQ.5xRFuHNqkfO0L240TEor3A";
L.mapbox.accessToken = mapbox_Token;

var map = L.mapbox.map('map')
    .setView([0,20], 1.5)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/dark-v10'));

fetch("/placelistt.json")
.then(response=>response.json())
.then(data=>{

    const{reports}=data;
    reports
        .filter(report=>!report.hide)
        .forEach(report => {
            const{infected,id}=report;
            console.log(report);

            const getcolor = count=>{
            if(count<=5000){
                    return "blue"
                }
            if(count<10000){
                return "grey"
            }
            else if(count>=10000){return "red"}};
            
            L.marker([report.latitude, report.longitude], {
                icon: L.mapbox.marker.icon({
                    'marker-size': 'small',
                    // 'marker-symbol': 'virus',
                    'marker-color': getcolor(infected)
                })
            }).addTo(map); 
         });

    
});