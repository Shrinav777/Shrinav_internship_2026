import "./Features.css";

function Features() {
  return (
    <section id="features" className="features">

      <h2>Key Features</h2>

      <div className="feature-container">

        <div className="feature-card">
          <div className="icon">🌾</div>
          <h3>Crop Price Display</h3>
          <p>
            View current prices of different crops from various markets.
          </p>
        </div>


        <div className="feature-card">
          <div className="icon">📊</div>
          <h3>Market Information</h3>
          <p>
            Check crop prices with market details and latest updates.
          </p>
        </div>


        <div className="feature-card">
          <div className="icon">⚡</div>
          <h3>Quick Access</h3>
          <p>
            Get crop price information instantly from the database.
          </p>
        </div>


        <div className="feature-card">
          <div className="icon">🔒</div>
          <h3>Secure Data</h3>
          <p>
            Crop price records are safely managed using Express and MySQL.
          </p>
        </div>


        <div className="feature-card">
          <div className="icon">📱</div>
          <h3>Responsive UI</h3>
          <p>
            Access crop price information on desktop, tablet and mobile.
          </p>
        </div>


        <div className="feature-card">
          <div className="icon">🚜</div>
          <h3>Farmer Friendly</h3>
          <p>
            Simple interface designed for farmers and traders.
          </p>
        </div>


      </div>

    </section>
  );
}

export default Features;