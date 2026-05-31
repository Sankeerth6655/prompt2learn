import { ArrowRight, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetRoadmapsQuery } from "../redux/features/roadmapApi";

export default function Dashboard() {

  const {data} = useGetRoadmapsQuery();

  const totalRoadmaps = data?.length;
  let completedRoadmaps = 0;
  data?.map((r)=>{
    if(r.status === 'COMPLETED') completedRoadmaps++;
  })
  const inProgressRoadmaps = totalRoadmaps! - completedRoadmaps;

  const navigate = useNavigate();


  // const roadmaps =
  //  [
  //   {
  //     id: 1,
  //     topic: "Backend Developer",
  //     progress: 65,
  //     difficulty: "Intermediate",
  //   },
  //   {
  //     id: 2,
  //     topic: "MERN Stack Developer",
  //     progress: 100,
  //     difficulty: "Beginner",
  //   },
  //   {
  //     id: 3,
  //     topic: "Java Developer",
  //     progress: 35,
  //     difficulty: "Advanced",
  //   },
  //   {
  //     id: 4,
  //     topic: "DevOps Engineer",
  //     progress: 20,
  //     difficulty: "Beginner",
  //   },
  // ];


  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#D1D1D1]">
      <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-[#8A8A8A]">
              Track your progress and pick up where you left off.
            </p>
          </div>

          <Link to='/create-roadmap'
            className="
              flex items-center justify-center gap-2
              rounded-xl
              border border-[rgba(220,38,38,0.20)]
              bg-[rgba(220,38,38,0.10)]
              px-5 py-2.5
              text-sm
              font-medium
              text-[#D1D1D1]
              transition-all
              hover:border-[rgba(220,38,38,0.30)]
              hover:bg-[rgba(220,38,38,0.14)]
            "
          >
            <Plus size={16} />
            Create Roadmap
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#1A1A1C] bg-[#111113] p-4">
            <p className="text-xs text-[#8A8A8A]">
              Total Roadmaps
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              {totalRoadmaps}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#1A1A1C] bg-[#111113] p-4">
            <p className="text-xs text-[#8A8A8A]">
              Completed
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              {completedRoadmaps}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#1A1A1C] bg-[#111113] p-4">
            <p className="text-xs text-[#8A8A8A]">
              In Progress
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              {inProgressRoadmaps}
            </h2>
          </div>
        </div>

        {/* Roadmaps */}
        {data?.length === 0 ? (
        <div
            className="
            mt-8
            rounded-2xl
            border border-[#1A1A1C]
            bg-[#111113]
            p-8 sm:p-10
            text-center
            "
        >
            <h2 className="text-lg font-semibold text-white">
            No Roadmaps Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8A8A8A]">
            Create your first personalized roadmap and start learning with
            AI-generated content, progress tracking and guided concepts.
            </p>

            <Link to='/create-roadmap'
            className="
                mt-6
                inline-flex items-center gap-2
                rounded-xl
                border border-[rgba(220,38,38,0.20)]
                bg-[rgba(220,38,38,0.10)]
                px-5 py-2.5
                text-sm font-medium
                text-[#D1D1D1]
                transition-all
                hover:border-[rgba(220,38,38,0.30)]
                hover:bg-[rgba(220,38,38,0.14)]
            "
            >
            <Plus size={16} />
            Create Your First Roadmap
            </Link>
        </div>
        ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {data?.map((roadmap) => (
            <div
                key={roadmap.id}
                className="
                rounded-2xl
                border border-[#1A1A1C]
                bg-[#111113]
                p-4
                transition-all
                hover:border-[rgba(220,38,38,0.20)]
                "
            >
                <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-base font-medium text-white">
                    {roadmap.topic}
                    </h3>

                    <p className="mt-1 text-sm text-[#8A8A8A]">
                    {roadmap.difficulty}
                    </p>
                </div>

                <span className="text-sm font-medium text-[#D1D1D1]">
                    {roadmap.progress}%
                </span>
                </div>

                {/* Progress */}
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#1A1A1C]">
                <div
                    className="h-full rounded-full bg-[#DC2626]"
                    style={{
                    width: `${roadmap.progress}%`,
                    }}
                />
                </div>

                <div className="mt-4 flex justify-end">
                <button
                    className="
                    group
                    inline-flex
                    items-center
                    gap-1.5
                    text-sm
                    text-[#D1D1D1]
                    transition-colors
                    hover:text-white
                    "
                    onClick={()=>navigate(`/learning/${roadmap.id}`)}
                >
                    <span
                    className="
                        transition-transform
                        duration-300
                        group-hover:-translate-x-0.5
                    "
                    >
                    Continue
                    </span>

                    <ArrowRight
                    size={15}
                    className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                    "
                    />
                </button>
                </div>
            </div>
            ))}
        </div>
        )}

      </main>
    </div>
  );
}