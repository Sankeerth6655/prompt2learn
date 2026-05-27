import { useState } from "react";
import { BookOpen, Brain, Eye, EyeOff } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#D1D1D1] flex items-center justify-center p-4">
      <div className="w-full max-w-[900px] grid lg:grid-cols-2 overflow-hidden rounded-2xl border border-[#1A1A1C] bg-[#111113]">
        
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-between border-r border-[#1A1A1C] bg-[#0D0D0F] p-7">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.18)] bg-[rgba(220,38,38,0.08)] px-3 py-1 text-xs font-medium text-[rgba(220,38,38,0.70)]">
              <Brain size={14} />
              AI Ready
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight">
              Prompt2Learn
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#8A8A8A]">
              Generate personalized learning roadmaps, study concepts with AI,
              track progress and learn faster with your personal AI tutor.
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-[#1A1A1C] bg-[#111113] p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-[rgba(220,38,38,0.20)] bg-[rgba(220,38,38,0.10)] p-2">
                  <BookOpen size={16} className="text-[#DC2626]" />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Personalized Roadmaps
                  </p>
                  <p className="text-xs text-[#8A8A8A]">
                    Tailored learning paths for your goals.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#1A1A1C] bg-[#111113] p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-[rgba(220,38,38,0.20)] bg-[rgba(220,38,38,0.10)] p-2">
                  <Brain size={16} className="text-[#DC2626]" />
                </div>

                <div>
                  <p className="text-sm font-medium">AI Tutor</p>
                  <p className="text-xs text-[#8A8A8A]">
                    Ask questions and get instant guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex items-center justify-center px-6 py-7 sm:px-8">
          <div className="w-full max-w-[320px]">
            
            {/* Mobile Branding */}
            <div className="mb-8 lg:hidden">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.18)] bg-[rgba(220,38,38,0.08)] px-3 py-1 text-xs font-medium text-[rgba(220,38,38,0.70)]">
                <Brain size={14} />
                AI Ready
              </div>

              <h1 className="mt-4 text-2xl font-semibold tracking-tight">
                Prompt2Learn
              </h1>

              <p className="mt-2 text-sm text-[#8A8A8A]">
                Learn smarter with AI-powered roadmaps.
              </p>
            </div>

            <div className="mb-7">
              <h2 className="text-xl font-semibold">
                {isLogin ? "Welcome back" : "Create account"}
              </h2>

              <p className="mt-2 text-sm text-[#8A8A8A]">
                {isLogin
                  ? "Sign in to continue your learning journey."
                  : "Start building personalized learning roadmaps."}
              </p>
            </div>

            <div className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="mb-2 block text-sm text-[#8A8A8A]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="John Doe"
                    className="h-10 w-full rounded-xl border border-[#1A1A1C] bg-[#0D0D0F] px-4 text-sm outline-none transition-all placeholder:text-[#303030] focus:border-[rgba(220,38,38,0.30)]"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm text-[#8A8A8A]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="h-10 w-full rounded-xl border border-[#1A1A1C] bg-[#0D0D0F] px-4 text-sm outline-none transition-all placeholder:text-[#303030] focus:border-[rgba(220,38,38,0.30)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#8A8A8A]">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-10 w-full rounded-xl border border-[#1A1A1C] bg-[#0D0D0F] px-4 pr-12 text-sm outline-none transition-all placeholder:text-[#303030] focus:border-[rgba(220,38,38,0.30)]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] hover:text-[#D1D1D1]"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button className="text-xs text-[#8A8A8A] hover:text-[#D1D1D1]">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                className="
                  w-full
                  rounded-xl
                  border
                  border-[rgba(220,38,38,0.20)]
                  bg-[rgba(220,38,38,0.10)]
                  py-2.5
                  text-sm
                  font-medium
                  text-[#D1D1D1]
                  transition-all
                  hover:border-[rgba(220,38,38,0.30)]
                  hover:bg-[rgba(220,38,38,0.14)]
                "
              >
                {isLogin ? "Login" : "Create Account"}
              </button>

              <p className="text-center text-sm text-[#8A8A8A]">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}

                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-[rgba(220,38,38,0.70)] hover:text-[#DC2626]"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


