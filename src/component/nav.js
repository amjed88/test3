import react,{component,useState} from 'react';
import {Link ,NavLink} from 'react-router-dom'
import "./items.css"


function Nav(){
    return(
        <div className="navebar">
            <div className="continet">
            <a className="LOGO" href="#">LOGO</a>
            <ul className="ul">
                <Link className="a" to="/add">Add to database</Link>
                <Link className="a" to="/display">display</Link>
                <Link className="a" to="/login">login</Link>
            </ul>  
            </div>

        </div>
    )
}

export default Nav;