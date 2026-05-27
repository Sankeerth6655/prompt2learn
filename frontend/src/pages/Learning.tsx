import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Send,
} from "lucide-react";

export default function Learning() {
  const [expanded, setExpanded] = useState<number[]>([0]);

  const [selectedConcept, setSelectedConcept] =
    useState("Event Loop");

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const roadmap = [
    {
      subtopic: "Node.js",

      concepts: [
        {
          title: "Introduction to Node.js",
          completed: true,
        },
        {
          title: "Event Loop",
          completed: false,
        },
        {
          title: "Modules",
          completed: false,
        },
        {
          title: "Streams",
          completed: false,
        },
      ],
    },

    {
      subtopic: "Express.js",

      concepts: [
        {
          title: "Routing",
          completed: false,
        },
        {
          title: "Middleware",
          completed: false,
        },
        {
          title: "Controllers",
          completed: false,
        },
      ],
    },

    {
      subtopic: "MongoDB",

      concepts: [
        {
          title: "Collections",
          completed: false,
        },
        {
          title: "CRUD Operations",
          completed: false,
        },
      ],
    },
  ];

  function askAI() {
    setAnswer(
      "The Event Loop is the mechanism that allows Node.js to perform non-blocking operations by delegating tasks to the system kernel whenever possible."
    );
  }

  function toggleSubtopic(index: number) {
  setExpanded((prev) => {
    if (prev.includes(index)) {
      return prev.filter((i) => i !== index);
    }

    return [...prev, index];
  });
}

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#D1D1D1]">
      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Backend Developer
          </h1>

          <p className="mt-1 text-sm text-[#8A8A8A]">
            Continue learning and track your progress.
          </p>
        </div>

        {/* Layout */}
        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          
          {/* Sidebar */}
          <div
            className="
              lg:w-[320px]
              lg:min-w-[320px]
            "
          >
            <div
              className="
                overflow-hidden
                rounded-2xl
                border border-[#1A1A1C]
                bg-[#111113]
              "
            >
              <div className="border-b border-[#1A1A1C] p-4">
                <h2 className="font-medium text-white">
                  Roadmap
                </h2>
              </div>

              {roadmap.map(
                (subtopic, subtopicIndex) => {
                  const isOpen =
                    expanded.includes(subtopicIndex);

                  return (
                    <div
                      key={subtopic.subtopic}
                      className="
                        border-b border-[#1A1A1C]
                        last:border-b-0
                      "
                    >
                      {/* Subtopic */}
                      <button
                        onClick={() =>
                            toggleSubtopic(subtopicIndex)
                            }
                        className="
                          flex w-full items-center justify-between
                          px-4 py-3
                          text-left
                          transition-all
                          hover:bg-[rgba(220,38,38,0.04)]
                        "
                      >
                        <div className="flex items-center gap-2">
                          {isOpen ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}

                          <span className="text-sm">
                            {subtopic.subtopic}
                          </span>
                        </div>
                      </button>

                      {/* Concepts */}
                      {isOpen && (
                        <div className="pb-2">
                          {subtopic.concepts.map(
                            (concept) => (
                              <button
                                key={concept.title}
                                onClick={() =>
                                  setSelectedConcept(
                                    concept.title
                                  )
                                }
                                className={`
                                  flex w-full items-center gap-3
                                  px-6 py-2.5
                                  text-left text-sm
                                  transition-all

                                  ${
                                    selectedConcept ===
                                    concept.title
                                      ? "bg-[rgba(220,38,38,0.08)]"
                                      : "hover:bg-[rgba(220,38,38,0.04)]"
                                  }
                                `}
                              >
                                {concept.completed ? (
                                  <CheckCircle2
                                    size={16}
                                    className="text-[#DC2626]"
                                  />
                                ) : (
                                  <Circle
                                    size={16}
                                    className="text-[#8A8A8A]"
                                  />
                                )}

                                <span>
                                  {concept.title}
                                </span>
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div
              className="
                rounded-2xl
                border border-[#1A1A1C]
                bg-[#111113]
                p-5
              "
            >
              {/* Concept Title */}
              <h2 className="text-xl font-semibold text-white">
                {selectedConcept}
              </h2>

              {/* Theory */}
              <section className="mt-6">
                <h3 className="text-sm font-medium text-white">
                  Theory
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#8A8A8A]">
                  The Event Loop is a fundamental
                  concept in Node.js. It enables
                  asynchronous execution by managing
                  callback queues and ensuring that
                  long-running operations do not block
                  the main execution thread.
                </p>
              </section>

              {/* Examples */}
              <section className="mt-8">
                <h3 className="text-sm font-medium text-white">
                  Examples
                </h3>

                <div
                  className="
                    mt-3
                    overflow-x-auto
                    rounded-xl
                    border border-[#1A1A1C]
                    bg-[#0D0D0F]
                    p-4
                  "
                >
                  <pre className="text-sm text-[#D1D1D1]">
{`console.log("Start");

setTimeout(() => {
  console.log("Async");
}, 0);

console.log("End");`}
                  </pre>
                </div>
              </section>

              {/* Key Points */}
              <section className="mt-8">
                <h3 className="text-sm font-medium text-white">
                  Key Points
                </h3>

                <ul className="mt-3 space-y-2 text-sm text-[#8A8A8A]">
                  <li>• Enables non-blocking I/O</li>
                  <li>• Uses callback queues</li>
                  <li>• Central to Node.js performance</li>
                  <li>• Executes tasks asynchronously</li>
                </ul>
              </section>

              {/* Ask AI */}
              <section className="mt-8">
                <h3 className="text-sm font-medium text-white">
                  Ask AI
                </h3>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    value={question}
                    onChange={(e) =>
                      setQuestion(e.target.value)
                    }
                    placeholder="Ask anything about this concept..."
                    className="
                      h-10
                      flex-1
                      rounded-xl
                      border border-[#1A1A1C]
                      bg-[#0D0D0F]
                      px-4
                      text-sm
                      outline-none
                      placeholder:text-[#303030]
                      focus:border-[rgba(220,38,38,0.30)]
                    "
                  />

                  <button
                    onClick={askAI}
                    className="
                      flex items-center justify-center gap-2
                      rounded-xl
                      border border-[rgba(220,38,38,0.20)]
                      bg-[rgba(220,38,38,0.10)]
                      px-5 py-2.5
                      text-sm
                      transition-all
                      hover:border-[rgba(220,38,38,0.30)]
                      hover:bg-[rgba(220,38,38,0.14)]
                    "
                  >
                    <Send size={15} />
                    Ask
                  </button>
                </div>

                {answer && (
                  <div
                    className="
                      mt-4
                      rounded-xl
                      border border-[#1A1A1C]
                      bg-[#0D0D0F]
                      p-4
                    "
                  >
                    <p className="text-sm text-[#D1D1D1]">
                      {answer}
                    </p>
                  </div>
                )}
              </section>

              {/* Complete */}
              <div className="mt-8 flex justify-end">
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
                >
                  Mark Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}