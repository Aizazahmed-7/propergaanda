import "./LogoBar.css"
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";

const LETTER_DELAY = 600; // Delay in milliseconds between each letter animation
const date = new Date();
const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
const dateString = date.toLocaleDateString('en-US', options);

const LogoBar=()=>{

    const [location, setLocation] = useState();
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();
        setCity(data.address.city);
        setCountry(data.address.country);

        console.log('Longitude: ',longitude)
        console.log('Latitude: ',latitude)
        console.log("City: ",city)
        console.log("Country: ",country)

        const apiKey = 'c6efabebf2b70fe71496649b0df00338';
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        const weatherData = await weatherResponse.json();
        console.log("Weather Data: ",weatherData)
        setWeather(weatherData);
      });
    }
  }, [city,country]);

    const [letters, setLetters] = useState([]);
  
    useEffect(() => {
        const word="ProperGaanda"
        const logoLetters = word.split(""); // Split the logo string into an array of letters
        const wordLength = word.length
        const intervalId = setInterval(() => {
        setLetters((prevLetters) => {
            const nextLetter = logoLetters.shift(); // Get the next letter from the logo array
            logoLetters.push(nextLetter); // Move the next letter to the end of the logo array
            if(prevLetters.length==wordLength){
                return [nextLetter];
            }
            else{
                return [...prevLetters, nextLetter]; // Add the next letter to the displayed letters
            }
        });
        }, LETTER_DELAY);
        
        return () => clearInterval(intervalId);
    }, []);

  return (
    <div className="header-section row">
        <div className="datetime ms-3 me-3 col-sm-3">
            <p>{dateString}</p>
            <hr/>
            <Link className="text">This Week's Latest</Link>
        </div>
        <div className="Logo  col-sm-5">
            {letters.map((letter, index) => (
            <span key={index} className="LogoLetter">{letter}</span>
            ))}
        </div>
        <div className="weather ms-3 me-3 col-sm">
            {location && weather? (
            <div>
            <p>{city}, {country}</p>
            <hr/>
            <p>{weather.weather[0].description} , {weather.main.temp}°C</p>
            </div>
            ) : (
            <p>Getting your location and weather...</p>
            )}
        </div>
    </div>
  );
}



export default LogoBar