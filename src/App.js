import {Route, Routes} from "react-router-dom";
import './App.css';
import Main from "./Main/Main";
import Compra from "./Compra/Compra";
import Login from "./Login/Login";
import {useSelector} from "react-redux";

function App() {
    const userId = useSelector((state) => state.user.userId)

    const routes = [
        {
            path: "/",
            main: () => <Main/>
        },
        {
            path: "/compra/",
            main: () => <Compra/>
        },
    ];

    if(userId) {
        return (
            <div>
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            element={<route.main/>}
                        />
                    ))}
                </Routes>
            </div>
        );
    }
    else
        return <Login/>
}

export default App;
