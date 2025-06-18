import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useAppSelector } from "../../redux/store";



function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useAppSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  if (sessionUser) return <Navigate to="/" replace={true} />;
  const demoLogin = () => {
      setEmail('demo@aa.io');
      setPassword('password');
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        credential: email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message:string) => <p key={message}>{message}</p>)}
      <form onSubmit={(e) => handleSubmit(e)} className="login-form">
        <h1 className="login-title">Log in to TweeTalk</h1>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="login-input"
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="pasword"
            className="login-input"
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">
          Log In
          </button>
          <button
              id="demo-login-button"
              type="button"
              onClick={() => {
                  demoLogin();
              }}
          >
              Demo Login
          </button>
      </form>
    </>
  );
}

export default LoginFormPage;
