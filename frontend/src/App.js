import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import FormikExamplePage from "./pages/FormikExamplePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formik-example-page" element={<FormikExamplePage />} />
      </Routes>
    </Router>
  );
}

export default App;
