
import AttendanceCalendar from "../components/AttendanceCalendar";
import AttendanceHeader from "../components/AttendanceHeader";
import AttendanceHistory from "../components/AttendanceHistory";
import AttendanceStats from "../components/AttendanceStats";
import TodayAttendance from "../components/TodayAttendance";

const EmployeeAttendance = () => {
  return (
    <div className="min-h-full w-full bg-[var(--bg-main)] p-5 text-[var(--text-primary)] sm:p-6 lg:p-8">
      <AttendanceHeader />

      <AttendanceStats />

      <div className="mb-6">
        <TodayAttendance />
      </div>

      <div className="mb-6">
        <AttendanceCalendar />
      </div>

      <AttendanceHistory />
    </div>
  );
};

export default EmployeeAttendance;
