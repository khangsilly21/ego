import { Link, Outlet } from "react-router-dom"
import avatarImage from "../asset/user.png"
import Notification from "./Notification"
import { useState } from "react";
function NavBar() {

    const [active, setActive] = useState('home');

    // Hàm xử lý khi người dùng nhấp vào một mục
    const handleNavClick = (item) => {
        setActive(item);
    };
    return (
        <div>

            <nav className="navigation">
                <Link className="linktyle" to="/"><span className="title item"><p className="bold">Nguyễn Huệ</p></span></Link>
                <div className="item">   
                    <Link to="/" className={`linkstyle ${active === 'home' ? 'active' : ''}`}
                        onClick={() => handleNavClick('home')}>Home</Link> <br />
                    <Link to="/car/1" className={`linkstyle ${active === 'car' ? 'active' : ''}`}
                        onClick={() => handleNavClick('car')}>Car</Link>  <br />
                    <Link to="/dormitory" className={`linkstyle ${active === 'dormitory' ? 'active' : ''}`}
                        onClick={() => handleNavClick('dormitory')}>Dormitory</Link> <br />
                    <Link to="/setting/xe1" className={`linkstyle ${active === 'setting' ? 'active' : ''}`}
                        onClick={() => handleNavClick('setting')}>Setting</Link> <br />
                    <Link to="/guide" className={`linkstyle ${active === 'guide' ? 'active' : ''}`}
                        onClick={() => handleNavClick('guide')}>Guide</Link> <br />
                </div>
                <div className="rightNav"><Notification /><img className="user" src={avatarImage} alt="avt" /><span className="nameUser">UserName</span> <span className="downButton">&#8744;</span></div>
            </nav>
            <Outlet className="mainField" />
        </div>
    )
}
export default NavBar