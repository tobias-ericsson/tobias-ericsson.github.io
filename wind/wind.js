var wind = (function () {
  var latLongs = [
    { name: "sibbarp", lat: 55.58, long: 12.91 },
    { name: "ribban", lat: 55.605, long: 12.96 },
    { name: "lomma", lat: 55.674, long: 13.055 },
    { name: "klagshamn", lat: 55.522, long: 12.889 },
  ];

  var YR_URL = "https://api.met.no/weatherapi/locationforecast/2.0/?";
  var OM_URL = "https://api.open-meteo.com/v1/forecast";

  var windToHtml = function (windList) {
    var today = new Date();

    var formatDate = function (dateString) {
      var date = new Date(dateString);
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var time = `${String(date.getHours()).padStart(2, "0")}:00`;
      var weekDay = "";
      switch (date.getDay()) {
        case 0: weekDay = "Sun"; break;
        case 1: weekDay = "Mon"; break;
        case 2: weekDay = "Tue"; break;
        case 3: weekDay = "Wen"; break;
        case 4: weekDay = "Thu"; break;
        case 5: weekDay = "Fri"; break;
        case 6: weekDay = "Sat"; break;
      }
      if (day == today.getDate()) {
        return time;
      } else {
        return time + "<br />" + weekDay + "<br />" + day + "/" + month;
      }
    };

    var formatWeatherSymbol = function (symbolName) {
      switch (getOrDefault(symbolName, "unknown")) {
        case "clearsky_day":
        case "fair_day":
        case "clearsky_night":
        case "fair_night":
        case 0: case 1:
          return "&#127774;";
        case "partlycloudy_day":
        case "partlycloudy_night":
        case 2:
          return "&#127780;";
        case "cloudy":
        case 3:
          return "&#9729;";
        case "fog":
        case 45: case 48:
          return "&#127787;";
        case "lightrain":
        case "rain":
        case 51: case 53: case 55:
        case 61: case 63:
        case 80: case 81:
          return "&#127783;";
        case "heavyrain":
        case 65: case 82:
          return "&#9748;&#127783;";
        case "rainandthunder":
        case "lightrainandthunder":
        case 95: case 96: case 99:
          return "&#9748;&#127783;&#9889;";
        case "unknown":
          return "";
        default:
          return "&#127786;";
      }
    };

    var formatDirection = function (degrees) {
      var val = Math.floor(degrees / 22.5 + 0.5) % 16;
      var arr = [
        "N&uarr;", "NNE", "NE&nearr;", "ENE",
        "E&rarr;", "ESE", "SE&searr;", "SSE",
        "S&darr;", "SSW", "SW&swarr;", "WSW",
        "W&larr;", "WNW", "NW&nwarr;", "NNW",
      ];
      return '<span style="color:black">' + arr[val] + "</span> " + degrees + "&deg;";
    };

    var formatWind = function (windSpeed, windGustSpeed) {
      if (windGustSpeed) {
        return `${windSpeed} (${windGustSpeed})<span class="speedunit">m/s</span>`;
      }
      return windSpeed + '<span class="speedunit">m/s</span>';
    };

    var averageOrFallback = function (firstValue, secondValue) {
      var firstValid = typeof firstValue === "number" && !Number.isNaN(firstValue);
      var secondValid = typeof secondValue === "number" && !Number.isNaN(secondValue);

      if (firstValid && secondValid) {
        return Number(((firstValue + secondValue) / 2).toFixed(1));
      }
      if (firstValid) {
        return firstValue;
      }
      if (secondValid) {
        return secondValue;
      }
      return null;
    };

    var colorStyle = function (speed) {
      if (speed > 5.1 && speed < 11) return "wind-good";
      if (speed < 4.1 || speed > 13)  return "wind-bad";
      return "wind-ok";
    };

    let html = "";
    let htmlLeft = "";
    for (let entry of windList) {
      var date = new Date(entry.time);
      if (date.getHours() > 7 && date.getHours() <= 21) {
        var clazz = date.getDate() % 2 > 0 ? "odd" : "even";
        var averageSpeed = averageOrFallback(
          entry.yr.speed,
          entry.om ? entry.om.speed : null
        );
        var averageGustSpeed = averageOrFallback(
          entry.yr.gustSpeed,
          entry.om ? entry.om.gustSpeed : null
        );
        var windClass = averageSpeed != null ? colorStyle(averageSpeed) : "";

        if (entry.om && entry.om.speed != null) {
          html += `
            <div class="${clazz} wind-cell">
              <p class="${windClass}">${formatWind(averageSpeed, averageGustSpeed)}</p>
              <p>${formatDirection(entry.yr.direction)}</p>
              <p>${formatWeatherSymbol(entry.yr.symbol)} ${formatWeatherSymbol(entry.om.weatherCode)}</p>
            </div>
          `;
        } else {
          html += `
            <div class="${clazz} wind-cell">
              <p class="${windClass}">${formatWind(averageSpeed, averageGustSpeed)}</p>
              <p>${formatDirection(entry.yr.direction)}</p>
              <p>${formatWeatherSymbol(entry.yr.symbol)}</p>
            </div>
          `;
        }

        htmlLeft += `
          <div class="${clazz}">
            <div class="time-display">${formatDate(entry.time)}</div>
          </div>
        `;
      }
    }
    return { left: htmlLeft, wind: html };
  };

  var htmlToDom = function (id, html) {
    var element = document.getElementById(id);
    var left = document.getElementById("left");
    if (element) {
      element.innerHTML = html.wind;
      left.innerHTML = html.left;
    } else {
      console.error(`Element with ID ${id} not found`);
    }
  };

  var fetchYR = async function (locationName, lat, lon) {
    let response = await fetch(`${YR_URL}lat=${lat}&lon=${lon}`, {
      headers: { "User-Agent": "MalmoSeawind/1.0 (info@powdrsoft.com)" },
    });
    if (!response.ok) throw new Error(`YR HTTP ${response.status}`);
    let data = await response.json();

    let windList = [];
    if (data && data.properties && data.properties.timeseries) {
      for (let ts of data.properties.timeseries) {
        let entry = { time: ts.time };
        if (ts.data && ts.data.instant && ts.data.instant.details) {
          let d = ts.data.instant.details;
          entry.direction = d.wind_from_direction;
          entry.speed = d.wind_speed;
          entry.gustSpeed = d.wind_speed_of_gust;
        }
        if (ts.data && ts.data.next_1_hours && ts.data.next_1_hours.summary) {
          entry.symbol = ts.data.next_1_hours.summary.symbol_code;
        }
        windList.push(entry);
      }
    }
    return { locationName, windList };
  };

  var fetchOM = async function (locationName, lat, lon) {
    let url = `${OM_URL}?latitude=${lat}&longitude=${lon}` +
      `&hourly=wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code` +
      `&wind_speed_unit=ms&timezone=UTC&forecast_days=10`;
    let response = await fetch(url);
    if (!response.ok) throw new Error(`Open-Meteo HTTP ${response.status}`);
    let data = await response.json();

    let windList = [];
    if (data && data.hourly && data.hourly.time) {
      let h = data.hourly;
      for (let i = 0; i < h.time.length; i++) {
        windList.push({
          // append Z so Date parsing treats it as UTC
          time: h.time[i] + "Z",
          speed: h.wind_speed_10m[i],
          direction: h.wind_direction_10m[i],
          gustSpeed: h.wind_gusts_10m[i],
          weatherCode: h.weather_code[i],
        });
      }
    }
    return { locationName, windList };
  };

  var mergeWindLists = function (yrList, omList) {
    // key om entries by epoch ms for fast lookup
    const omMap = new Map(omList.map((e) => [new Date(e.time).getTime(), e]));

    return yrList.map((yrEntry) => {
      const omEntry = omMap.get(new Date(yrEntry.time).getTime());
      return {
        time: yrEntry.time,
        yr: {
          speed: yrEntry.speed,
          gustSpeed: yrEntry.gustSpeed,
          direction: yrEntry.direction,
          symbol: yrEntry.symbol,
        },
        om: omEntry ? {
          speed: omEntry.speed,
          gustSpeed: omEntry.gustSpeed,
          direction: omEntry.direction,
          weatherCode: omEntry.weatherCode,
        } : null,
      };
    });
  };

  function run() {
    for (var k = 0; k < latLongs.length; k++) {
      var loc = latLongs[k];
      Promise.all([
        fetchYR(loc.name, loc.lat, loc.long),
        fetchOM(loc.name, loc.lat, loc.long).catch(() => ({ locationName: loc.name, windList: [] })),
      ])
        .then(([yrResponse, omResponse]) => {
          var merged = mergeWindLists(yrResponse.windList, omResponse.windList);
          var html = windToHtml(merged);
          htmlToDom(yrResponse.locationName, html);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function getOrDefault(value, defaultValue) {
    return value === null || value === undefined ? defaultValue : value;
  }

  return { run };
})();
