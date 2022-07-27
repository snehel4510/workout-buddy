import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={ <Home /> }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
