import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getDashBoardData } from "../../../services/apiservice";
import "./DashBoard.scss";
const DashBoard = (props) => {
  const [dashboardData, setDashboardData] = useState({});

  const getDashBoardDataFunction = async () => {
    let res = await getDashBoardData();
    if (res && res.EC === 0) {
      setDashboardData(res.DT);
    }
    if (res && res.EC !== 0) {
      console.log(res.EM);
    }
  };
  useEffect(() => {
    getDashBoardDataFunction();
  }, []);
  const data = [
    {
      name: "Quizzes",
      uv: dashboardData ? dashboardData?.others?.countQuiz : 0,
    },
    {
      name: "Questions",
      pv: dashboardData ? dashboardData?.others?.countQuestions : 0,
    },
    {
      name: "Answers",
      vv: dashboardData ? dashboardData?.others?.countAnswers : 0,
    },
  ];
  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Analytic Dashboard
      </h2>
      <div className="dashboard-container container">
        <div className="container-left">
          <div className="container-left-element">
            Total Users <div>{dashboardData?.users?.total}</div>
          </div>
          <div className="container-left-element">
            Total Quizzes
            <div>{dashboardData ? dashboardData?.others?.countQuiz : 0}</div>
          </div>
          <div className="container-left-element">
            Total Questions
            <div>
              {dashboardData ? dashboardData?.others?.countQuestions : 0}
            </div>
          </div>
          <div className="container-left-element">
            Total Answers{" "}
            <div>{dashboardData ? dashboardData?.others?.countAnswers : 0}</div>
          </div>
        </div>
        <div className="container-right">
          <ResponsiveContainer width={700} height="95%">
            <BarChart width={689} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
              <Bar dataKey="vv" fill="#ffc658 " />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};
export default DashBoard;
