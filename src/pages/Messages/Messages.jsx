import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
    Sidebar
} from '../../components'
import './Messages.css'

function Messages()
{
    const { pathname } = useLocation()
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='page-container'>
            <Sidebar/>
            <div className='messages-page-container'>
                <p>No messages present, start chatting! 😉</p>
            </div>
        </div>
    )
}

export { Messages }