import EmployeeAttendance from "../features/employee module/attendance/ui/pages/EmployeeAttendance";
import EmployeeTasks from "../features/employee module/my tasks/ui/pages/EmployeeTasks";
import EmployeeProfile from "../features/employee module/profile/ui/pages/EmployeeProfile";


export let employeesRoutes = [
    {
        path:'atn',
        element: <EmployeeAttendance/>
    },
    {
        path: 'mytasks',
        element: <EmployeeTasks/>
    },
    {
        path: 'profile',
        element: <EmployeeProfile/>
    }
]