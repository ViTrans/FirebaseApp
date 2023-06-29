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
        `https://api.weatherapi.com/v1/current.json?key=a4c5421eb28949f08f9151545232906&q=${
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
      <div className="flex items-center w-full gap-5 px-5 py-3 border border-gray-200 rounded-lg">
        <input
          onChange={handleChangeCity}
          type="text"
          className="w-full bg-transparent outline-none"
          placeholder="Enter your content..."
        />
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
      </div>
      <h3 className="mt-2 text-xl font-medium text-center">Select City</h3>
      <div>
        {weather && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h4 className="text-xl font-medium">{weather?.location?.name}</h4>
              <div className="flex items-center gap-x-5">
                <p className="text-gray-500 ">
                  {weather?.current?.condition?.text}
                </p>
                <img
                  className="w-[30px] h-[30px]"
                  src={weather?.current?.condition?.icon}
                  alt=""
                />
              </div>
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
