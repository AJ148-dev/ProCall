"use client"

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import { Loader2Icon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";

export default function HomePage() {
   const router = useRouter();
   const { isInterviewer, isLoading } = useUserRole();
   const interviews = useQuery(api.interviews.getMyInterviews);

   const [showModal,setShowModal] = useState(false);
   const [modalType, setModalType] = useState<"start" | "join">()

   const handleQuickAction = (title: string)=>{
      switch(title){
        case "New Call" :
          setModalType("start")
          setShowModal(true)
          break;
        case "Join Interview" :
          setModalType("join")
          setShowModal(true)
          break;
        default:
          router.push(`/${title.toLowerCase()}`);
      }
   }

   if(isLoading) return <LoaderUI/>

  return (
    <div className="container max-w-7xl mx-auto p-6">
     <div className="rounded-xl bg-card p-6 border shadow-md mb-10">
      <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
        Welcome back!
      </h1>
      <p className="text-muted-foreground mt-2">
        {isInterviewer
          ? "Effortlessly manage your interviews, monitor candidate progress, and stay organized."
          : "Join your upcoming interviews, stay prepared, and put your best foot forward."}
      </p>
     </div>

     {isInterviewer?(
      <>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_ACTIONS.map((action)=>(
            <ActionCard
              key={action.title}
              action = {action}
              onClick = {()=>handleQuickAction(action.title)}
            />
          ))}
        </div>

        <MeetingModal
          isOpen={showModal}
          onClose={()=>setShowModal(false)}
          title={modalType==="join"?"Join Meeting": "Start Meeting"}
          isJoinMeeting={modalType=="join"}
        />
      </>
     ):(
      <>
        <div>
          <h1 className="text-3xl font-bold">Your Interviews</h1>
          <p className="text-muted-foreground mt-1">View and join your scheduled interviews</p>
        </div>

        <div className="mt-8">
          {interviews===undefined?(
            <div className="flex justify-center py-12">
              <Loader2Icon className="size-8 animate-spin text-muted-foreground"/>
            </div>
          ):interviews.length>0?(
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {interviews.map((interview)=>(
                <MeetingCard key={interview._id} interview={interview}/>
              ))}
            </div>
          ):(
            <div className="text-center py-12 text-muted-foreground">
              You have no scheduled interviews 
            </div>
          )}

        </div>
      
      </>
     )}

      
    </div>
  );
}
