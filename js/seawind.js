var seawind = (function () {
  var latLongs = [
    { name: 'lomma', lat: 55.68, long: 13.055 },
    { name: 'haboljung', lat: 55.69, long: 13.051 },
    { name: 'ribban', lat: 55.602, long: 12.956 },
    { name: 'klagshamn', lat: 55.522, long: 12.889 }
  ]

  var latLongs2 = [
    { name: 'Sibbarp', lat: 55.58, long: 12.91 },
    { name: 'Ribban', lat: 55.605, long: 12.96 },
    { name: 'Lomma', lat: 55.674, long: 13.055 }
  ]

  var YR_NO_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?'

  var SMHI_URL =
    'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point'

  var today = new Date()

  function log (message) {
    if (typeof console == 'object') {
      console.log(arguments.callee.caller.name + ' ' + message)
    }
  }

  function get (url, id, successCallback) {
    log('ajax: ' + url)
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url,
      success: function (result) {
        log('ajax: ' + JSON.stringify(result))
        successCallback(id, result)
      },
      error: function (xhr, status, error) {
        log('ajax error: ' + status + ' ' + JSON.stringify(error))
      }
    })
  }

  var extractWeatherList = function (result) {
    var times = []
    for (
      var k = 0;
      k < result.timeSeries.length - 18;
      k = Math.floor(k * 1.05) + 2
    ) {
      var hour = result.timeSeries[k].validTime.slice(11, 13)
      if (hour > 8 && hour < 21) {
        times.push(extractUsefulInfo(result, k))
      }
    }
    return times
  }

  var extractUsefulInfo = function (result, k) {
    function param (number) {
      return result.timeSeries[k].parameters[number].values[0]
    }

    var weather = {}
    weather.time = result.timeSeries[k].validTime
    weather.windDirection = param(3)
    weather.windSpeed = param(4)
    weather.windGustSpeed = param(11)
    weather.symbol = param(18)
    return weather
  }

  function weatherSectionList (domId, weatherList) {
    log(domId)
    var place = document.getElementById(domId)
    var left = document.getElementById('left')
    var style = 'color:black'
    var today = new Date()
    if (place) {
      var htmlText = '',
        htmlLeft = ''
      var w
      for (var k = 0; k < weatherList.length; k++) {
        w = weatherList[k]
        var date = new Date(w.time)
        var clazz = 'even'
        if (date.getDate() == today.getDate() + 1) {
          clazz = 'odd'
        }
        if (w.windSpeed > 5 && w.windSpeed < 11) {
          style = 'color:green;font-weight:bold'
        } else if (w.windSpeed < 4 || w.windSpeed > 13) {
          style = 'color:red'
        } else {
          style = 'color:black'
        }

        htmlText =
          htmlText +
          '<div class="' +
          clazz +
          '"><p style="' +
          style +
          '">' +
          w.windSpeed.toFixed(1) +
          ' (' +
          w.windGustSpeed.toFixed(1) +
          ') m/s</p><p>' +
          formatDirection(w.windDirection) +
          '</p><p>' +
          formatWeatherSymbol(w.symbol) +
          '</p>' +
          '</div>'

        htmlLeft =
          htmlLeft +
          '<div class="' +
          clazz +
          '"><p>' +
          formatDate(w.time) +
          '</p></div>'
      }
      place.innerHTML = htmlText
      left.innerHTML = htmlLeft
    }
  }

  function weatherGraph (domId, weatherList) {
    log(domId)
    var place = document.getElementById(domId)
    var style = 'color:black'
    var today = new Date()
    if (place) {
      //weatherSectionList(weatherList, today, style, place);
    }

    place.innerHTML = htmlText
  }

  var addWeatherSectionsToDomElement = function (domId, weatherList) {
    weatherSectionList(domId, weatherList)
  }

  var formatWeatherSymbol = function (symbolId) {
    var weather = 'Sunny'
    switch (symbolId) {
      case 1:
      case 2: //Sunny
        weather = '&#9788;'
        break
      case 3:
        weather = '&#9925;'
        break
      case 4: //Cloudy
        weather = '&#9729;'
        break
      case 5:
        weather = '&#9729;&#9729;'
        break
      case 6:
        weather = '&#9729;&#9729;&#9729;'
        break
      case 8:
      case 12: //Rain
        weather = '&#9730;&#9928'
        break
      default:
        weather = 'Bad' + ' (' + symbolId + ')'
    }
    return weather
  }

  var formatDate = function (dateString) {
    var date = new Date(dateString)
    var day = date.getDate()
    var month = date.getMonth() + 1
    var time = dateString.slice(11, 16)
    var weekDay = ''

    switch (date.getDay()) {
      case 0:
        weekDay = 'Sun'
        break
      case 1:
        weekDay = 'Mon'
        break
      case 2:
        weekDay = 'Tue'
        break
      case 3:
        weekDay = 'Wen'
        break
      case 4:
        weekDay = 'Thu'
        break
      case 5:
        weekDay = 'Fri'
        break
      case 6:
        weekDay = 'Sat'
        break
    }

    if (day == today.getDate()) {
      return time
    } else {
      return time + ' ' + weekDay + ' ' + day + '/' + month
    }
  }

  var formatDirection = function (degrees) {
    var val = Math.floor(degrees / 22.5 + 0.5) % 16
    var arr = [
      'N&#8595;',
      'NNE',
      'NE',
      'ENE',
      'E&#8592;',
      'ESE',
      'SE',
      'SSE',
      'S&#8593;',
      'SSW',
      'SW',
      'WSW',
      'W&#8594;',
      'WNW',
      'NW',
      'NNW'
    ]
    var style = 'color:black'
    if (val > 0 && val < 8) {
      style = 'color:red;'
    }
    if (val > 8 && val < 19) {
      style = 'color:green;font-weight:bold'
    }
    return (
      '<span style="' +
      style +
      '" >' +
      arr[val] +
      '</span> ' +
      degrees +
      '&deg;'
    )
  }

  function run () {
    for (var k = 0; k < latLongs.length; k++) {
      get(
        SMHI_URL +
          '/lon/' +
          latLongs[k].long +
          '/lat/' +
          latLongs[k].lat +
          '/data.json',
        latLongs[k].name,
        function (id, result) {
          var weatherList = extractWeatherList(result)
          addWeatherSectionsToDomElement(id, weatherList)
        }
      )
    }
  }
  return {
    run: run
  }
})()
