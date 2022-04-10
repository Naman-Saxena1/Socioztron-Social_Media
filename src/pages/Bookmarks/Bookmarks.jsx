import { 
    Sidebar
} from '../../components'
import './Bookmarks.css'

function Bookmarks()
{
    return (
        <div className='page-container'>
            <Sidebar/>
            <div className='bookmarks-page-container'>
                <p>No bookmarks present! 🧐</p>
            </div>
        </div>
    )
}

export { Bookmarks }