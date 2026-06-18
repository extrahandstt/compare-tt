export default function About() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        lineHeight: "1.7"
      }}
    >
      <h1>About CompareTT</h1>

      <p>
        CompareTT is a community-powered price comparison platform
        built for Trinidad & Tobago.
      </p>

      <p>
        Our goal is simple:
        help people save money by sharing and comparing real prices
        from stores across the country.
      </p>

      <hr style={{ margin: "25px 0" }} />

      <h2>How CompareTT Works</h2>

      <div style={cardStyle}>
        <h3>🔎 Search Products</h3>
        <p>
          Search for groceries, school supplies,
          building materials and other everyday products.
        </p>
      </div>

      <div style={cardStyle}>
        <h3>📊 Compare Prices</h3>
        <p>
          View prices submitted by shoppers from different stores
          and locations throughout Trinidad & Tobago.
        </p>
      </div>

      <div style={cardStyle}>
        <h3>📍 Filter by Location</h3>
        <p>
          See prices in your area and compare them with prices
          from other towns and cities.
        </p>
      </div>

      <div style={cardStyle}>
        <h3>🤝 Submit Prices</h3>
        <p>
          Help other shoppers by contributing prices you find
          while shopping.
        </p>
      </div>

      <hr style={{ margin: "25px 0" }} />

      <h2>Why Use CompareTT?</h2>

      <ul>
        <li>Save money before shopping</li>
        <li>Find cheaper stores near you</li>
        <li>Avoid overpaying</li>
        <li>Track price differences across locations</li>
        <li>Help build a useful community resource</li>
      </ul>

      <hr style={{ margin: "25px 0" }} />

      <h2>Our Vision</h2>

      <p>
        We believe shoppers should have easy access to price
        information before spending their money.
      </p>

      <p>
        By working together and sharing prices,
        Trinidad & Tobago can build a free and transparent source
        of shopping information for everyone.
      </p>

      <hr style={{ margin: "25px 0" }} />

      <h2>Frequently Asked Questions</h2>

      <div style={cardStyle}>
        <h3>Are prices verified?</h3>
        <p>
          Submitted prices are reviewed before approval.
        </p>
      </div>

      <div style={cardStyle}>
        <h3>Can anyone submit a price?</h3>
        <p>
          Yes. Anyone can help improve the platform by submitting
          prices they find.
        </p>
      </div>

      <div style={cardStyle}>
        <h3>Does CompareTT sell products?</h3>
        <p>
          No. CompareTT only helps users compare prices.
        </p>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "16px",
  borderRadius: "12px",
  marginBottom: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
};