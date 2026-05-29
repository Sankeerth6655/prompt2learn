import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({

        login:builder.mutation({
            query:(data)=>({
                url:'/auth/login',
                method:'POST',
                body:data
            }),
        }),

        register:builder.mutation({
            query:(data)=>({
                url:'auth/register',
                method:"POST",
                body:data
            })
        }),

        getCurrentUser:builder.query<{message:string,user:{userId:string,name:string,email:string}},void>({
            query:()=>({
                url:'/auth/me',
                method:"GET",
            })
        }),

    })
})

export const {useLoginMutation,useRegisterMutation,useGetCurrentUserQuery} = authApi;