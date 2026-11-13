import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { CarPage, ReservationPage, ReservationDetails, CreateCar, EditCar, MainSection } from "../pages/dashboard";
import { ProtectedRoutes } from "./ProtectedRoutes";
import DevelopmentSection from "../components/ui/DevelopmentSection";

function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<DashboardLayout />} >
          <Route path="/dashboard" element={<MainSection />} index />
          <Route path="/dashboard/vehicles" element={<CarPage />} />
          <Route path="/dashboard/reservation" element={<ReservationPage />} />
          <Route path="/dashboard/reservation/:id" element={<ReservationDetails />} />
          <Route path="/dashboard/vehicles/add" element={<CreateCar />} />
          <Route path="/dashboard/vehicles/edit" element={<EditCar />} />
          <Route path="/dashboard/clients" element={<DevelopmentSection />} />
          <Route path="/dashboard/settings" element={<DevelopmentSection />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default DashboardRoutes;