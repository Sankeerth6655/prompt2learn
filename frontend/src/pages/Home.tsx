import {
  Brain,
  BookOpen,
  GraduationCap,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const features = [
    {
      title: "Personalized Roadmaps",
      description:
        "Generate learning roadmaps tailored to your goals and experience level.",
      icon: <Target size={18} />,
    },
    {
      title: "AI Generated Content",
      description:
        "Learn concepts with structured theory, examples, key points and references.",
      icon: <BookOpen size={18} />,
    },
    {
      title: "Progress Tracking",
      description:
        "Track completed concepts and monitor your overall learning progress.",
      icon: <TrendingUp size={18} />,
    },
    {
      title: "AI Tutor",
      description:
        "Ask questions anytime and get concise explanations related to your roadmap.",
      icon: <Brain size={18} />,
    },
    {
      title: "Concept Based Learning",
      description:
        "Break complex subjects into manageable concepts and learn step-by-step.",
      icon: <GraduationCap size={18} />,
    },
    {
      title: "Flexible Learning Paths",
      description:
        "Customize topics and focus on what matters most for your goals.",
      icon: <Sparkles size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#D1D1D1]">
      <main className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <section className="flex flex-col items-center text-center">
          <div
            className="
              mb-4
              rounded-full
              border border-[rgba(220,38,38,0.18)]
              bg-[rgba(220,38,38,0.08)]
              px-3 py-1
              text-xs
              font-medium
              text-[rgba(220,38,38,0.70)]
            "
          >
            AI Powered Learning Platform
          </div>

          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-[#D1D1D1] sm:text-4xl">
            prompt
            <span className="mx-[2px] text-[#DC2626]">2</span>
            learn
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#8A8A8A] sm:text-base">
            Generate personalized learning roadmaps, explore AI-generated
            educational content, track your progress and master concepts
            faster with your personal AI tutor.
          </p>

          <button
            className="
                mt-8
                rounded-xl
                border border-[rgba(220,38,38,0.20)]
                bg-[rgba(220,38,38,0.10)]
                px-8 py-3.5
                text-base
                font-medium
                text-[#D1D1D1]
                transition-all
                hover:border-[rgba(220,38,38,0.30)]
                hover:bg-[rgba(220,38,38,0.14)]
            "
            onClick={()=>{
              isAuthenticated?navigate('/dashboard'):navigate("/auth")
            }}
            >
            Get Started
            </button>
        </section>

        {/* Features */}
        <section className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold text-white">
              Features
            </h2>

            <p className="mt-2 text-sm text-[#8A8A8A]">
              Everything you need to learn efficiently with AI.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="
                  rounded-2xl
                  border border-[#1A1A1C]
                  bg-[#111113]
                  p-4
                  transition-all
                  hover:border-[rgba(220,38,38,0.20)]
                "
              >
                <div
                  className="
                    mb-3
                    flex h-9 w-9 items-center justify-center
                    rounded-xl
                    border border-[rgba(220,38,38,0.20)]
                    bg-[rgba(220,38,38,0.10)]
                    text-[#D1D1D1]
                  "
                >
                  {feature.icon}
                </div>

                <h3 className="text-sm font-medium text-[#D1D1D1]">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#8A8A8A]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}