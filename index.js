
module.exports = function(bp) {

  bp.hear(/GET_STARTED/i, (event, next) => {
  event.reply('#start')
})

  bp.hear(/GET_STARTED|mo|moro|moron|moi|hei/i, (event, next) => {
    event.reply('#startConvo')
  })

  bp.hear('STARTCONVO.B1', (event, next) => {
    let http = require('http');

    let options = {
      host: 'api.icndb.com',
      path:'/jokes/random',
      method: 'GET',
      header: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    };
    let toparse = '';
    callback = function(response) {
        response.on('data', function (chunk) {
          toparse += chunk
        });
        console.log(toparse);
        response.on('end', function () {
          let json = JSON.parse(toparse);
          joke = json.value.joke;
          event.reply('#jokeResponse', { joke })
        })
    };
    http.request(options, callback).end();
  })


  bp.hear('STARTCONVO.B2', (event, next) => {
    event.reply('#getLocation')
  })

  bp.hear(/hej/i, (event, next) => {
    event.reply('#welhej')
  })



  bp.hear({ type: 'location' }, (event, next) => {
    var http = require('http');

    var opt = {
      host: 'api.openweathermap.org',
      pre: "/data/2.5/weather",
      lat: "?lat=" + event.raw.payload.coordinates.lat,
      lon: "&lon=" + event.raw.payload.coordinates.long,
      app: "&appid=" + process.env.OPENWEATHER_KEY,
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
