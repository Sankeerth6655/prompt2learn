import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Clock3,
  BookOpen,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateRoadmapMutation } from "../redux/features/roadmapApi";
import { toast } from "react-toastify";

export default function RoadmapPreview() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const location = useLocation();
  const roadmap = location.state?.roadmap;

  const [createRoadmap ]= useCreateRoadmapMutation();

  const navigate = useNavigate();
  


  const totalConcepts = roadmap?.roadmap.reduce(
    (sum:any, item:any) => sum + item.concepts.length,
    0
  );

  const handleConfirmAndSaveRoadmap = async ()=>{
    try {
      await createRoadmap(roadmap);
      toast.success("Roadmap Saved Successfully");
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#D1D1D1]">
      <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-white">
            {roadmap?.topic}
          </h1>

          <p className="mt-1 text-sm text-[#8A8A8A]">
            Review the generated roadmap before saving.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <div
              className="
                inline-flex items-center gap-2
                rounded-xl
                border border-[rgba(220,38,38,0.20)]
                bg-[rgba(220,38,38,0.10)]
                px-3 py-1.5
                text-sm
              "
            >
              <Clock3 size={14} />
              {roadmap?.estimatedDays} Days
            </div>

            <div
              className="
                inline-flex items-center gap-2
                rounded-xl
                border border-[#1A1A1C]
                bg-[#111113]
                px-3 py-1.5
                text-sm
              "
            >
              {roadmap?.difficulty}
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div
          className="
            mt-8
            overflow-hidden
            rounded-2xl
            border border-[#1A1A1C]
            bg-[#111113]
          "
        >
          {roadmap?.roadmap.map((item:any, index:any) => {
            const isOpen = expanded === index;

            return (
              <div
                key={index}
                className="
                  border-b border-[#1A1A1C]
                  last:border-b-0
                "
              >
                <button
                  onClick={() =>
                    setExpanded(
                      isOpen ? null : index
                    )
                  }
                  className="
                    flex w-full items-center justify-between
                    gap-4
                    px-4 py-4
                    text-left
                    transition-all
                    hover:bg-[rgba(220,38,38,0.04)]
                  "
                >
                  <div className="flex items-center gap-3">
                    {isOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}

                    <div>
                      <p className="text-sm font-medium text-white">
                        {item.subtopic}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm text-[#8A8A8A]">
                    {item.estimatedHours} hrs
                  </span>
                </button>

                {isOpen && (
                  <div
                    className="
                      border-t border-[#1A1A1C]
                      bg-[#0D0D0F]
                      px-4 py-4
                    "
                  >
                    <div className="mb-3 flex items-center gap-2 text-sm text-[#8A8A8A]">
                      <BookOpen size={14} />
                      Concepts
                    </div>

                    <div className="space-y-2">
                      {item.concepts.map(
                        (concept:{title:string,_id:string,completed:boolean}, idx:number) => (
                          <div
                            key={idx}
                            className="
                              rounded-xl
                              border border-[#1A1A1C]
                              bg-[#111113]
                              px-3 py-2.5
                              text-sm
                              text-[#D1D1D1]
                            "
                          >
                            • {concept.title}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div
          className="
            mt-6
            rounded-2xl
            border border-[#1A1A1C]
            bg-[#111113]
            p-4
          "
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div>
              <p className="text-xs text-[#8A8A8A]">
                Total Subtopics
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {roadmap?.roadmap.length}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#8A8A8A]">
                Total Concepts
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {totalConcepts}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#8A8A8A]">
                Estimated Duration
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {roadmap?.estimatedDays} Days
              </p>
            </div>
          </div>
        </div>

        {/* Confirm */}
        <div className="mt-6 flex gap-3 justify-end">
          <button
            className="
              w-full sm:w-auto
              rounded-xl
              border border-[rgba(220,38,38,0.20)]
              bg-[rgba(220,38,38,0.10)]
              px-6 py-3
              text-sm
              font-medium
              text-[#D1D1D1]
              transition-all
              hover:border-[rgba(220,38,38,0.30)]
              hover:bg-[rgba(220,38,38,0.14)]
            "
            onClick={()=>{navigate('/create-roadmap')}}
          >
            Cancel
          </button>
          <button
            className="
              w-full sm:w-auto
              rounded-xl
              border border-[rgba(220,38,38,0.20)]
              bg-[rgba(220,38,38,0.10)]
              px-6 py-3
              text-sm
              font-medium
              text-[#D1D1D1]
              transition-all
              hover:border-[rgba(220,38,38,0.30)]
              hover:bg-[rgba(220,38,38,0.14)]
            "
            onClick={handleConfirmAndSaveRoadmap}
          >
            Confirm & Save Roadmap
          </button>
        </div>
      </main>
    </div>
  );
}