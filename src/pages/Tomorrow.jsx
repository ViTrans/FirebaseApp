import React from "react";

const Tomorrow = ({ weather }) => {
  const { list } = weather;
  const tomorrow = list.filter((item) => {
    const date = new Date(item.dt_txt);
    return date.getDate() === new Date().getDate() + 1;
  });
  console.log(tomorrow);

  return (
    <div className="max-w-[960px] bg-blue-400 mx-auto mt-10 rounded-lg shadow-md p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Tomorrow's Weather</h2>
      <div className="flex items-center justify-center">
        <img
          src={`https://openweathermap.org/img/w/${weather.list[10].weather[0].icon}.png`}
          alt="Weather Icon"
          className="w-16 h-16 mr-4"
        />
        <div>
          <p className="text-xl font-bold">
            {
              (tomorrow[0].dt_txt = new Date(
                tomorrow[0]?.dt_txt
              ).toLocaleDateString("en-US", {
                weekday: "long",
              }))
            }
          </p>
          <p className="">
            Feels like{" "}
            {
              (tomorrow[0].main.feels_like = Math.round(
                tomorrow[0].main.feels_like
              ))
            }{" "}
            °C
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="">
          Min Temperature:{" "}
          {(tomorrow[0].main.temp_min = Math.round(tomorrow[0].main.temp_min))}{" "}
          °C
        </p>
        <p className="">
          Max Temperature:{" "}
          {(tomorrow[0].main.temp_max = Math.round(tomorrow[0].main.temp_max))}{" "}
          °C
        </p>
        <p className="">
          Humidity:{" "}
          {(tomorrow[0].main.humidity = Math.round(tomorrow[0].main.humidity))}%
        </p>
        <p className="">
          Wind Speed:{" "}
          {(tomorrow[0].wind.speed = Math.round(tomorrow[0].wind.speed))} m/s
        </p>
      </div>
    </div>
  );
};

export default Tomorrow;
