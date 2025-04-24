import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GetStarted from "./pages/GetStarted";
import FormikExamplePage from "./pages/FormikExamplePage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/formik-example-page" element={<FormikExamplePage />} />
      </Routes>
    </Router>
  );
}

export default App;
