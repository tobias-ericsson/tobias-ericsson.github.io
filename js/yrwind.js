var seawind = (function () {
  var latLongs2 = [
    { name: 'Sibbarp', lat: 55.58, long: 12.91 },
    { name: 'Ribban', lat: 55.605, long: 12.96 },
    { name: 'Lomma', lat: 55.674, long: 13.055 }
  ]

  var YR_NO_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/?'

  var fetchWeatherForecast = function (locationName, lat, long) {}

  // Function to convert wind data into an HTML string
  var windToHtml = function (wind) {
    console.log(wind)
    return `
        <div class="wind-info">
            <p>Time: ${wind.time}</p>
            <p>Direction: ${wind.direction}°</p>
            <p>Speed: ${wind.speed} m/s</p>
            <p>Gust Speed: ${wind.gustSpeed} m/s</p>
            <p>Symbol: ${wind.symbol}</p>
        </div>
    `
  }

  // Function to insert the HTML into the DOM at the specified element ID
  var htmlToDom = function (id, html) {
    var element = document.getElementById(id)
    if (element) {
      element.innerHTML = html
    } else {
      console.error(`Element with ID ${id} not found`)
    }
  }

  var fetchWeatherForecast = async function (locationName, lat, long) {
    try {
      // Construct the full URL with latitude and longitude
      let url = `${YR_NO_URL}lat=${lat}&lon=${long}`

      // Fetch the weather data from the API
      let response = await fetch(url, {
        headers: {
          'User-Agent': 'YourAppName/1.0 (your-email@example.com)' // Replace with your app name and email
        }
      })

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      // Parse the JSON response
      let data = await response.json()

      // Log or process the data
      console.log(`Weather forecast for ${locationName}:`, data)

      // Extract the necessary wind information from the response
      var wind = {}
      wind.location = locationName

      if (
        data &&
        data.properties &&
        data.properties.timeseries &&
        data.properties.timeseries.length > 0
      ) {
        let timeseries = data.properties.timeseries[0] // Get the first timeseries entry
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
      }

      // Log the wind object
      console.log(`Wind data :`, wind)

      // Return the data for further processing
      return wind
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error(
        `Failed to fetch weather forecast for ${locationName}:`,
        error
      )
      throw error
    }
  }

  function run () {
    fetchWeatherForecast('Oslo', 59.91, 10.75)
      .then(weatherForecastResponse => {
        var html = windToHtml(weatherForecastResponse)
        htmlToDom('weatherContainer', html) // Replace 'weatherContainer' with the actual ID of your target element
      })
      .catch(error => {
        // Handle errors from the function
        console.error(error)
      })
  }

  return {
    run: run
  }
})()
