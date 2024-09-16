import { BrowserRouter,Routes, Route, Navigate} from "react-router-dom";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import Chat from "./pages/auth/chat";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/auth" element={<Auth/>}/>
      <Route path="*" element={< Navigate to="/auth" />}  />
      <Route path ="/auth" element={<Auth/>}/>
      <Route path ="/chat" element={<Chat/>}/>
      <Route path ="/profile" element={<Profile/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
