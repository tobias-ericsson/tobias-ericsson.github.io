var seawind = (function () {
  var latLongs = [
    { name: 'sibbarp', lat: 55.58, long: 12.91 },
    { name: 'ribban', lat: 55.605, long: 12.96 },
    { name: 'lomma', lat: 55.674, long: 13.055 },
    { name: 'klagshamn', lat: 55.522, long: 12.889 }
  ]

  var YR_NO_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/?'

  // Function to convert wind data into an HTML string
  var windToHtml = function (windList) {
    var today = new Date()

    var formatDate = function (dateString) {
      var date = new Date(dateString)
      //date = new Date(date.getTime() + 2 * 60 * 60 * 1000)
      var day = date.getDate()
      var month = date.getMonth() + 1
      var time = `${String(date.getHours()).padStart(2, '0')}:00`
      //dateString.slice(11, 16)
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

    var formatWeatherSymbol = function (symbolName) {
      var weather = ''
      switch (getOrDefault(symbolName, 'tornado')) {
        case 1:
        case 2: //Sunny
        case 'fair_day':
          weather = '&#127774;'
          break
        case 3:
          weather = '&#9925;'
          break
        case '4':
        case 'cloudy':
        case 'partlycloudy_day':
        case 'partlycloudy_night': //Cloudy
          //Sun and Cloud
          weather = '&#127780;'
          break
        case 5:
          weather = '&#9729;&#9729;'
          break
        case 6:
          weather = '&#9729;&#9729;&#9729;'
          break
        case 8:
        case 'rain':
        case 'lightrain':
        case 'heavyrain': //Rain
          //Umbrella; Cloud with rain
          weather = '&#9748;&#127783'
          break
        case 'rainandthunder':
        case 'lightrainandthunder':
          weather = '&#9748;&#127783;&#9889'
          break
        case 'tornado':
          weather = '&#127786'
          break
        default:
          weather = '&#127786' + ' (' + symbolName + ')'
      }
      return weather
    }
    var formatDirection = function (degrees) {
      var val = Math.floor(degrees / 22.5 + 0.5) % 16
      var arr = [
        'N&uarr;', // North
        'NNE', // North-Northeast
        'NE&nearr;', // Northeast
        'ENE', // East-Northeast
        'E&rarr;', // East
        'ESE', // East-Southeast
        'SE&searr;', // Southeast
        'SSE', // South-Southeast
        'S&darr;', // South
        'SSW', // South-Southwest
        'SW&swarr;', // Southwest
        'WSW', // West-Southwest
        'W&larr;', // West
        'WNW', // West-Northwest
        'NW&nwarr;', // Northwest
        'NNW' // North-Northwest
      ]

      var style = 'color:black'
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

    let html = ''
    let htmlLeft = ''
    for (let wind of windList) {
      if (wind.speed > 5 && wind.speed < 11) {
        style = 'color:green;font-weight:bold'
      } else if (wind.speed < 4 || wind.speed > 13) {
        style = 'color:red'
      } else {
        style = 'color:black'
      }

      var date = new Date(wind.time)
      var clazz = 'even'
      if (date.getDate() % 2 > 0) {
        clazz = 'odd'
      }

      html += `
        <div class="${clazz}">
            <!--<p>${formatDate(wind.time)}</p>  -->
            <p style="${style}">${wind.speed} (${wind.gustSpeed}) m/s</p>
            <p>${formatDirection(wind.direction)}</p>
            <p>${formatWeatherSymbol(wind.symbol)}</p>
        </div>
        `

      htmlLeft +=
        '<div class="' + clazz + '"><p>' + formatDate(wind.time) + '</p></div>'
    }
    return { left: htmlLeft, wind: html }
  }

  // Function to insert the HTML into the DOM at the specified element ID
  var htmlToDom = function (id, html) {
    var element = document.getElementById(id)
    var left = document.getElementById('left')
    if (element) {
      element.innerHTML = html.wind
      left.innerHTML = html.left
    } else {
      console.error(`Element with ID ${id} not found`)
    }
  }

  var fetchWeatherForecast = async function (locationName, lat, long) {
    var extractWindInfo = function (timeseries) {
      var wind = {}

      wind.time = timeseries.time

      if (
        timeseries.data &&
        timeseries.data.instant &&
        timeseries.data.instant.details
      ) {
        let details = timeseries.data.instant.details
        wind.direction = details.wind_from_direction
        wind.speed = details.wind_speed
        wind.gustSpeed = details.wind_speed_of_gust
      }

      if (
        timeseries.data &&
        timeseries.data.next_1_hours &&
        timeseries.data.next_1_hours.summary
      ) {
        wind.symbol = timeseries.data.next_1_hours.summary.symbol_code
      }
      return wind
    }

    try {
      // Construct the full URL with latitude and longitude
      let url = `${YR_NO_URL}lat=${lat}&lon=${long}`

      // Fetch the weather data from the API
      let response = await fetch(url, {
        headers: {
          'User-Agent': 'MalmoSeawind/1.0 (info@powdrsoft.com)'
        }
      })

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      // Parse the JSON response
      let weatherForecastResponse = await response.json()

      // Log or process the data
      console.log(
        `Weather forecast for ${locationName}:`,
        weatherForecastResponse
      )

      var windList = []

      if (
        weatherForecastResponse &&
        weatherForecastResponse.properties &&
        weatherForecastResponse.properties.timeseries
      ) {
        for (let timeseries of weatherForecastResponse.properties.timeseries) {
          var wind = extractWindInfo(timeseries)
          console.log(`Wind data for ${locationName}:`, wind)
          windList.push(wind)
        }
      }

      return { locationName: locationName, windList: windList }
    } catch (error) {
      console.error(
        `Failed to fetch weather forecast for ${locationName}:`,
        error
      )
      throw error
    }
  }

  function run () {
    for (var k = 0; k < latLongs.length; k++) {
      fetchWeatherForecast(latLongs[k].name, latLongs[k].lat, latLongs[k].long)
        .then(weatherForecastResponse => {
          var html = windToHtml(weatherForecastResponse.windList)
          htmlToDom(weatherForecastResponse.locationName, html)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  function getOrDefault (value, defaultValue) {
    return value === null || value === undefined ? defaultValue : value
  }

  return {
    run: run
  }
})()
