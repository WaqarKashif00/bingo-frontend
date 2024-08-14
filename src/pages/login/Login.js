import { useState, useEffect } from "react";
import i18n from "i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function Login({ t }) {
  let navigate = useNavigate();

  const [lang, setLang] = useState(localStorage.getItem("xb-lang") ?? "en");

  const changeLang = (_x) => {
    setLang(_x);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    if (!email || !password) {
      alert("Please enter login credentials");
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_HOST}/users/login`,
        {
          user_name: email,
          password: password,
        }
      );
      sessionStorage.setItem("x-bingo-token", JSON.stringify(data.data.token));
      sessionStorage.setItem("xbw", JSON.stringify(data.data.wallet_balance));
      sessionStorage.setItem("x_b__id", JSON.stringify(data.data.id));
      navigate("/lobby");
    } catch (err) {
      console.error(err);
      swal(err.response.data.message);
    }
  };

  useEffect(() => {
    (() => {
      localStorage.setItem("xb-lang", lang);
      const _lang = localStorage.getItem("xb-lang");
      i18n.changeLanguage(_lang);
    })();
    return () => {};
  }, [lang]);

  return (
    <div className="login-page">
      <div className="login-content pt-5">
        <div className="logo text-center">
          <img src="./assets/images/logo.png" alt="" width="200" height="140" />
        </div>
        <div className="card bg-yellow w-60 m-auto mt-3 p-2">
          <div className="heading text-center mb-2">
            <h2>
              <strong>{t("Login")}</strong>
            </h2>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-group my-2">
              <input
                type="email"
                name="email"
                placeholder={t("email")}
                required={true}
                className="w-100 custom-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder={t("password")}
                required={true}
                className="w-100 custom-control"
              />
            </div>
            <div className="buttons d-flex justify-content-between mt-3">
              <div className="left">
                <p
                  onClick={() => changeLang("en")}
                  className="btn btn-sm btn-dark me-1"
                >
                  EN
                </p>
                <p
                  onClick={() => changeLang("fr")}
                  className="btn btn-sm btn-dark"
                >
                  FR
                </p>
              </div>
              <div className="right">
                <p className="btn btn-sm btn-dark me-1">RU</p>
                <p className="btn btn-sm btn-dark">HF</p>
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-green text-light w-50 py-1"
              >
                <strong>{t("done")}</strong>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
