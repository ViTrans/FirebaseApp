import axios from "axios";
import { useEffect, useState } from "react";
import lodash from "lodash";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import WeatherItem from "../components/weather/WeatherItem";
const HomePage = () => {
  const [city, setCity] = useState("hanoi");
  const [weather, setWeather] = useState(null);
  //   const [error, setError] = useState(null);
  //   const [loading, setLoading] = useState(false);

  const api = {
    key: "57f175522f1771d7bc35c2ab31348f29",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const getWeather = async (city) => {
    try {
      const response = await axios.get(
        `${api.base}forecast?q=${city || "hanoi"}&units=metric&APPID=${api.key}`
      );
      setWeather(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeather(city);
    console.log(weather);
  }, [city]);

  const handleChangeCity = lodash.debounce((e) => {
    setCity(e.target.value);
  }, 1000);

  const { user } = useAuth();

  const navigate = useNavigate();
  if (!user) {
    return navigate("/signin");
  }

  return (
    <div className="w-full bg-white shadow-md rounded-lg mx-auto relative ">
      <img src="bg.jpg" alt="" />
      <div className="absolute top-0 left-0 w-full h-full ">
        <div className="flex justify-between">
          <div className="flex flex-col p-5 m-5 text-white bg-white bg-opacity-25 w-full max-w-[300px] rounded-md">
            <h1 className="text-4xl font-medium text-white ">
              {new Date(weather?.list[0].dt_txt).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </h1>
            <span>
              {new Date(weather?.list[0].dt_txt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
              })}
            </span>
            <span className="text-6xl font-bold">
              {Math.round(weather?.list[0].main.temp)}°C
            </span>
            <span className="text-2xl font-medium">
              {weather?.list[0].weather[0].description}
            </span>
            <span>Temp : {weather?.list[0]?.main.temp_max}°C / </span>
            <span>Feels like : {weather?.list[0]?.main.feels_like}°C</span>
            <span>Humidity : {weather?.list[0]?.main.humidity}%</span>
            <span>Wind : {weather?.list[0]?.wind.speed}km/h</span>
          </div>
          <div className="flex flex-col p-5 m-5 text-white w-full bg-white bg-opacity-25 max-w-[300px] rounded-md">
            <span className="text-4xl font-semibold text-white">
              City : {weather?.city.name}
            </span>
            <span className="text-2xl mt-3 font-medium text-white">
              Country : {weather?.city.country}
            </span>
            <input
              onChange={handleChangeCity}
              type="text"
              placeholder="Enter your content"
              className=" border border-slate-200 rounded-lg py-3 mt-3 px-5 outline-none  bg-transparent"
            />
          </div>
        </div>
      </div>
      <div className="weather-list grid grid-cols-4 absolute bottom-0 p-5 gap-10">
        {weather?.list.map((item, index) => {
          if (index % 8 === 0) {
            return (
              <WeatherItem
                key={index}
                day={new Date(item.dt_txt).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
                night={Math.round(item.main.temp_min)}
                dayTemp={Math.round(item.main.temp_max)}
                icon={item.weather[0].icon}
              ></WeatherItem>
            );
          }
        })}
      </div>
    </div>
  );
};

export default HomePage;
