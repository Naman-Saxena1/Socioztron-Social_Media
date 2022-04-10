import { 
    Sidebar
} from '../../components'
import './Messages.css'

function Messages()
{
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