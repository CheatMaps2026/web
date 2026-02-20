import './App.css'
import {ApiClientProvider} from "./providers/ApiClientProvider";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {NavBar} from "./components/NavBar";
import {HomeView} from "./views/HomeView";
import {VerificationView} from "./views/VerificationView";
import {MapView} from "./views/MapView";
import {AboutView} from "./views/AboutView";
import {ContactView} from "./views/ContactView";
import {NewsletterView} from "./views/NewsletterView";
import {ObservationsStoreProvider} from "./providers/ObservationsStoreProvider";

export const App = () => {

    return (
        <ApiClientProvider>
            <ObservationsStoreProvider>
                <BrowserRouter>
                    <header className="app-header">
                        <NavBar/>
                    </header>
                    <Routes>
                        <Route path={"/"} element={<HomeView/>}/>
                        <Route path={"/verification"} element={<VerificationView/>}/>
                        <Route path={"/map"} element={<MapView/>}/>
                        <Route path={"/about"} element={<AboutView/>}/>
                        <Route path={"/contact"} element={<ContactView/>}/>
                        <Route path={"/newsletter"} element={<NewsletterView/>}/>
                    </Routes>
                    {/*<Observations/>*/}
                </BrowserRouter>
            </ObservationsStoreProvider>
        </ApiClientProvider>
    )
}