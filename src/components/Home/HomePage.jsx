import videohomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Homepage = (props) => {
    const navigate=useNavigate()
  return (
    <>
      <div className="homepage-container">
        <video
          loop
          autoPlay
          muted
          src={videohomepage}
          className="cursor-hover"
        ></video>
        <div className="homepage-content">
          <div className=" homepage-title">Forms that break the norm</div>
          <div className=" homepage-description">
            Get more data—like signups, feedback, and anything else—with forms
            designed to be{" "}
            <span className="bold-text">refreshingly different.</span>
          </div>
          <div>
            {useSelector((state) => state.user.isAuthenticated) ? (
              <button onClick={() => navigate("/user")} className="btn btn-dark">Doing Quiz Now !!!</button>
            ) : (
              <button onClick={() => navigate("/login")} className="btn btn-dark">Get Started Now </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Homepage;
