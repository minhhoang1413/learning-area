
const WeatherInfo = ({ country, weather }) => (
    <div>
        <h3>Weather in {country.capital[0]}</h3>
        <p><strong>Temperature:</strong>  {weather.temperature} Celcius</p>
        <div>
            {
                console.log("weather ", weather)}
            {console.log("weather icon", weather.weather_icons)}
            {weather.weather_icons.map(icon =>
                <img key={icon} src={icon} />
            )}
        </div>
        <p><strong>Wind:</strong>  {weather.wind_speed} kmph direction {weather.wind_dir}</p>
    </div>
)
export default WeatherInfo;