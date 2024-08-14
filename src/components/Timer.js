import Countdown from "react-countdown";

const Timer = ({ time, t, color = "white", setTimerOff = () => {} }) => {
  console.log(time);
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setTimerOff();
      // Render a completed state
      return (
        <h3 className="text-secondary-light" style={{ color: color }}>
          {t("Game")} {t("Started")}!
        </h3>
      );
    } else {
      // Render a countdown
      return (
        <>
          <h3 className="text-secondary-light" style={{ color: color }}>
            {t("Next")} {t("game")} {t("starting")} {t("in")}
          </h3>
          <span>
            {hours}:{minutes}:{seconds}
          </span>
        </>
      );
    }
  };

  return (
    <div
      className="start-game-time text-center font-w-s mt-3 text-light"
      style={{ color: color }}
    >
      {time && (
        <Countdown
          date={Date.now() + (new Date(time) - new Date())}
          // date={Date.now() + 1799999}
          renderer={renderer}
        />
      )}
    </div>
  );
};

export default Timer;
