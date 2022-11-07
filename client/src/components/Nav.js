import {Link} from 'react-router-dom'

export default function Nav (){
    return (
        <div className='nav-div'>
           
            <input placeholder='Search Users...'/>
            <div>
            <Link to='/'> Home</Link>
            <Link to='/login'> Login</Link>
            </div>
        </div>
    )
}