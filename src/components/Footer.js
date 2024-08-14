const Footer = ({ time = null }) => {
  return (
    <div className="footer py-1">
      <hr style={{ backgroundColor: "white", color: "white" }} />

      <ul className="nav justify-content-between align-items-center">
        <li className="nav-item">
          <a href="logout" className="nav-link text-secondary-light">
            <i className="fa fa-user"></i>
          </a>
        </li>
        <li className="nav-item">
          <a
            href={`rounds?next=${time}`}
            className="nav-link text-secondary-light"
          >
            <i className="fa fa-trophy"></i>
          </a>
        </li>
        <li className="nav-item">
          <a href="terms" className="nav-link text-secondary-light">
            <i className="fa fa-file"></i>
          </a>
        </li>
        <li className="nav-item">
          <a href="lobby" className="nav-link text-secondary-light">
            <i className="fa fa-home-alt"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
