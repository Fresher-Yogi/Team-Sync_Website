
import React from "react";
import { useAuthHook } from "../../hooks/useAuthHook";

const Register = () => {
  let { register, handleSubmit, regSubmit, navigate } = useAuthHook();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] font-['Inter']">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-5">
        <h2 className="text-xl font-bold tracking-tight">Team-Sync</h2>
      </header>

      <main className="flex min-h-screen w-full">
        {/* Left Section */}
        <section className="hidden md:flex md:w-[40%] relative flex-col justify-end p-12 overflow-hidden border-r border-[var(--border-color)] bg-[var(--bg-surface)]">
          <img
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200"
            alt="AI Visualization"
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-transparent" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-[var(--primary)]">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                Next-Gen Intelligence
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight max-w-md">
              Accelerate your team's intelligence.
            </h1>

            <p className="text-base text-[var(--text-secondary)] max-w-sm leading-relaxed">
              Connect your enterprise data to our specialized AI models and
              unlock unparalleled strategic insights in seconds.
            </p>

            <div className="pt-8 flex gap-10 opacity-70">
              <div>
                <h3 className="text-xl font-bold">99.9%</h3>
                <p className="text-xs text-[var(--text-secondary)]">Uptime SLA</p>
              </div>

              <div>
                <h3 className="text-xl font-bold">ISO</h3>
                <p className="text-xs text-[var(--text-secondary)]">27001 Certified</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section */}
        <section className="w-full md:w-[60%] flex items-center justify-center p-6 md:p-12 bg-[var(--bg-main)]">
          <div className="w-full max-w-[480px] space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Create your account
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Experience the future of collaborative data intelligence.
              </p>
            </div>

            <form onSubmit={handleSubmit(regSubmit)} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Full Name
                </label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xl">
                    person
                  </span>

                  <input
                    {...register("name", { required: "name is required" })}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg py-4 pl-12 pr-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_20%,transparent)] placeholder:text-[var(--text-muted)]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Email Address
                </label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xl">
                    mail
                  </span>

                  <input
                    {...register("email", { required: "email is required" })}
                    type="email"
                    placeholder="name@company.com"
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg py-4 pl-12 pr-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_20%,transparent)] placeholder:text-[var(--text-muted)]"
                  />
                </div>
              </div>

              {/* Department */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Department
                </label>

                <select
                  {...register("department", {
                    required: "Department is required",
                  })}
                  defaultValue=""
                  className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg py-4 px-4 text-sm text-[var(--text-secondary)] outline-none focus:border-[var(--primary)]"
                >
                  <option value="" disabled>
                    Select your department
                  </option>
                  <option value="developer">Developer</option>
                  <option value="design">Design</option>
                  <option value="hr">Human Resources</option>
                  <option value="management">Management</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                </select>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Password
                </label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xl">
                    lock
                  </span>

                  <input
                    {...register("password", {
                      required: "password is required",
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg py-4 pl-12 pr-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_20%,transparent)] placeholder:text-[var(--text-muted)]"
                  />
                </div>

                {/* Static Password Strength */}
                <div className="pt-1 space-y-2">
                  <div className="flex gap-1">
                    <div className="h-1 flex-1 rounded-full bg-[var(--primary)]" />
                    <div className="h-1 flex-1 rounded-full bg-[var(--primary)]" />
                    <div className="h-1 flex-1 rounded-full bg-[var(--border-color)]" />
                    <div className="h-1 flex-1 rounded-full bg-[var(--border-color)]" />
                  </div>

                  <p className="text-xs text-[var(--primary)]">Strong password</p>
                </div>
              </div>

              {/* Create Account */}
              <button
                type="submit"
                className="w-full bg-[var(--primary)] text-[var(--bg-main)] font-bold py-4 rounded-lg shadow-lg hover:opacity-85 transition-all"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[var(--border-color)]" />
              <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-[var(--border-color)]" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-4 border border-[var(--border-color)] rounded-lg hover:bg-[var(--bg-hover)] transition-colors">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5 h-5"
                  alt="Google"
                />
                <span className="text-sm">Google</span>
              </button>

              <button className="flex items-center justify-center gap-2 py-4 border border-[var(--border-color)] rounded-lg hover:bg-[var(--bg-hover)] transition-colors">
                <span className="material-symbols-outlined text-xl">hub</span>
                <span className="text-sm">SSO</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-[var(--text-secondary)]">
                Already have an account?
                <a
                  onClick={() => {
                    navigate("/");
                  }}
                  className="text-[var(--primary)] font-bold ml-2 hover:underline cursor-pointer"
                >
                  Log In
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-[var(--bg-surface)] border-t border-[var(--border-color)]">
        <h3 className="text-lg font-bold">Team-Sync</h3>

        <div className="flex flex-wrap justify-center gap-6 text-xs text-[var(--text-secondary)]">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Security</a>
          <a href="#">System Status</a>
        </div>

        <p className="text-xs text-[var(--text-muted)]">
          © 2024 Team-Sync. Enterprise Intelligence Platforms.
        </p>
      </footer>
    </div>
  );
};

export default Register;
