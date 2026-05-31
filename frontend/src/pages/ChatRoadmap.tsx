import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGenerateRoadmapMutation, useGenerateSubtopicsMutation } from "../redux/features/aiApi";
import { useCreateRoadmapMutation } from "../redux/features/roadmapApi";
import { Bot, User } from "lucide-react";

type Message = {
  sender:'ai' | 'user',
  text?:string,
  type?:'normal' | 'difficulty' | 'subtopic' | 'roadmap' | 'loading',
  data?:any;
}

type ChatStep = 'topic' | 'difficulty' | 'subtopic' | 'roadmap' | 'completed'

export default function ChatRoadmap() {
  const [message, setMessage] = useState("");

 const [messages, setMessages] = useState<Message[]>([
    {
      sender:"ai",
      text:"👋 Hi there! I'm your AI Mentor."
    },
    {
      sender:"ai",
      text:"What topic would you like to learn today?"
    }
  ]);

  const handleKeyDown = (
    e:React.KeyboardEvent<HTMLInputElement>
  )=>{
    if(e.key==="Enter"){
      handleSend();
    }
  }

  const [step,setStep] = useState<ChatStep>("topic");
  const [topic,setTopic] = useState("");
  const [difficulty,setDifficulty] = useState("");
  const [subtopics,setSubtopics] = useState<string[]>([]);
  const [newSubtopic,setNewSubtopic] = useState("");
  const [roadmap,setRoadmap] = useState<any>(null);

  const [generateSubtopics] = useGenerateSubtopicsMutation();
  const [generateRoadmap] = useGenerateRoadmapMutation();
  const [createRoadmap] = useCreateRoadmapMutation();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);



  const toggleSubtopic = (subtopic:string)=>{
    setSubtopics((prev)=>prev.filter(item =>item !== subtopic))
  }

  const addSubtopic = ()=>{
    if(!newSubtopic.trim()) return;
    if(subtopics.some(item => item.toLowerCase() === newSubtopic.toLowerCase())) return;
    setSubtopics(prev => [...prev,newSubtopic.trim()]);
    setNewSubtopic("");
  }

  const handleSubtopicConfirm = async ()=>{
    setMessages(prev => [
        ...prev,
        {
          sender:"user",
          text:"Confirm Selection"
        }
      ]);
    try {
      setMessages(prev=>[...prev,{sender:"ai",type:"loading"}]); //loading start
      const response = await generateRoadmap({topic,difficulty,subtopics}).unwrap();
      setMessages(prev => prev.filter(msg => msg.type !== "loading")); //loading end
      setRoadmap(response);
      setMessages((prev)=>[...prev,
        {sender:'ai',text:"Here's your roadmap preview. Review it and confirm if you'd like to save it."},
      {sender:'ai',type:'roadmap',data:response},
      ])
      setStep('roadmap');
    } catch (error) {
      console.log(error);
    }
  }

  const handleDifficultySelect =async (difficulty:string)=>{
    setDifficulty(difficulty);
    setMessages((prev)=>[...prev,{sender:'user',text:difficulty}]);
    try {
      setMessages(prev=>[...prev,{sender:"ai",type:"loading"}]); //loading start
      const response = await generateSubtopics({topic:topic,difficulty:difficulty}).unwrap();
      setMessages(prev => prev.filter(msg => msg.type !== "loading")); //loading end
      setSubtopics(response.subtopics);
      setMessages((prev)=>[...prev,
        {
          sender:'ai',
          text:"I've generated some subtopics, feel free to customize them before confirming."
        },
        {
          sender:'ai',
          type:'subtopic',
          data:response.subtopics
        }
      ])
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  setStep('subtopic');
  }

  const handleRoadmapConfirm =async ()=>{
    setMessages(prev => [
      ...prev,
      {
        sender:"user",
        text:"Confirm Roadmap"
      }
    ]);
    try {
      setMessages(prev=>[...prev,{sender:"ai",type:"loading"}]); //loading start
      await createRoadmap({topic,difficulty,...roadmap}).unwrap();
      setMessages(prev => prev.filter(msg => msg.type !== "loading")); //loading end
      setMessages((prev)=>[...prev,
      {
        sender:'ai',
        text:"Your roadmap has been saved successfully. You can access it from your Dashboard. While learning concepts, use the Ask AI feature in the Learning section to get instant explanations, clarifications, and answers to your questions."
      }
      ])

      setStep('completed');
      setRoadmap(null);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSend = async ()=>{
    if(!message.trim()) return;
    setMessages((prev)=>[
      ...prev,{
        sender:"user",
        text:message
      }
    ])

    if(step === 'topic'){
      setTopic(message);
      setMessages((prev)=>[...prev,
        {sender:"ai",text:'What difficulty level would you prefer?'},
        {sender:"ai",type:"difficulty"}
      ])
      setStep("difficulty");
      setMessage("");
      return;
    }
  }

  return (
    <div className="bg-[#0A0A0B] text-[#D1D1D1] pt-2 px-4 pb-4 sm:pt-3 sm:px-6 sm:pb-6">
      
      <div className="mx-auto flex max-w-[1200px] flex-col">

        {/* Compact Header */}
        <div className="mb-3">
          <h1 className="text-lg font-semibold text-white sm:text-xl">
            AI Roadmap Assistant
          </h1>

          <p className="mt-1 text-sm text-[#8A8A8A]">
            Create learning roadmaps through conversation.
          </p>
        </div>

        {/* Chat Box */}
        <div
        className="
            h-[76vh]
            sm:h-[78vh]
            md:h-[80vh]
            overflow-hidden
            rounded-2xl
            border border-[#1A1A1C]
            bg-[#111113]
        "
        >
          <div className="flex h-full flex-col">

            {/* Messages */}
            <div
              className="
                flex-1
                overflow-y-auto
                p-3
                sm:p-4

                [scrollbar-width:none]
                [-ms-overflow-style:none]
              "
            >
              <style>
                {`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>

              <div className="space-y-5">
                {
                  messages.map((msg,index)=>(
                    <div key={index}>
                      {msg.type === "loading" ? (
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex h-8 w-8 items-center justify-center
                              rounded-full bg-[rgba(220,38,38,0.10)]
                              border border-[rgba(220,38,38,0.20)]
                            "
                          >
                            🤖
                          </div>
                          <div
                            className="
                              rounded-2xl
                              border border-[#1A1A1C]
                              bg-[#0D0D0F]
                              px-4 py-3
                            "
                          >
                            ...
                          </div>

                        </div>

                        ) 
                      : msg.type === "difficulty" ? (
                        <div className="flex">
                          <div
                            className="
                              w-full
                              max-w-[500px]
                              rounded-2xl
                              border border-[#1A1A1C]
                              bg-[#0D0D0F]
                              p-4
                            "
                          >
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() =>
                                  handleDifficultySelect("Beginner")
                                }
                                className="
                                  rounded-xl
                                  border border-[rgba(220,38,38,0.20)]
                                  bg-[rgba(220,38,38,0.10)]
                                  px-4 py-2
                                  text-sm
                                  hover:bg-[rgba(220,38,38,0.15)]
                                  transition-all
                                "
                              >
                                Beginner
                              </button>

                              <button
                                onClick={() =>
                                  handleDifficultySelect("Intermediate")
                                }
                                className="
                                  rounded-xl
                                  border border-[rgba(220,38,38,0.20)]
                                  bg-[rgba(220,38,38,0.10)]
                                  px-4 py-2
                                  text-sm
                                  hover:bg-[rgba(220,38,38,0.15)]
                                  transition-all
                                "
                              >
                                Intermediate
                              </button>

                              <button
                                onClick={() =>
                                  handleDifficultySelect("Advanced")
                                }
                                className="
                                  rounded-xl
                                  border border-[rgba(220,38,38,0.20)]
                                  bg-[rgba(220,38,38,0.10)]
                                  px-4 py-2
                                  text-sm
                                  hover:bg-[rgba(220,38,38,0.15)]
                                  transition-all
                                "
                              >
                                Advanced
                              </button>

                            </div>
                          </div>
                        </div>

                      ): msg.type === "subtopic" ? (
                        <div className="flex">
                          <div
                            className="
                              w-full max-w-full sm:max-w-[850px]
                              rounded-2xl
                              border border-[#1A1A1C]
                              bg-[#0D0D0F]
                              p-4
                            "
                          >
                            <p className="mb-4 text-sm">
                              Customize your subtopics before confirming
                            </p>

                            <div className="space-y-2">

                              {subtopics.map((subtopic) => (
                                <label
                                  key={subtopic}
                                  className="
                                    flex items-center gap-3
                                    rounded-xl
                                    border border-[#1A1A1C]
                                    bg-[#111113]
                                    px-3 py-2
                                  "
                                >
                                  <input
                                    type="checkbox"
                                    checked={subtopics.includes(subtopic)}
                                    onChange={() =>
                                      toggleSubtopic(subtopic)
                                    }
                                    className="accent-red-600"
                                  />

                                  <span>{subtopic}</span>
                                </label>
                              ))}

                            </div>

                            <div className="mt-4 flex gap-2">
                              <input
                                value={newSubtopic}
                                onChange={(e) =>
                                  setNewSubtopic(e.target.value)
                                }
                                placeholder="Add subtopic..."
                                className="
                                  flex-1
                                  rounded-xl
                                  border border-[#1A1A1C]
                                  bg-[#111113]
                                  px-3 py-2
                                  text-sm
                                  outline-none
                                "
                              />

                              <button
                                onClick={addSubtopic}
                                className="
                                  rounded-xl
                                  border border-[rgba(220,38,38,0.20)]
                                  bg-[rgba(220,38,38,0.10)]
                                  px-4 py-2
                                  text-sm
                                "
                              >
                                Add
                              </button>
                            </div>

                            <button
                              onClick={handleSubtopicConfirm}
                              className="
                                mt-4
                                rounded-xl
                                border border-[rgba(220,38,38,0.20)]
                                bg-[rgba(220,38,38,0.10)]
                                px-4 py-2
                                text-sm
                              "
                            >
                              Confirm Selection
                            </button>

                          </div>
                        </div>

                      ) :msg.type === "roadmap" ? (

                        <div className="flex">

                          <div
                            className="
                              w-full
                              max-w-full
                              sm:max-w-[850px]
                              rounded-2xl
                              border border-[#1A1A1C]
                              bg-[#0D0D0F]
                              p-4
                              sm:p-5
                            "
                          >

                            <div className="mb-4">
                              <h3 className="text-base font-semibold text-white">
                                Roadmap Preview
                              </h3>

                              <p className="mt-1 text-xs text-[#8A8A8A]">
                                Review your roadmap before saving.
                              </p>
                            </div>

                            <div
                              className="
                                max-h-[400px]
                                overflow-y-auto
                                space-y-3
                                pr-1
                              "
                            >

                              {roadmap?.roadmap?.map(
                                (item:any,index:number)=>(
                                  <div
                                    key={index}
                                    className="
                                      rounded-xl
                                      border border-[#1A1A1C]
                                      bg-[#111113]
                                      p-3
                                    "
                                  >

                                    <div
                                      className="
                                        flex items-center gap-3
                                      "
                                    >

                                      <div
                                        className="
                                          flex h-7 w-7
                                          items-center justify-center
                                          rounded-full
                                          bg-[rgba(220,38,38,0.10)]
                                          border border-[rgba(220,38,38,0.20)]
                                          text-xs
                                        "
                                      >
                                        {index + 1}
                                      </div>

                                      <h4
                                        className="
                                          text-sm
                                          font-medium
                                          text-white
                                        "
                                      >
                                        {item.subtopic}
                                      </h4>

                                    </div>

                                    {item.concepts?.length > 0 && (

                                      <div
                                        className="
                                          mt-3
                                          flex flex-wrap
                                          gap-2
                                        "
                                      >

                                        {item.concepts.map(
                                          (
                                            concept:{
                                              title:string;
                                              completed:boolean;
                                            },
                                            conceptIndex:number
                                          )=>(
                                            <span
                                              key={conceptIndex}
                                              className="
                                                rounded-lg
                                                border border-[#1A1A1C]
                                                bg-[#0D0D0F]
                                                px-2 py-1
                                                text-xs
                                                text-[#D1D1D1]
                                              "
                                            >
                                              {concept.title}
                                            </span>
                                          )
                                        )}

                                      </div>

                                    )}

                                  </div>
                                )
                              )}

                            </div>

                            <button
                              onClick={handleRoadmapConfirm}
                              className="
                                mt-4
                                rounded-xl
                                border border-[rgba(220,38,38,0.20)]
                                bg-[rgba(220,38,38,0.10)]
                                px-4 py-2
                                text-sm
                                transition-all
                                hover:bg-[rgba(220,38,38,0.15)]
                              "
                            >
                              Confirm Roadmap
                            </button>

                          </div>

                        </div>

                        ): msg.sender === "ai" ? (

                        <div className="flex items-end gap-2">
                          <div
                            className="
                              flex h-8 w-8 shrink-0
                              items-center justify-center
                              rounded-full
                              border border-[rgba(220,38,38,0.20)]
                              bg-[rgba(220,38,38,0.10)]
                              self-end
                            "
                          >
                            <Bot size={16} />
                          </div>

                          <div
                            className="
                              max-w-[85%]
                              rounded-2xl
                              border border-[#1A1A1C]
                              bg-[#0D0D0F]
                              px-4 py-3
                              text-sm
                              sm:max-w-[85%]
                            "
                          >
                            {msg.text}
                          </div>

                        </div>

                      ) : (

                        <div className="flex justify-end items-end gap-2">
                        <div
                          className="
                            max-w-[85%]
                            rounded-2xl
                            border border-[#1A1A1C]
                            bg-[#0D0D0F]
                            px-4 py-3
                            text-sm
                            sm:max-w-[85%]
                          "
                        >
                          {msg.text}
                        </div>

                        <div
                          className="
                            flex h-8 w-8 shrink-0
                            items-center justify-center
                            rounded-full
                            border border-[rgba(220,38,38,0.20)]
                            bg-[rgba(220,38,38,0.10)]
                            self-end
                          "
                        >
                          <User size={16} />
                        </div>

                      </div>

                      )}

                    </div>
                  ))
                }
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input INSIDE Chat Box */}
            <div
              className="
                border-t
                border-[#1A1A1C]
                p-2.5
                sm:p-3
              "
            >
              <div className="flex gap-3">
                <input
                  value={message}
                  onKeyDown={handleKeyDown}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Type your message..."
                  className="
                    h-[44px]
                    flex-1
                    rounded-xl
                    border border-[#1A1A1C]
                    bg-[#0D0D0F]
                    px-4
                    text-sm
                    outline-none
                    placeholder:text-[#404040]
                    focus:border-[rgba(220,38,38,0.30)]
                  "
                />

                <button
                  className="
                    flex
                    h-[44px]
                    w-[44px]
                    items-center
                    justify-center
                    rounded-xl
                    border border-[rgba(220,38,38,0.20)]
                    bg-[rgba(220,38,38,0.10)]
                    transition-all
                    hover:border-[rgba(220,38,38,0.30)]
                    hover:bg-[rgba(220,38,38,0.14)]
                  "
                  onClick={handleSend}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}