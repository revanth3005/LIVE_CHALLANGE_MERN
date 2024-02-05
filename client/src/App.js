import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Register/Register";
import ContextAPi from "./components/ContextAPi";
import Task from "./pages/Task/Task";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <ContextAPi>
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/task" element={<Task />} />
          </Route>
        </Routes>
      </ContextAPi>
    </div>
  );
}

export default App;
