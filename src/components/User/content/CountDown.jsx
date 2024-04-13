import { useState, useEffect } from "react";

const CountDown = (props) => {
  const [count, setCount] = useState(10);
  useEffect(() => {
    if(props.stopTimer===true) {
      return;
    }
    if (count === 0) {
      props.submitAnswer();
      return;
    }
    const timer = setInterval(() => {
      count !== 0 && setCount(count - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [count]);
  return (
    <div className="timer">
      {count !== 0 && new Date(1000 * count).toISOString().substr(11, 8)}
      {count === 0 && (
        <span className="" style={{ color: "red", fontSize: "30px" }}>
          TIME UP
        </span>
      )}
    </div>
  );
};
export default CountDown;
