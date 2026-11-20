import EmployeeTaskColumn from "./EmployeeTaskColumn";

const EmployeeTaskBoard = ({
  columns = [],
  onTaskClick,
}) => {
  return (
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
      {columns.map((column) => (
        <EmployeeTaskColumn
          key={column.id}
          title={column.title}
          tasks={column.tasks}
          color={column.color}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
};

export default EmployeeTaskBoard;