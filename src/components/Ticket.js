import { Fragment, memo } from "react";
import uuid from "react-uuid";

const Ticket = ({ data, ticketNo, updateTickets }) => {
  const selectNumber = (e, ticketNo, rowNo, item) => {
    if (
      e.target.innerText &&
      !document
        .getElementById(e.target.id)
        .classList.value.includes("selected-bingo-num")
    ) {
      document.getElementById(e.target.id).classList.add("selected-bingo-num");

      updateTickets(ticketNo, rowNo, item);
    }
    return;
  };

  return (
    <div className="card p-1 bg-body border-radius-none">
      <div className="container">
        {Object.keys(data).map((key, idx) => (
          <div className="row" key={idx}>
            {data[key].map((item, index) => (
              <Fragment key={index}>
                <div
                  id={`ticket${ticketNo}-row${idx}-num-${item}-${uuid()}`}
                  className="col border border-dark text-center font-weight-italic"
                  onClick={(e) =>
                    selectNumber(e, `ticket${ticketNo}`, `row${idx}`, item)
                  }
                >
                  {item ?? null}
                </div>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Ticket);
