const WeatherItem = (props) => {
  console.log(props);
  return (
    <div className="flex gap-x-5 bg-white bg-opacity-25 p-5 rounded-md border border-gray-400">
      <img
        src={`https://openweathermap.org/img/wn/${props?.icon}.png`}
        className=" object-cover"
        alt=""
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{props?.day}</span>
        <span className="text-sm font-medium">Night : {props?.night}</span>
        <span className="text-sm font-medium">Day : {props?.dayTemp}</span>
      </div>
    </div>
  );
};

export default WeatherItem;
