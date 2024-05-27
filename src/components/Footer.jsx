export default function Footer() {
  return (
    <footer className="p-3">
      <div className="row p-3 d-none d-md-flex">
        <div className="col-4">
          <h3 className="h5">About Taudaha Banquet and Restaurant</h3>
          <p>
            Taudaha Banquet and Restaurant is a perfect place for your events
            and gatherings. We have a variety of halls and menus to choose from.
            We also provide extra services like decoration, DJ, and more.
          </p>
        </div>
        <div className="col-4">
          <h3 className="h5">Contact Us</h3>
          <p>
            <strong>Address:</strong> Taudaha, Kirtipur
            <br />
            <strong>Phone:</strong> 01-1234567, 01-1234567
            <br />
            <strong>Email: </strong>
            <a href="mailto:info@bms.com" className="text-decoration-none">
              info@bms.com
            </a>
          </p>
        </div>
        <div className="col-4">
          <h3 className="h5">Follow Us</h3>
          <div className="d-flex social-links">
            <a
              href="https://facebook.com"
              className="me-2 text-decoration-none"
            >
              <i className="fa-brands fa-facebook fa-xl"></i>
            </a>
            <a href="https://twitter.com" className="me-2 text-decoration-none">
              <i className="fa-brands fa-twitter fa-xl"></i>
            </a>
            <a
              href="https://instagram.com"
              className="me-2 text-decoration-none"
            >
              <i className="fa-brands fa-instagram fa-xl"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <p className="m-0">
            &copy; 2024 <strong>Taudaha Banquet and Restaurant</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
