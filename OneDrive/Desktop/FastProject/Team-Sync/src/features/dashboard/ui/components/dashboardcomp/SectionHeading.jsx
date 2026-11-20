
const SectionHeading = ({ title, subtitle, action }) => {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">

      <div>
        <h2 className="text-base font-semibold text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-xs text-zinc-500">
            {subtitle}
          </p>
        )}
      </div>

      {action}

    </div>
  );
};

export default SectionHeading;
