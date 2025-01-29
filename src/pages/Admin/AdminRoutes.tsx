import AdminHeader from "../../components/AdminHeader"
import AdminMenu from "../../components/AdminMenu"
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./Dashboard";
import Tests from "./Test/Tests";
import AddTests from "./Test/AddTests";
import Questions from "./Test/Questions";
import AddQuestion from "./Test/AddQuestion";
import TestSeries from "./TestSeries/TestSeriesComp";
import AddTestSeries from "./TestSeries/AddTestSeries";

const AdminRoutes = () => {
    return (
        <div>
            <AdminHeader />
            <div className="d-flex">
                <AdminMenu />
                <Routes>
                    <Route path="" element={<Dashboard />} />
                    <Route path="/tests" element={<Tests />} />
                    <Route path="/tests/new" element={<AddTests />} />
                    <Route path="/tests/update/:id" element={<AddTests />} />
                    <Route path="/tests/questions/:id" element={<Questions />} />
                    <Route path="/tests/questions/:id/new" element={<AddQuestion />} />

                    <Route path="/test-series" element={<TestSeries />} />
                    <Route path="/test-series/new" element={<AddTestSeries />} />
                    <Route path="/test-series/update/:id" element={<AddTestSeries />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminRoutes
