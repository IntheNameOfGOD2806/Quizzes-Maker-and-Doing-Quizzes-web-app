import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import videohomepage from "../../assets/video-homepage.mp4";

import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

const Homepage = (props) => {
 const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  return (
    <Suspense fallback="loading">
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
          <div className=" homepage-title">{t('title')}</div>
          <div className=" homepage-description">
            {t('description.part1')}
            <span className="bold-text"> {t('description.part2')}</span>
          </div>
          <div>
            {useSelector((state) => state.user.isAuthenticated) ? (
              <button
                onClick={() => navigate("/user")}
                className="btn btn-dark"
              >
                 {t('description.part3')}
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="btn btn-dark"
              >
                {t('description.part4')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  </Suspense>
  
  );
};
export default Homepage;
