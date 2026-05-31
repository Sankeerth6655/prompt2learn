import { useState } from "react";
import {
  Plus,
  X,
  ChevronDown,
} from "lucide-react";
import { useGenerateSubtopicsMutation, useGenerateRoadmapMutation } from "../redux/features/aiApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Difficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export default function GenerateRoadmap() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] =
    useState<Difficulty>("Beginner");
  const [difficultyOpen, setDifficultyOpen] =
  useState(false);

  const [generateSubtopics,{isLoading:generatingSubtopics}] = useGenerateSubtopicsMutation();
  const [generateRoadmap,{isLoading:generatingRoadmap}] = useGenerateRoadmapMutation();
 
  const [subtopics, setSubtopics] = useState<string[]>([]);

  const navigate = useNavigate();


  async function handleGenerateSubtopics() {
    try {
      let response = await generateSubtopics({topic,difficulty}).unwrap();
      setSubtopics(response.subtopics);
    } catch (error:any) {
      toast.error(error);
    }
  }

  async function handleGenerateRoadmap(){
    try {
      let response = await generateRoadmap({topic,difficulty,subtopics}).unwrap();
      navigate('/roadmap-preview',{ state:{roadmap:{topic,difficulty,...response}}});
    } catch (error:any) {
      console.log(error);
    }
  }

  function updateSubtopic(
    index: number,
    value: string
  ) {
    const updated = [...subtopics];

    updated[index] = value;

    setSubtopics(updated);
  }

  function removeSubtopic(index: number) {
    setSubtopics((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  function insertSubtopic(index: number) {
    const updated = [...subtopics];

    updated.splice(index + 1, 0, "");

    setSubtopics(updated);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#D1D1D1]">
      <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Create Roadmap
          </h1>

          <p className="mt-1 text-sm text-[#8A8A8A]">
            Generate a personalized learning roadmap
            tailored to your goals.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="
            mt-8
            rounded-2xl
            border border-[#1A1A1C]
            bg-[#111113]
            p-4 sm:p-5
          "
        >

        <div className="flex flex-col gap-4 md:flex-row">
            {/* Topic */}
            <div className="flex-1">
                <label className="mb-2 block text-sm text-[#8A8A8A]">
                Learning Goal
                </label>

                <input
                value={topic}
                onChange={(e) =>
                    setTopic(e.target.value)
                }
                placeholder="Become a Backend Developer"
                className="
                    h-10
                    w-full
                    rounded-xl
                    border border-[#1A1A1C]
                    bg-[#0D0D0F]
                    px-4
                    text-sm
                    text-[#D1D1D1]
                    outline-none
                    placeholder:text-[#303030]
                    focus:border-[rgba(220,38,38,0.30)]
                "
                />
            </div>

            {/* Difficulty */}
            <div className="relative md:w-[220px]">
                <label className="mb-2 block text-sm text-[#8A8A8A]">
                Difficulty
                </label>

                <button
                type="button"
                onClick={() =>
                    setDifficultyOpen(
                    !difficultyOpen
                    )
                }
                className="
                    flex h-10 w-full items-center justify-between
                    rounded-xl
                    border border-[#1A1A1C]
                    bg-[#0D0D0F]
                    px-4
                    text-sm
                    text-[#D1D1D1]
                    transition-all
                    hover:border-[rgba(220,38,38,0.20)]
                "
                >
                {difficulty}

                <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                    difficultyOpen
                        ? "rotate-180"
                        : ""
                    }`}
                />
                </button>

                {difficultyOpen && (
                <div
                    className="
                    absolute left-0 right-0 z-20 mt-2
                    overflow-hidden
                    rounded-xl
                    border border-[#1A1A1C]
                    bg-[#111113]
                    shadow-xl
                    "
                >
                    {[
                    "Beginner",
                    "Intermediate",
                    "Advanced",
                    ].map((level) => (
                    <button
                        key={level}
                        type="button"
                        onClick={() => {
                        setDifficulty(
                            level as Difficulty
                        );

                        setDifficultyOpen(false);
                        }}
                        className={`
                        flex w-full items-center
                        px-4 py-3
                        text-left text-sm
                        transition-all

                        ${
                            difficulty === level
                            ? "bg-[rgba(220,38,38,0.10)] text-white"
                            : "text-[#D1D1D1] hover:bg-[rgba(220,38,38,0.06)]"
                        }
                        `}
                    >
                        {level}
                    </button>
                    ))}
                </div>
                )}
            </div>
            </div>

          {/* Generate Button */}
          {generatingSubtopics && (
            <button
              disabled
              className="
                mt-6
                rounded-xl
                cursor-not-allowed 
                opacity-60
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
              Generating Subtopics...
            </button>
          )}
          {!generatingSubtopics && subtopics?.length === 0 && (
            <button
              onClick={handleGenerateSubtopics}
              className="
                mt-6
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
              Generate Subtopics
            </button>
          )}

          {/* Subtopics */}
          {subtopics?.length > 0 && (
            <>
              <div className="mt-8">
                <h2 className="text-sm font-medium text-white">
                  Subtopics
                </h2>

                <p className="mt-1 text-xs text-[#8A8A8A]">
                  Add, remove or edit subtopics before
                  generating the roadmap.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {subtopics?.map(
                  (subtopic, index) => (
                    <div
                      key={index}
                      className="flex gap-2"
                    >
                      <input
                        value={subtopic}
                        onChange={(e) =>
                          updateSubtopic(
                            index,
                            e.target.value
                          )
                        }
                        className="
                          h-10
                          flex-1
                          rounded-xl
                          border border-[#1A1A1C]
                          bg-[#0D0D0F]
                          px-4
                          text-sm
                          outline-none
                          focus:border-[rgba(220,38,38,0.30)]
                        "
                      />

                        <button
                        onClick={() =>
                            insertSubtopic(index)
                        }
                        className="
                            flex h-10 w-10 items-center justify-center
                            rounded-xl
                            border border-[#1A1A1C]
                            bg-[#0D0D0F]
                            text-[#D1D1D1]
                            transition-all
                            hover:border-[rgba(220,38,38,0.20)]
                            hover:bg-[rgba(220,38,38,0.06)]
                        "
                        >
                        <Plus size={16} strokeWidth={2.5} />
                        </button>

                        <button
                        onClick={() =>
                            removeSubtopic(index)
                        }
                        className="
                            flex h-10 w-10 items-center justify-center
                            rounded-xl
                            border border-[rgba(220,38,38,0.25)]
                            bg-[rgba(220,38,38,0.10)]
                            text-[#D1D1D1]
                            transition-all
                            hover:border-[rgba(220,38,38,0.40)]
                            hover:bg-[rgba(220,38,38,0.16)]
                        "
                        >
                        <X size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                  )
                )}
              </div>

              {/* Final Button */}
              <div className="mt-6">
                {!generatingRoadmap && <button
                  className="
                    w-full sm:w-auto
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
                  onClick={handleGenerateRoadmap}
                >
                  Generate Roadmap
                </button>}
                {generatingRoadmap && <button
                  disabled
                  className="
                    w-full sm:w-auto
                    rounded-xl
                    border border-[rgba(220,38,38,0.20)]
                    bg-[rgba(220,38,38,0.10)]
                    px-5 py-2.5
                    text-sm
                    cursor-not-allowed 
                    opacity-60
                    font-medium
                    text-[#D1D1D1]
                    transition-all
                    hover:border-[rgba(220,38,38,0.30)]
                    hover:bg-[rgba(220,38,38,0.14)]
                  "
                  onClick={handleGenerateRoadmap}
                >
                  Generating Roadmap...
                </button>}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}