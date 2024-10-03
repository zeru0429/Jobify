import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AdminLayout } from "../layout/Admin/AdminLayout";
import Login from "../features/public/Login";
import ConfirmPassword from "../features/public/ConfirmPassword";
import ForgetPassword from "../features/public/ForgetPassword";
import Profile from "../features/public/Profile";
import NotFound from "../features/public/NotFound";
import UserList from "../features/admin/UserList";
import DashBoard from "../features/admin/DashBoard";
import CompanyList from "../features/company/Company_list";
import JobList from "../features/job/JobList";
import ApplicantsList from "../features/applicants/ApplicantsList";
import AddCompany from "../features/company/AddCompany";
import AddUser from "../features/admin/AddUser";
import AddJob from "../features/job/AddJob";
import AddApplication from "../features/applicants/AddApplicant";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* root section */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/profile" element={<Profile />} />

      {/* admin section */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          path="/admin/"
          element={
            <>
              <DashBoard />
            </>
          }
        />
        <Route path="/admin/user" element={<UserList />} />
        <Route path="/admin/add-user" element={<AddUser />} />
        <Route path="/admin/company" element={<CompanyList />} />
        <Route path="/admin/add-company" element={<AddCompany />} />

        <Route path="/admin/job" element={<JobList />} />
        <Route path="/admin/add-job" element={<AddJob />} />

        <Route path="/admin/applicants" element={<ApplicantsList />} />
        <Route path="/admin/add-applicant" element={<AddApplication />} />

        <Route
          path="/admin/report"
          element={
            <>
              <h1>report</h1>
            </>
          }
        />
        <Route path="/admin/*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);
