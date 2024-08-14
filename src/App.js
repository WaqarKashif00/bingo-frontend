import { BrowserRouter } from "react-router-dom";
import { Translation } from "react-i18next";

import Router from "routes/index";

export default function App() {
  return (
    <div className="wrraper">
      <Translation>
        {(t) => (
          <BrowserRouter>
            <Router t={t} />
          </BrowserRouter>
        )}
      </Translation>
    </div>
  );
}
