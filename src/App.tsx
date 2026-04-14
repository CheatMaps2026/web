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
import {LoginView} from "./views/LoginView";
import { LogoutView } from './views/LogoutView';
import {ObservationsStoreProvider} from "./providers/ObservationsStoreProvider";
import {FullscreenImage} from "./components/FullscreenImage";
import { useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { signInWithRedirect } from 'aws-amplify/auth';
import { ProtectedRoute, VerifierRoute } from './guards/ProtectedRoute';

export const App = () => {

    useEffect(() => {
  
  // Listen for auth events
  const unsubscribe = Hub.listen('auth', ({ payload }) => {
    console.log('🔔 Auth event:', payload.event);
    if (payload.event === 'signedIn') {
        console.log('✅ User signed in!');
    }
    if (payload.event === 'signInWithRedirect') {
        console.log('🔄 Processing redirect...');
    }
    if (payload.event === 'signInWithRedirect_failure') {
        console.log('❌ Redirect failed:', payload.data);
    }
});

  return unsubscribe;
}, []);


    return (
        <ApiClientProvider>
            <ObservationsStoreProvider>
                <BrowserRouter>
                    <header className="app-header">
                        <NavBar/>
                    </header>
                    <Routes>
                        <Route path={"/"} element={<HomeView/>}/>
                        <Route path={"/image/:observationId"} element={<FullscreenImage/>}/>
                        <Route path={"/verification"} element={
                            <VerifierRoute>
                                <VerificationView/>
                            </VerifierRoute>}/>
                        <Route path={"/map"} element={<MapView/>}/>
                        <Route path={"/about"} element={<AboutView/>}/>
                        <Route path={"/contact"} element={<ContactView/>}/>
                        <Route path={"/newsletter"} element={<NewsletterView/>}/>
                        <Route path={"/login"} element={<LoginView/>}/>
                        <Route path={"/logout"} element={<LogoutView/>}/>
                    </Routes>
                    {/*<Observations/>*/}
                </BrowserRouter>
            </ObservationsStoreProvider>
        </ApiClientProvider>
    )
}