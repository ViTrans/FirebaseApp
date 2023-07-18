import React from "react";

const OtherDay = ({ weather }) => {
  const { list } = weather;
  return (
    <div className="bg-blue-400 w-[960px] mx-auto rounded-lg shadow-md p-4 overflow-y-auto mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Other Days' Weather</h2>
      {list.map(
        (dayData, index) =>
          // laays 7 ngaay từ list
          index % 6 === 0 && (
            <div
              key={index}
              className="mb-4 border border-white p-2 rounded-md"
            >
              <p className="text-xl font-bold">
                {new Date(dayData.dt_txt).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
              <div className="flex items-center justify-center">
                <img
                  src={`https://openweathermap.org/img/w/${dayData.weather[0].icon}.png`}
                  alt="Weather Icon"
                  className="w-16 h-16 mr-4"
                />
                <div>
                  <p className="">
                    Feels like {Math.round(dayData.main.feels_like)}°C
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="">
                  Min Temperature: {Math.round(dayData.main.temp_min)}°C
                </p>
                <p className="">
                  Max Temperature: {Math.round(dayData.main.temp_max)}°C
                </p>
                <p className="">
                  Humidity: {Math.round(dayData.main.humidity)}%
                </p>
                <p className="">
                  Wind Speed: {Math.round(dayData.wind.speed)}m/s
                </p>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default OtherDay;
