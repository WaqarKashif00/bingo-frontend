import { useEffect, useState, memo } from "react";

const TimeNow = ({ t }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  });
  return (
    <div className="timer text-center text-light my-1">
      <h5 className="font-w-s">
        {t("Time")} : {time}
      </h5>
    </div>
  );
};

export default memo(TimeNow);
