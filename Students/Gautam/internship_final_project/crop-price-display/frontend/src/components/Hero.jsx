import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <h1>
          Agriculture Crop
          <br />
          Price Display
        </h1>

        <p>
          View the latest market prices of various crops from different markets.
          Helping farmers and traders stay informed and make better selling decisions.
        </p>

        <Link to="/prices">
        <button className="hero-btn">View Crop Prices</button>
        </Link>

      </div>

      <div className="hero-right">

        <div className="hero-card">

          <h2>🌾 Live Crop Prices</h2>

          <p>
            Display the latest prices of various crops from different markets.
          </p>

        </div>

        <div className="hero-card">

          <h2>📊 Market Information</h2>

          <p>
            Check crop prices by market, category, and latest update.
          </p>

        </div>

        <div className="hero-card">

          <h2>🚜 Farmer Support</h2>

          <p>
            Access up-to-date crop price information to make informed selling decisions.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Hero;