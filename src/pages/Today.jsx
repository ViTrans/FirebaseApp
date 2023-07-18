const Today = ({ weather }) => {
  return (
    <div>
      <div className="max-w-[960px] mt-10 bg-blue-400 mx-auto rounded-lg shadow-md p-4 text-white">
        <h2 className="text-2xl font-bold mb-4">Today's Weather</h2>
        <div className="flex items-center justify-center">
          <img
            src={`https://openweathermap.org/img/w/${weather?.list[0].weather[0].icon}.png`}
            alt="Weather Icon"
            className="w-16 h-16 mr-4"
          />
          <div>
            <p className="text-xl font-bold">
              {new Date(weather?.list[0].dt_txt).toLocaleDateString("en-US", {
                weekday: "long",
              })}{" "}
            </p>
            <p className="">
              Feels like {Math.round(weather?.list[0].main.feels_like)}°C
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="">
            Min Temperature: {Math.round(weather?.list[0].main.temp_min)}°C
          </p>
          <p className="">
            Max Temperature: {Math.round(weather?.list[0].main.temp_max)}°C
          </p>

          <p className="">Humidity: {weather?.list[0].main.humidity}%</p>
          <p className="">Wind Speed: {weather?.list[0].wind.speed}m/s</p>
        </div>
      </div>
      <div className="weather-scroll-grid p-5">
        {/* lay 7 ngay */}
        {weather?.list.map(
          (dayData, index) =>
            index % 6 === 0 && (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 text-white"
              >
                <p className="text-lg font-bold">
                  {new Date(dayData.dt_txt).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/w/${dayData.weather[0].icon}.png`}
                  alt="Weather Icon"
                  className="w-16 h-16 mx-auto mt-4"
                />
                <p className="text-xl font-bold text-center">
                  {dayData.main.temp} °C
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Today;
