import axios from "axios";
import { useEffect, useState } from "react";
import lodash from "lodash";
const HomePage = () => {
  const [city, setCity] = useState("hanoi");
  const [weather, setWeather] = useState(null);
  //   const [error, setError] = useState(null);
  //   const [loading, setLoading] = useState(false);

  const getWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=2643b73877f14c8183e144152232706&q=${
          city || "hanoi"
        }&aqi=yes`
      );
      setWeather(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeather(city);
  }, [city]);

  const handleChangeCity = lodash.debounce((e) => {
    setCity(e.target.value);
  }, 1000);

  // https://api.weatherapi.com/v1/current.json?key=2643b73877f14c8183e144152232706&q=hanoi&aqi=yes
  return (
    <div className="max-w-[600px] bg-white shadow-md rounded-lg mx-auto p-3 mt-20">
      <div className="flex items-center gap-5 w-full border border-gray-200 rounded-lg py-3 px-5">
        <span className="flex-shrink-0 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          onChange={handleChangeCity}
          type="text"
          className="w-full outline-none bg-transparent"
          placeholder="Enter your content..."
        />
      </div>
      <h3 className="text-center font-medium text-xl mt-2">Select City</h3>
      <div>
        {weather && (
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h4 className="text-xl font-medium">{weather?.location?.name}</h4>
              <p className="text-gray-500 ">
                {Date(weather?.location?.localtime).split(" ")[0]}
              </p>
            </div>
            <span className="text-xl font-medium">
              {weather?.current?.temp_c}
              <sup>o</sup>C
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
