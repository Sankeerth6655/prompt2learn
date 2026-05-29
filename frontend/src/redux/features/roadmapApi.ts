import { baseApi } from "./baseApi";

type getRoadmapsResponse  = {
        id:string,
        topic: string,
        difficulty: string,
        progress: number,
        status: string
    }

type updateRoadmapRequest = {
    roadmapId:string,
    data:{
        subtopic:string,
        concept:string
    }
}


export const roadmapApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({

        getRoadmaps:builder.query<getRoadmapsResponse[],void>({
            query:()=>({
                url:'/roadmap',
                method:"GET"
            })
        }),

        createRoadmap:builder.mutation({
            query:(data)=>({
                url:'/roadmap',
                method:"POST",
                body:data
            })
        }),
        
        getRoadmapById:builder.query({
            query:(roadmapId)=>({
                url:`/roadmap/${roadmapId}`,
                method:'GET'
            })
        }),

        updateRoadmap:builder.mutation<any,updateRoadmapRequest>({
            query:({roadmapId,data})=>({
                url:`/roadmap/${roadmapId}`,
                method:'PATCH',
                body:data
            })
        })
    })
})
export const {useGetRoadmapsQuery,useCreateRoadmapMutation,useGetRoadmapByIdQuery,useUpdateRoadmapMutation} = roadmapApi;