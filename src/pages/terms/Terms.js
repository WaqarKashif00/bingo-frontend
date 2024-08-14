import Footer from "components/Footer";
import Header from "components/Header";

const Terms = ({ t }) => {
  return (
    <div className="ticket-table px-3">
      <div className="table-content pt-1">
        <Header />

        <div className="card shadow-sm p-3 bg-body border-radius-none box-shadow mt-5">
          <h1 className="text-center text-dark fw-bolder">
            {t("Terms")} & {t("Conditions")}
          </h1>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Terms;
