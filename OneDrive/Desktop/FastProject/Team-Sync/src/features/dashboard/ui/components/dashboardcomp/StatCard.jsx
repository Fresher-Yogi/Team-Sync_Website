
const StatCard = ({ stat }) => {
  const Icon = stat.icon;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#19191f] p-5 transition hover:border-white/[0.12]">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">
            {stat.title}
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-white">
            {stat.value}
          </h3>
        </div>

        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}>
          <Icon size={21} className={stat.iconColor} />
        </div>
      </div>

      <p className="mt-4 text-[11px] text-zinc-500">
        {stat.note}
      </p>

    </div>
  );
};

export default StatCard;
