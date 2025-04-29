import LoginForm from "@/components/auth/LoginForm";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import Message from "@/components/chat/Message";
import Sidebar from "@/components/Layout/Sidebar";

export default function Home() {
  return (
    <LoginForm />
    // <div className="bg-[#f4f7ff] p-4  m-5 h-[calc(100dvh-2rem)] rounded-4xl overflow-hidden shadow-lg flex gap-10">
    //   <Sidebar />
    //   <div className="w-full  flex flex-col justify-between ">
    //     <ChatHeader />
    //     <div className="h-[100dvh] flex flex-col overflow-y-auto justify-end">
    //       <Message
    //         message="Hey! How are you doing?"
    //         sender="John Doe"
    //         avatarUrl="https://i.pravatar.cc/150?img=5"
    //         timestamp="2:35 PM"
    //         isCurrentUser={false}
    //       />
    //       <Message
    //         message="Hey! How are you doing?"
    //         sender="John Doe"
    //         avatarUrl="https://i.pravatar.cc/150?img=5"
    //         timestamp="2:35 PM"
    //         isCurrentUser={true}
    //       />
    //     </div>
    //     <ChatInput />
    //   </div>
    // </div>
  );
}
