import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from "./components/mainPage/mainPage";
import SwapMenu from "./components/swapMenu/swapMenu";
import ChatSection from "./components/chatSection/chatSection";
import Profile from "./components/profileSection/profileSection";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<MainPage/>}/>
                <Route path="/swap-menu/:id" element={<SwapMenu/>}/>
                <Route path="chat" element={<ChatSection/>}/>
                <Route path="profile" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
