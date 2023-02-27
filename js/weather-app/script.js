const API_KEY = 'a1340a2258fcac0d606e403073f9390f'
const searchForm = document.querySelector('form')
const searchInput = document.querySelector('#search')
const unitSelect = document.querySelector('#unit-select')
const mainContainer = document.querySelector('#main-container')
const currentTempCEle = document.querySelector('#current-temp-c')
const currentTempFEle = document.querySelector('#current-temp-f')
const currentFeelsTempCEle = document.querySelector('#current-feels-temp-c')
const currentFeelsTempFEle = document.querySelector('#current-feels-temp-f')
const currentDescriptionEle = document.querySelector('#current-description')
const currentWindEle = document.querySelector('#current-wind')
const currentWindArrowEle = document.querySelector('#current-wind-arrow')
const currentHumidityEle = document.querySelector('#current-humidity')
const currentVisibilityEle = document.querySelector('#current-visibility')
const currentPressureEle = document.querySelector('#current-pressure')
const currentCloudsEle = document.querySelector('#current-clouds')
const currentRainEle = document.querySelector('#current-rain')
const currentSnowEle = document.querySelector('#current-snow')
const currentIconsContainer = document.querySelector('#current-icons')
const currentTimeEle = document.querySelector('#current-time')
const placeEle = document.querySelector('#place')
const forecastTabHeaderContainer = document.querySelector('#tab-header')
const forecastTabContentContainer = document.querySelector('#tab-content')
const loadingContainer = document.querySelector('#loading-container')
const loadingEle = document.querySelector('#loading')
const messageEle = document.querySelector('#message')

searchForm.addEventListener('submit', async e => {
    e.preventDefault()
    fetchAndRender(searchInput.value)
    // const placeDetail = await fetchLatLong(searchInput.value)
    // fetchAndRender(placeDetail.place, placeDetail.lat, placeDetail.lon)
})
unitSelect.addEventListener('change', e => {
    changeUnit(e.target.value)
})

forecastTabHeaderContainer.addEventListener('click', e => {
    const targetEle = e.target
    if (!targetEle.classList.contains('tab-header-item')) {
        return
    }
    if (targetEle.classList.contains('active')) {
        return
    }
    const activeTab = forecastTabHeaderContainer.querySelector('.active')
    if (activeTab) {
        activeTab.classList.remove('active')
        forecastTabContentContainer.querySelector('.show').classList.remove('show')
    }
    const tabId = targetEle.dataset.targetId
    targetEle.classList.add('active')
    forecastTabContentContainer.querySelector(`[data-id="${tabId}"]`).classList.add('show')
})



async function fetchData(url) {
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`${res.type},${res.status}, ${res.statusText}`)
        }
        const data = await res.json()
        return data
    } catch (error) {
        throw error
    }
}
async function fetchLatLong(place) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${API_KEY}`
    const placeDetail = await fetchData(url)
    if (!placeDetail[0]) {
        throw new Error('no data for place ' + place)
    }
    const { name, country, lat, lon } = placeDetail[0]
    return {
        place: name + ', ' + country,
        lat,
        lon
    }
}
async function fetchCurrentWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    const currentWeather = await fetchData(url)
    if (Object.keys(currentWeather).length === 0) {
        throw new Error('no data current weather')
    }
    return extractWeatherDetail(currentWeather)
}
async function fetchForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    const forecast = await fetchData(url)
    if (Object.keys(forecast).length === 0) {
        throw new Error('no data forecast')
    }
    const timezone = forecast.city.timezone
    const forecastMap = new Map()
    for (const item of forecast.list) {
        const detail = extractWeatherDetail(item, timezone)
        if (!forecastMap.has(detail.displayDate)) {
            forecastMap.set(detail.displayDate, [detail])
        } else {
            const arr = forecastMap.get(detail.displayDate)
            arr.push(detail)
        }
    }
    return forecastMap
}

async function fetchAndRender(place, lat, lon) {
    renderLoading(true)
    try {
        if (!lat || !lon) {
            const placeDetail = await fetchLatLong(searchInput.value)
            place = placeDetail.place
            lat = placeDetail.lat
            lon = placeDetail.lon
        }
        mainContainer.classList.add('show')
        placeEle.textContent = place
        const currentWeatherPromise = fetchCurrentWeather(lat, lon)
        const forecastMapPromise = fetchForecast(lat, lon)
        const currentWeather = await currentWeatherPromise
        const forecastMap = await forecastMapPromise

        const colorValue = 72 - Math.abs(12 - currentWeather.dateObj.hour) * 6
        document.body.style.backgroundColor = `hsl(220,${colorValue}%,${colorValue}%)`

        renderCurrentWeather(currentWeather)
        renderForecast(forecastMap)
        renderMessage(false)
    } catch (error) {
        console.log(error);
        renderMessage(error.message)
    } finally {
        renderLoading(false)
    }

}
function renderCurrentWeather(currentWeather) {
    currentTempCEle.textContent = currentWeather.tempC
    currentTempFEle.textContent = currentWeather.tempF
    currentFeelsTempCEle.textContent = currentWeather.feelsLikeC
    currentFeelsTempFEle.textContent = currentWeather.feelsLikeF
    currentDescriptionEle.textContent = currentWeather.description
    currentWindEle.textContent = currentWeather.wind.speed
    currentHumidityEle.textContent = currentWeather.humidity
    currentVisibilityEle.textContent = currentWeather.visibility
    currentPressureEle.textContent = currentWeather.pressure
    currentCloudsEle.textContent = currentWeather.clouds
    currentRainEle.textContent = currentWeather.rain
    currentSnowEle.textContent = currentWeather.snow

    currentWindArrowEle.style.transform = `rotateZ(${currentWeather.wind.deg + 180}deg)`

    currentIconsContainer.replaceChildren()
    for (const icon of currentWeather.icons) {
        const img = document.createElement('img')
        img.className = 'icon'
        img.src = `./images/${icon}.svg`
        currentIconsContainer.appendChild(img)
    }

    // const date = new Date()
    // const miliSec = date.getTime() + date.getTimezoneOffset() * 60 * 1000 + currentWeather.timezone * 1000
    // const newDate = new Date(miliSec)
    currentTimeEle.textContent = currentWeather.displayTime
}
function renderMessage(msg) {
    if (msg) {
        messageEle.classList.add('show')
        messageEle.textContent = msg
    } else {
        messageEle.classList.remove('show')
    }
}
function renderLoading(isLoading) {
    if (isLoading) {
        loadingContainer.classList.add('show')
        loadingEle.style.borderTopColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
        loadingEle.style.borderRightColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
        loadingEle.style.borderBottomColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
        loadingEle.style.borderLeftColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
    } else {
        loadingContainer.classList.remove('show')
    }
}
function renderForecast(forecastMap) {
    const keys = forecastMap.keys()

    forecastTabHeaderContainer.replaceChildren()
    forecastTabContentContainer.replaceChildren()
    for (const key of keys) {
        const tabHeader = document.createElement('li')
        tabHeader.className = 'tab-header-item'
        tabHeader.textContent = key
        tabHeader.dataset.targetId = key
        forecastTabHeaderContainer.appendChild(tabHeader)

        const tabPanel = document.createElement('ol')
        tabPanel.className = 'tab-panel'
        tabPanel.dataset.id = key
        forecastTabContentContainer.appendChild(tabPanel)
        for (const item of forecastMap.get(key)) {
            const tabItem = document.createElement('li')
            tabItem.className = 'tab-item'
            tabPanel.appendChild(tabItem)

            const itemHeader = document.createElement('p')
            itemHeader.className = 'item-header'
            itemHeader.textContent = item.displayTime
            tabItem.appendChild(itemHeader)

            const iconsContainer = document.createElement('div')
            tabItem.appendChild(iconsContainer)
            iconsContainer.className = 'forecast-icons'
            for (const icon of item.icons) {
                const img = document.createElement('img')
                img.className = 'icon'
                img.src = `./images/${icon}.svg`
                iconsContainer.appendChild(img)
            }

            const tempCEle = document.createElement('p')
            tabItem.appendChild(tempCEle)
            tempCEle.className = 'temp-c'
            tempCEle.textContent = item.tempC + '℃'

            const tempFEle = document.createElement('p')
            tabItem.appendChild(tempFEle)
            tempFEle.className = 'temp-f'
            tempFEle.textContent = item.tempF + '℉'

            const descriptionEle = document.createElement('p')
            tabItem.appendChild(descriptionEle)
            descriptionEle.textContent = item.description


            if (item.rain) {
                const rainEle = document.createElement('p')
                rainEle.textContent = 'rain ' + item.rain + ' mm'
                tabItem.appendChild(rainEle)
            }
            if (item.snow) {
                const snowEle = document.createElement('p')
                snowEle.textContent = 'snow ' + item.snow + ' mm'
                tabItem.appendChild(snowEle)
            }
            const cloudsEle = document.createElement('p')
            cloudsEle.textContent = 'clouds ' + item.clouds + '%'
            tabItem.appendChild(cloudsEle)

            const windEle = document.createElement('p')
            windEle.textContent = 'wind ' + item.wind.speed + ' m/s'
            tabItem.appendChild(windEle)

            const humidEle = document.createElement('p')
            humidEle.textContent = 'humidity ' + item.humidity + '%'
            tabItem.appendChild(humidEle)
        }
    }
    forecastTabHeaderContainer.firstElementChild.click()

}
function changeUnit(classNameToAdd) {
    const values = ['metric', 'imperial']
    if (mainContainer.classList.contains(classNameToAdd)) {
        return
    }
    if (!values.includes(classNameToAdd)) {
        return
    }
    let classNameToReplace
    for (const value of values) {
        if (mainContainer.classList.contains(value)) {
            classNameToReplace = value
            break
        }
    }
    if (classNameToReplace) {
        mainContainer.classList.replace(classNameToReplace, classNameToAdd)
    } else {
        mainContainer.classList.add(classNameToAdd)
    }
}
function extractWeatherDetail(weatherDetail, weatherTimezone = 0) {
    let { timezone, dt, main: { temp: tempC, feels_like: feelsLikeC, pressure, humidity }, visibility, wind, clouds: { all: clouds }, rain, snow } = weatherDetail
    const { descriptions, icons } = weatherDetail.weather.reduce((obj, current) => {
        obj.descriptions.push(current.description)
        obj.icons.push(current.icon)
        return obj
    }, { descriptions: [], icons: [] })
    const description = descriptions.join(', ')
    rain = rain ? rain['3h'] : 0
    snow = snow ? snow['3h'] : 0

    timezone = timezone ? timezone : weatherTimezone

    // const date = new Date(dt * 1000)
    const { dateObj, displayDate, displayTime } = generateDisplayDateTime(new Date(dt * 1000), timezone)

    return {
        timezone, dt, pressure, humidity, visibility, wind, clouds, rain, snow, description, icons,
        tempF: convertCtoF(tempC),
        feelsLikeF: convertCtoF(feelsLikeC),
        tempC: tempC.toFixed(1),
        feelsLikeC: feelsLikeC.toFixed(1),
        displayTime, displayDate, dateObj
    }
}
function convertCtoF(degC) {
    return (degC * 1.8 + 32).toFixed(1)
}
function generateDisplayDateTime(date, weatherTimezone) {
    const miliSec = date.getTime() + date.getTimezoneOffset() * 60 * 1000 + weatherTimezone * 1000
    const newDate = new Date(miliSec)
    const displayDate = date.toDateString()
    const displayHour = newDate.getHours() > 9 ? newDate.getHours() : '0' + newDate.getHours()
    const displayMin = newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes()
    const displayTime = `${displayHour}:${displayMin}`
    const dateObj = {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        date: newDate.getDate(),
        hour: newDate.getHours(),
        minute: newDate.getMinutes()
    }

    return { displayDate, displayTime, dateObj }
}
document.addEventListener('DOMContentLoaded', e => {
    changeUnit('metric')
    if (navigator.geolocation) {
        renderLoading(true)
        navigator.geolocation.getCurrentPosition((position) => {
            fetchAndRender('Your location', position.coords.latitude, position.coords.longitude)
        }, () => {
            renderLoading(false)
            renderMessage('No info')
        })
    }
})