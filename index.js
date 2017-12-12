
module.exports = function(bp) {

  bp.hear(/GET_STARTED|mo|moro|moron|moi|hei/i, (event, next) => {
    event.reply('#welhei')
  })

  bp.hear(/hej/i, (event, next) => {
    event.reply('#welhej')
  })

  bp.hear({ type: 'location' }, (event, next) => {
    var http = require('http');
    var stra = require('./data/pass');

    var opt = {
      host: 'api.openweathermap.org',
      pre: "/data/2.5/weather",
      lat: "?lat=" + event.raw.payload.coordinates.lat,
      lon: "&lon=" + event.raw.payload.coordinates.long,
      app: "&appid=" + stra.ow(),
      lang: "&lang=fi",
      unit: "&units=metric"
    };
    var options = {
      host: opt.host,
      path: opt.pre + opt.lat + opt.lon + opt.lang + opt.unit + opt.app,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    var toparse = '';
    callback = function(response) {
        response.on('data', function (chunk) {
          toparse += chunk
        });
        response.on('end', function () {
          var json = JSON.parse(toparse);
          var obj = {
          	name: json.name,
          	des: json.weather[0].description,
          	temp: json.main.temp,
          	humidity: json.main.humidity,
          	wind: json.wind.speed
          }
          event.reply('#where_location', { obj })
        })
    };
    http.request(options, callback).end();
  })


  bp.hear({
    type: 'message',
    text: /.+/
  }, (event, next) => {
    event.reply('#wat')
  })
  
};

