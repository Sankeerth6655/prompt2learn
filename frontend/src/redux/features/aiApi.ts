import { baseApi } from "./baseApi";

type createSubtopicsRequest = {
    topic:string,
    difficulty:string
}
type createSubtopicsResponse = {
    subtopics:string[]
}


export const aiApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({

        generateSubtopics:builder.mutation<createSubtopicsResponse,createSubtopicsRequest>({
            query:(data)=>({
                url:'/ai/generateTopic',
                method:'POST',
                body:data
            })
        }),

        generateRoadmap:builder.mutation({
            query:(data)=>({
                url:'/ai/generateRoadmap',
                method:'POST',
                body:data
            })
        }),

        generateContent:builder.mutation({
            query:(data)=>({
                url:'/ai/generateContent',
                method:'POST',
                body:data
            })
        }),

        aiAsk:builder.mutation({
            query:(data)=>({
                url:'/ai/ask',
                method:'POST',
                body:data
            })
        }),
    })
})

export const {useGenerateSubtopicsMutation,useGenerateRoadmapMutation,useGenerateContentMutation,useAiAskMutation} = aiApi;