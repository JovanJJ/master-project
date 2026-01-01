import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import WorkerSettings  from "./worker/WorkerSettings"; 
import { redirect } from "next/navigation"; 
import UserSettings from "./user/UserSettings";



export default async function Settings() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("login/user");
  }
  
  if (session?.user?.role === "user") {
    return <UserSettings />;
  }

  if (session?.user?.role === "worker") {
    return <WorkerSettings />;
  }
  
}