import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AdminLayout } from "../layout/Admin/AdminLayout";
import Login from "../features/Login";
import ConfirmPassword from "../features/ConfirmPassword";
import ForgetPassword from "../features/ForgetPassword";
import Profile from "../features/Profile";
import NotFound from "../features/NotFound";
import UserList from "../features/admin/user/UserList";
import AddUser from "../features/admin/user/AddUser";
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
          path="/admin/dashbord"
          element={
            <>
              <h1>dashbord</h1>
            </>
          }
        />
        <Route path="/admin/user" element={<UserList />} />
        <Route path="/admin/add-user" element={<AddUser />} />
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
