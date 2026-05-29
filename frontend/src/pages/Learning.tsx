import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Send,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetRoadmapByIdQuery, useUpdateRoadmapMutation } from "../redux/features/roadmapApi";
import { useAiAskMutation, useGenerateContentMutation } from "../redux/features/aiApi";




export default function Learning() {
  const [expanded, setExpanded] = useState<number[]>([0]);


  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(""); 

  const {roadmapId} = useParams();

  const [selectedConcept,setSelectedConcept] = useState("");
  const [selectedSubtopic,setSelectedSubtopic] = useState("");

  const [updateRoadmap] = useUpdateRoadmapMutation();

  const [aiAsk,{isLoading:askAiLoading}] = useAiAskMutation();
  
  const {data,refetch} = useGetRoadmapByIdQuery(roadmapId);
  const roadmap = data?.roadmap;

  const [generateContent,{isLoading:generateContentLoading}] = useGenerateContentMutation();
  const [content,setContent] = useState<{
        title:string,
        theory:string,
        examples:{
            title:string,
            code:string,
            explanation:string,
        }[],
        keypoints:string[],
        references:{
            title:string,
            url:string,
        }
    }>();

  const handleSelectedConcept = async (data:{topic:string,difficulty:string,subtopic:string,concept:string})=>{
    try {
      let response = await generateContent(data).unwrap();
      setContent(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleMarkComplete = async ()=>{
    try {
      await updateRoadmap({roadmapId:roadmapId!,data:{subtopic:selectedSubtopic,concept:selectedConcept}}).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  const askAI = async ()=>{ //topic subtopic concept difficulty question
    try {
      let response = await aiAsk({topic:data?.topic,subtopic:selectedSubtopic,difficulty:data?.difficulty,concept:selectedConcept,question:question}).unwrap();
      setAnswer(response.answer);
    } catch (error) {
      console.log(error);
    }
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
            {data?.topic}
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

              {roadmap?.map(
                (subtopic:any, subtopicIndex:number) => {
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
                            (concept:{title:string,completed:boolean}) => (
                              <button
                                key={concept.title}
                                onClick={() =>{
                                  setSelectedConcept(concept.title);
                                  setSelectedSubtopic(subtopic.subtopic);
                                  setContent(undefined);
                                  handleSelectedConcept({topic:data?.topic,difficulty:data.difficulty,subtopic:subtopic.subtopic,concept:concept.title});
                                }
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
                                <div className="flex h-4 w-4 items-center justify-center shrink-0">
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
                                </div>

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
          <div className="flex-1 min-w-0">
            <div
              className="
                rounded-2xl
                border border-[#1A1A1C]
                bg-[#111113]
                p-5
                min-h-[650px]
              "
            >
            {
              !content && !generateContentLoading ? (

                <div
                  className="
                    flex
                    min-h-[550px]
                    items-center
                    justify-center
                  "
                >
                  <div className="text-center">
                    <h2 className="text-lg font-medium text-white">
                      Select a Concept
                    </h2>

                    <p className="mt-2 text-sm text-[#8A8A8A]">
                      Choose a concept from the roadmap
                      to generate learning content.
                    </p>
                  </div>
                </div>

              ) : generateContentLoading ? (

                <div
                  className="
                    flex
                    min-h-[550px]
                    items-center
                    justify-center
                  "
                >
                  <p
                    className="
                      text-lg
                      text-[#8A8A8A]
                    "
                  >
                    Generating concept...
                  </p>
                </div>
              ):(
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
                {content?.title}
              </h2>

              {/* Theory */}
              <section className="mt-6">
                <h3 className="text-sm font-medium text-white">
                  Theory
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-[#8A8A8A]
                    whitespace-pre-wrap
                    break-words
                    overflow-hidden
                  "
                >
                  {content?.theory}
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
                  <section className="mt-8">
                    <h3 className="text-sm font-medium text-white">
                      Examples
                    </h3>

                    <div className="mt-4 space-y-5">
                      {content?.examples?.map((example, index) => (
                        <div
                          key={index}
                          className="
                            rounded-xl
                            border border-[#1A1A1C]
                            bg-[#0D0D0F]
                            p-4
                          "
                        >
                          <h4
                            className="
                              text-sm
                              font-medium
                              text-white
                            "
                          >
                            {example.title}
                          </h4>

                          <div
                            className="
                              mt-3
                              overflow-x-auto
                              rounded-lg
                              border border-[#1A1A1C]
                              bg-[#090909]
                              p-4
                            "
                          >
                            <pre
                              className="
                                whitespace-pre-wrap
                                break-words
                                text-sm
                                text-[#D1D1D1]
                              "
                            >
                              <code>{example.code}</code>
                            </pre>
                          </div>

                          <p
                            className="
                              mt-3
                              text-sm
                              leading-6
                              text-[#8A8A8A]
                              break-words
                            "
                          >
                            {example.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </section>

              {/* Key Points */}
              <section className="mt-8">
                <h3 className="text-sm font-medium text-white">
                  Key Points
                </h3>

                <ul className="mt-3 space-y-2 text-sm text-[#8A8A8A]">
                  {
                    content?.keypoints?.map(
                      (keypoint, index) => (
                        <li key={index}>
                          • {keypoint}
                        </li>
                      )
                    )
                  }
                </ul>
              </section>

              {/* Ask AI */}
              <section className="mt-8">
                <h3 className="text-sm font-medium text-white">
                  Ask AI
                </h3>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    value={question}
                    onChange={(e) =>
                      setQuestion(e.target.value)
                    }
                    placeholder="Ask anything about this concept..."
                    className="
                      min-h-[48px]
                      w-full
                      flex-1
                      rounded-xl
                      border border-[#1A1A1C]
                      bg-[#0D0D0F]
                      px-4
                      text-sm
                      text-[#D1D1D1]
                      outline-none
                      placeholder:text-[#303030]
                      transition-all
                      focus:border-[rgba(220,38,38,0.30)]
                    "
                  />

                  <button
                    onClick={askAI}
                    className="
                      self-start
                      inline-flex min-h-[48px] w-fit items-center justify-center gap-2
                      rounded-xl
                      border border-[rgba(220,38,38,0.20)]
                      bg-[rgba(220,38,38,0.10)]
                      px-5
                      text-sm
                      transition-all
                      hover:border-[rgba(220,38,38,0.30)]
                      hover:bg-[rgba(220,38,38,0.14)]
                      sm:w-auto
                    "
                  >
                    <Send size={15} />
                    Ask
                  </button>
                </div>

                {askAiLoading && !answer ? (
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
                      Loading...
                    </p>
                  </div>
                ):(
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
                    w-fit self-start sm:self-auto
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
                  onClick={handleMarkComplete}
                >
                  Mark Complete
                </button>
              </div>
            </div>
              )
            }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}