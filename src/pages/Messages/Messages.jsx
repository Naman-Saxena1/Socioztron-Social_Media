import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lottie from "react-lottie"
import { 
    Sidebar
} from '../../components'
import './Messages.css'
import codingLottie from "../../assets/lottie/coding.json"

function Messages()
{
    const manCodingObj = {
        loop: true,
        autoplay: true,
        animationData : codingLottie,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const { pathname } = useLocation()
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='page-container'>
            <Sidebar/>
            <div className='messages-page-container'>
                <h2>Messaging feature coming soon! 😉</h2>
                    <Lottie options={manCodingObj}
                        style={{ 
                            width: "auto", 
                            height: "90%",
                            minHeight: "590px",
                            margin: "auto",
                            position: "absolute"
                        }}
                    />
            </div>
        </div>
    )
}

export { Messages }