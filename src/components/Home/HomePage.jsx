import videohomepage from '../../assets/video-homepage.mp4';
const Homepage = (props) => {
    return (
        <>
            <div className="homepage-container">

                <video loop autoPlay muted src={videohomepage} className="cursor-hover"></video>
                <div className='homepage-content'>
                    <div className=' homepage-title'>Forms that
                        break the norm</div>
                    <div className=' homepage-description'>Get more data—like signups, feedback, and anything else—with forms designed to be <span className='bold-text'>refreshingly different.</span></div>
                    <div>
                        <button className='btn btn-dark'>Get's started. It's free</button>
                    </div>

                </div>
            </div>

        </>

    )
}
export default Homepage