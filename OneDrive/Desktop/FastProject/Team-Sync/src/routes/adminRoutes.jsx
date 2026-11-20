import AllDepartment from "../features/admin module/departments/ui/components/AllDepartment";
import Department from "../features/admin module/departments/ui/pages/Department";
import Documents from "../features/admin module/documents/ui/pages/Documents";
import AddEmployee from "../features/admin module/employees/ui/components/add-employee/AddEmployee";
import Employees from "../features/admin module/employees/ui/pages/Employee";
import Task from "../features/admin module/tasks/ui/pages/Task";

export let adminRoutes = [
  {
    path: "dpt",
    element: <Department />,
  },
  {
    path: "docs",
    element: <Documents />,
  },
  {
    path: "employees",
    element: <Employees />,
  },
  {
    path: "add-employees",
    element: <AddEmployee/>
  },
  {
    path: "all-departments",
    element: <AllDepartment/>
  },
  {
    path: "tasks",
    element: <Task />,
  },
];
