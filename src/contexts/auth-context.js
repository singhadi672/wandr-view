import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import { Navigate, Route, useNavigate } from "react-router";
import Login from "../components/Login/Login";
import { videoReducer } from "./../reducers/video-reducer";
import { setupAuthHeaderForServiceCalls } from "../utilData";
import { setupAuthExceptionHandler } from "../utilData";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const loginStatus = JSON.parse(localStorage?.getItem("login")) || {};
  const [login, setLogin] = useState(loginStatus.token ? true : false);
  const [token, setToken] = useState(
    loginStatus.token ? loginStatus.token : null
  );

  let navigate = useNavigate();

  const [state, dispatch] = useReducer(videoReducer, {
    watchLater: [],
    playlist: [],
    videoHistory: [],
    likedVideos: [],
    username: "US",
  });

  useEffect(() => {
    (async () => {
      if (login) {
        try {
          setupAuthHeaderForServiceCalls(token);
          const response = await axios.get(
            "https://wandr-view-backend.vercel.app/users"
          );
          dispatch({
            type: "ADD_INITIAL_DATA",
            payload: response.data.user,
          });
        } catch (error) {
          setupAuthExceptionHandler(setLogin, navigate);
        }
      }
    })();
  }, []);

  function PrivateRoute({ path, element, ...rest }) {
    return login ? (
      <Route {...rest} path={path} element={element} />
    ) : (
      <Navigate
        state={{ from: path }}
        to="/login"
        element={<Login />}
        replace
      />
    );
  }

  async function loginUserWithCredentials(email, password) {
    try {
      const response = await axios.post(
        "https://wandr-view-backend.vercel.app/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        localStorage?.setItem(
          "login",
          JSON.stringify({ token: response.data.token })
        );
        setToken(response.data.token);
        dispatch({ type: "ADD_INITIAL_DATA", payload: response.data.user });
        setupAuthHeaderForServiceCalls(response.data.token);
        setLogin(true);
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  async function signupUser(username, email, password) {
    try {
      const response = await axios.post(
        "https://wandr-view-backend.vercel.app/signup",
        {
          email,
          password,
          username,
        }
      );
      if (response.status === 201) {
        localStorage?.setItem(
          "login",
          JSON.stringify({ token: response.data.token })
        );
        setToken(response.data.token);
        dispatch({ type: "ADD_INITIAL_DATA", payload: response.data.user });
        setupAuthHeaderForServiceCalls(response.data.token);
        setLogin(true);
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        PrivateRoute,
        loginUserWithCredentials,
        state,
        setLogin,
        dispatch,
        signupUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
