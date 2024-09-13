import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App as Home } from "../App.jsx";
import { DetailComplexe } from "../pages/Detail-Complexe.jsx";
export default function CreateRoute() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id" element={<DetailComplexe />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Router>
    );
}