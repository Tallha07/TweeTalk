import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import { GiSleevelessTop } from "react-icons/gi";

function Navigation():JSX.Element {
    const sessionUser = useSelector((state: RootState) => state.session.user);

  return (
    <nav className="nav-bar">
      <div className="nav-left">
          <NavLink to="/">
          <img src="https://i.redd.it/llv02n3qxtm61.jpg" atl="tweeTalk logo" className="tweeTalk-logo"/>
          </NavLink> 
      </div>

      <div className="nav-right">
        <div>
          {sessionUser && (
            <NavLink to="/create-tweet" className="create-tweet-link">
                Add a Tweet
            </NavLink>
          )}          
        </div>
      </div>
           {!sessionUser && (
                <ProfileButton />
           )}

    </nav>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
