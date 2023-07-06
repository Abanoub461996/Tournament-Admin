// Modularity
import { useLocation, useNavigate } from "react-router-dom";

// Component
import Login from "./Login";
import ForgetPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

// Images
import mainImg from "../../assets/images/Auth/Group171483.svg";

// Styles
import { Conatiner } from "./Auth.style";
import { useMount } from "react-use";

const MainAuthForm = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  useMount(() => {
		if (localStorage.getItem('token')) {
			navigate('/users');
		}
	});
  return (
    <Conatiner>
      <div className="authform">
        {pathname === "/forgot-password" ? (
          <ForgetPassword />
        ) : pathname === "/reset-password" ? (
          <ResetPassword />
        ) : (
          <Login />
        )}

      </div>
      <div className="loginImg">
        <img className="mainImg" src={mainImg} alt="" />
      </div>
    </Conatiner>
  );
};

export default MainAuthForm;
