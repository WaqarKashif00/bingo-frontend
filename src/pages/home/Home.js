import { Link } from "react-router-dom";

export default function Home({ t }) {
  return (
    <div className="home-page">
      <div className="home-content">
        <div className="logo text-center">
          <img src="./assets/images/logo.png" alt="" />
        </div>
        <div className="buttons d-flex flex-column align-items-center mt-3">
          <Link to="login" className="btn btn-green py-0 text-light w-25">
            {t("Login")}
          </Link>
          <Link to="register" className="btn btn-yellow py-0 w-25 mt-2">
            {t("Register")}
          </Link>
        </div>
      </div>
    </div>
  );
}
