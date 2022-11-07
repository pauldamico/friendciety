import {Link} from 'react-router-dom'

export default function SideBar () {
    return (
        <div className="sidebar-div">
            <div className='sidebar-div2'>
           <Link to="/myfeed">MyFeed</Link>
           <Link to="/myfamily">My Family</Link>
           </div>
        </div>
    )
}