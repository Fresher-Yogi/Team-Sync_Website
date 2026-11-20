
import SectionHeading from "./SectionHeading";
import StatCard from "./StatCard";

const DashboardStats = ({ stats = [] }) => {
  return (
    <section className="mb-8">

      <SectionHeading
        title="Overview"
        subtitle="Your workspace at a glance"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

    </section>
  );
};

export default DashboardStats;
