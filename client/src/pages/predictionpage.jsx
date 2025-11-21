import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY ;

const soilTypes = ["Sandy", "Loamy", "Clayey", "Silty"];
const cropTypes = ["Maize", "Wheat", "Rice", "Pulses", "Vegetables"];

export default function PredictionPage() {
  // Form state
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [moisture, setMoisture] = useState("");
  const [soilType, setSoilType] = useState(soilTypes[1]);
  const [cropType, setCropType] = useState(cropTypes[0]);

  // Weather state
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  // Prediction result
  const [loadingPredict, setLoadingPredict] = useState(false);
  const [result, setResult] = useState(null);
  const [errorPredict, setErrorPredict] = useState(null);

  //use navigate 
  const navigate = useNavigate();


  // On mount: ask for geolocation and fetch weather
  useEffect(() => {
    setLoadingWeather(true);
    if (!navigator.geolocation) {
      setWeatherError("Geolocation not supported");
      setLoadingWeather(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeather(latitude, longitude);
      },
      (err) => {
        setWeatherError("Location permission denied. You can enter values manually.");
        setLoadingWeather(false);
      },
      { timeout: 10000 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchWeather(lat, lon) {
    try {
      setWeatherError(null);
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Weather fetch failed");
      const data = await res.json();
      // set weather
      const w = {
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        desc: data.weather && data.weather[0] ? data.weather[0].description : "",
        icon: data.weather && data.weather[0] ? data.weather[0].icon : null,
      };
      setWeather(w);
      setLocationName(data.name || "");
      // Prefill form fields (you can disable if you want users to manually enter)
      setTemperature(String(Math.round(w.temp)));
      setHumidity(String(w.humidity));
      // moisture isn't available from weather API — we can guess or leave blank
      setMoisture(""); // user should provide or you can set to some default
    } catch (e) {
      console.error(e);
      setWeatherError("Failed to fetch weather.");
    } finally {
      setLoadingWeather(false);
    }
  }

  // Prediction POST — replace URL with your backend endpoint (FastAPI)
  async function handlePredict(e) {
  e.preventDefault();
  setLoadingPredict(true);
  setErrorPredict(null);

  const payload = {
    Temperature: Number(temperature),
    Humidity: Number(humidity),
    Moisture: Number(moisture),
    SoilType: soilType,
    CropType: cropType,
  };

  try {
    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "Prediction failed");
    }

    const json = await res.json();

    // 🚀 Navigate to results page
    navigate("/results", {
      state: {
        nitrogen: json.nitrogen,
        phosphorous: json.phosphorous,
        potassium: json.potassium,
        fertilizer: json.fertilizer,
        explanation: json.explanation,
      
      features: {
      temperature,
      humidity,
      moisture,
      soilType,
      cropType,
    },
  },
    
    });

  } catch (err) {
    setErrorPredict(err.message || "Prediction error");
  } finally {
    setLoadingPredict(false);
  }
}


  return (

    <>
    <Navbar />
    
    <div className="min-h-screen bg-[#f3efe2] py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Prediction Form (span 2 on lg) */}
        <div className="lg:col-span-2">
          <div className="bg-white relative rounded-xl p-8 shadow-xl border border-[#d6d0c4]">
            
            <h2 className="text-2xl font-bold text-[#3f3a24] mb-4">Predict Soil Nutrients</h2>
            <p className="text-[#556b2f] mb-6">
              Enter the soil & environment values or use the detected weather values from your location.
            </p>

            <form onSubmit={handlePredict} className="space-y-4 relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm text-[#3f3a24]">Temperature (°C)</span>
                  <input
                    type="number"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    className="mt-2 p-3 rounded-lg border border-[#d6d0c4] focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
                    placeholder="e.g. 25"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm text-[#3f3a24]">Humidity (%)</span>
                  <input
                    type="number"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                    className="mt-2 p-3 rounded-lg border border-[#d6d0c4] focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
                    placeholder="e.g. 60"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm text-[#3f3a24]">Moisture (%)</span>
                  <input
                    type="number"
                    value={moisture}
                    onChange={(e) => setMoisture(e.target.value)}
                    className="mt-2 p-3 rounded-lg border border-[#d6d0c4] focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
                    placeholder="e.g. 30"
                    required
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm text-[#3f3a24]">Soil Type</span>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="mt-2 p-3 rounded-lg border border-[#d6d0c4] focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
                  >
                    {soilTypes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col">
                  <span className="text-sm text-[#3f3a24]">Crop Type</span>
                  <select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    className="mt-2 p-3 rounded-lg border border-[#d6d0c4] focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
                  >
                    {cropTypes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex items-center space-x-4 mt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#4a5f36] text-white rounded-xl border-2 border-transparent hover:border-[#8bc34a] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  disabled={loadingPredict}
                >
                  {loadingPredict ? "Predicting..." : "Predict"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // Reset form
                    setTemperature("");
                    setHumidity("");
                    setMoisture("");
                    setResult(null);
                  }}
                  className="px-4 py-2 border border-[#d6d0c4] rounded-lg text-[#3f3a24] hover:shadow-sm transition"
                >
                  Reset
                </button>

                <div className="ml-auto text-sm text-[#556b2f]">
                  {result ? (
                    <span className="font-medium">Last prediction ready</span>
                  ) : (
                    <span>No prediction yet</span>
                  )}
                </div>
              </div>

              {errorPredict && <div className="text-red-500 mt-2">{errorPredict}</div>}
            </form>

            {/* result summary small in-form */}
            {result && (
              <div className="mt-6 p-4 rounded-lg bg-[#f3efe2] border border-[#d6d0c4]">
                <h4 className="font-semibold text-[#3f3a24]">Prediction</h4>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div className="text-center">
                    <div className="text-sm text-[#556b2f]">Nitrogen</div>
                    <div className="text-lg font-semibold text-[#3f3a24]">{result.nitrogen}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-[#556b2f]">Phosphorous</div>
                    <div className="text-lg font-semibold text-[#3f3a24]">{result.phosphorous}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-[#556b2f]">Potassium</div>
                    <div className="text-lg font-semibold text-[#3f3a24]">{result.potassium}</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-[#556b2f]">
                  Recommended Fertilizer: <span className="font-medium text-[#3f3a24]">{result.fertilizer}</span>
                </div>
              </div>
            )}
          </div>

          {/* small tips / explanation under form */}
          <div className="mt-6 text-sm text-[#556b2f]">
            <p className="mb-2"><strong>Tip:</strong> Use the detected weather values for faster input. Moisture should be entered from a moisture sensor if available.</p>
          </div>
        </div>

        {/* Right: Weather Sidebar */}
        <aside className="relative">
          <div className="bg-white rounded-xl p-6 shadow-2xl border border-[#d6d0c4] relative overflow-hidden">
            <div className="absolute -inset-2 bg-[#8bc34a] opacity-10 blur-2xl rounded-xl pointer-events-none"></div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#3f3a24]">Local Weather</h3>
                <p className="text-sm text-[#556b2f]">{locationName || "Detecting..."}</p>
              </div>
              <div className="text-xl text-[#4a5f36]">{/* optional small icon */}</div>
            </div>

            <div className="mt-4">
              {loadingWeather ? (
                <div className="text-[#556b2f]">Detecting location & fetching weather...</div>
              ) : weatherError ? (
                <div className="text-red-500">{weatherError}</div>
              ) : weather ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    {weather.icon && (
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt="w"
                        className="w-14 h-14"
                      />
                    )}
                    <div>
                      <div className="text-2xl font-bold text-[#3f3a24]">{Math.round(weather.temp)}°C</div>
                      <div className="text-sm text-[#556b2f] capitalize">{weather.desc}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-[#556b2f]">
                    <div className="p-2 rounded-lg bg-[#f3efe2]">Humidity: <span className="font-semibold text-[#3f3a24]">{weather.humidity}%</span></div>
                    <div className="p-2 rounded-lg bg-[#f3efe2]">Wind: <span className="font-semibold text-[#3f3a24]">{weather.wind} m/s</span></div>
                    <div className="p-2 rounded-lg bg-[#f3efe2]">Time: <span className="font-semibold text-[#3f3a24]">{new Date().toLocaleTimeString()}</span></div>
                    <div className="p-2 rounded-lg bg-[#f3efe2]">Location: <span className="font-semibold text-[#3f3a24]">{locationName}</span></div>
                  </div>
                </div>
              ) : (
                <div className="text-[#556b2f]">No weather data</div>
              )}
            </div>

            {/* small button to refetch */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  // re-trigger geolocation
                  if (navigator.geolocation) {
                    setLoadingWeather(true);
                    navigator.geolocation.getCurrentPosition(
                      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
                      () => {
                        setWeatherError("Location permission denied.");
                        setLoadingWeather(false);
                      }
                    );
                  } else {
                    setWeatherError("Geolocation not supported");
                  }
                }}
                className="px-4 py-2 bg-transparent border border-[#d6d0c4] rounded-md text-[#3f3a24] hover:shadow-sm transition"
              >
                Refresh
              </button>

              <button
                onClick={() => {
                  // apply weather values to form fields
                  if (weather) {
                    setTemperature(String(Math.round(weather.temp)));
                    setHumidity(String(weather.humidity));
                  }
                }}
                className="px-4 py-2 bg-[#4a5f36] rounded-md text-white hover:bg-[#3f4f2a] transition"
              >
                Use Weather
              </button>
            </div>
          </div>

          {/* small credits below card */}
          <div className="mt-3 text-xs text-[#556b2f] max-w-xs">
            <p>Weather by OpenWeather • Location detected by browser</p>
          </div>
        </aside>
      </div>
      <footer className="text-center py-6 text-[#556b2f] bg-[#e6e1d5] mt-12 rounded-t-lg">
        © {new Date().getFullYear()} SoilIQ. All Rights Reserved.
      </footer>
    </div>
    </>
  );
}
