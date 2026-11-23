
import React from "react";
import { useAuthHook } from "../../hooks/useAuthHook";

const Login = () => {
  let { register, handleSubmit, errors, loginSubmit, navigate } = useAuthHook();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] font-['Inter'] flex flex-col overflow-hidden relative">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[color-mix(in_srgb,var(--primary)_5%,transparent)] blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[color-mix(in_srgb,var(--secondary)_5%,transparent)] blur-[100px]" />
      </div>

      {/* Login Container */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-[440px]">
          {/* Card */}
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] shadow-[var(--shadow-md)] p-8">
            {/* Brand */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--primary)] rounded-lg mb-4">
                <span className="material-symbols-outlined text-[var(--bg-main)] text-[28px]">
                  hub
                </span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight">
                Team-Sync
              </h1>

              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Sign in to your workspace
              </p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-2 bg-[var(--bg-hover)] hover:opacity-80 border border-[var(--border-color)] py-3 px-4 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[var(--text-secondary)]">
                  cloud
                </span>

                <span className="text-[11px] font-semibold tracking-wider">
                  GOOGLE
                </span>
              </button>

              <button className="flex items-center justify-center gap-2 bg-[var(--bg-hover)] hover:opacity-80 border border-[var(--border-color)] py-3 px-4 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[var(--text-secondary)]">
                  terminal
                </span>

                <span className="text-[11px] font-semibold tracking-wider">
                  GITHUB
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center mb-8">
              <div className="flex-grow border-t border-[var(--border-color)]" />

              <span className="text-xs text-[var(--text-muted)] px-3">
                or continue with email
              </span>

              <div className="flex-grow border-t border-[var(--border-color)]" />
            </div>

          <p className="text-[12px] mb-2"> adminEmail:- swaraj@gmail.com & password:- 12345678 </p>
          <p className="text-[12px]"> employeeEmail:- dev@gmail.com & password:- 12345678 </p>
            

            {/* Form */}
            <form onSubmit={handleSubmit(loginSubmit)} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-semibold tracking-wider text-[var(--text-secondary)] ml-1">
                  EMAIL ADDRESS
                </label>

                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_30%,transparent)] focus:border-[var(--primary)] transition-all placeholder:text-[var(--text-muted)]"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-semibold tracking-wider text-[var(--text-secondary)]">
                    PASSWORD
                  </label>

                  <a
                    href="#"
                    className="text-xs text-[var(--primary)] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_30%,transparent)] focus:border-[var(--primary)] transition-all placeholder:text-[var(--text-muted)]"
                />
              </div>

              {/* Sign In */}
              <button
                type="submit"
                className="w-full bg-[var(--primary)] text-[var(--bg-main)] hover:opacity-85 py-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold"
              >
                <span>Sign In</span>

                <span className="material-symbols-outlined text-xl">login</span>
              </button>
            </form>

            {/* Footer Signup */}
            <div className="mt-8 pt-6 border-t border-[var(--border-color)] text-center">
              <p className="text-xs text-[var(--text-secondary)]">
                Don't have an account?
                <a
                  onClick={() => {
                    navigate("/reg");
                  }}
                  className="text-[var(--primary)] font-bold ml-2 hover:underline cursor-pointer"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>

          {/* Footer Meta */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[var(--text-muted)]">
              © 2024 Team-Sync. Enterprise Intelligence Platforms.
            </p>

            <div className="flex justify-center gap-4 mt-2">
              <a
                href="#"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Decoration */}
      <div className="fixed bottom-6 right-6 opacity-20 pointer-events-none hidden md:block">
        <div className="relative w-64 h-64 rounded-xl overflow-hidden border border-[var(--border-color)]">
          <img
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600"
            alt="AI Visualization"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Login;
