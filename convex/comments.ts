import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addComment = mutation({
    args:{
        content: v.string(),
        rating: v.number(),
        interviewId: v.id("interviews"),
    },
    handler: async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
         if(!identity)
            return new Error("Unauthorized");
         return await ctx.db.insert("comments",{
            ...args,
            interviewerId: identity.subject,
        })
    }
})

export const getComments = query({
    args:{
        interviewId: v.id("interviews"),
    },
    handler: async(ctx,{interviewId})=>{
        const identity = await ctx.auth.getUserIdentity();
         if(!identity)
            return new Error("Unauthorized");
        const comments = await ctx.db.query("comments")
                                     .withIndex("by_interview_id",(q)=>q.eq("interviewId",interviewId))
                                     .collect();
        return comments;
    }
})