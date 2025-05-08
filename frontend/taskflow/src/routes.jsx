import Homelayout from "./pages/Homelayout";
import Authlayout from "./pages/Authlayout";
import RegisterForm from "./pages/RegisterForm";
import Loginform from "./pages/Loginform";
import Tasklist from "./pages/Tasklist";
import EditTask from "./pages/EditTask";
import Tasklayout from "./pages/Tasklayout";
import Rootlayout from "./pages/Rootlayout";
import CreateTask from "./pages/CreateTask";
import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./pages/AdminPanel";
const routes = [
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      { index: true, element: <Homelayout /> },
      {
        path: `admin`,
        element: (
          <PrivateRoute adminOnly={true}>
            <AdminPanel />
          </PrivateRoute>
        ),
      },
      {
        path: "tasks",
        element: <Tasklayout />,
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <Tasklist />
              </PrivateRoute>
            ),
          },
          {
            path: "edit-task/:id",
            element: (
              <PrivateRoute>
                <EditTask />
              </PrivateRoute>
            ),
          },
          {
            path: "newtask",
            element: (
              <PrivateRoute>
                <CreateTask />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "auth",
        element: <Authlayout />,
        children: [
          { index: true, element: <RegisterForm /> },
          { path: "login", element: <Loginform /> },
        ],
      },
    ],
  },
];

export default routes;
