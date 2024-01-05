import "./DashBoard.scss";
import {
  BarChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer
} from "recharts";
const DashBoard = (props) => {
    const data = [
        {
          "name": "Page A",
          "uv": 4000,
          "pv": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "pv": 1398
        },
        {
          "name": "Page C",
          "uv": 2000,
          "pv": 9800
        },
      
      ]
  return (
    <>
      <h2>Analytic Dashboard</h2>
      <div className="dashboard-container container">
        <div className="container-left">
          <div className="container-left-element">Total Users <div>20</div></div>
          <div className="container-left-element">Total Quizzes<div>20</div></div>
          <div className="container-left-element">Total Questions<div>20</div></div>
          <div className="container-left-element">Total Answers <div>20</div></div>
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
          </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};
export default DashBoard;
