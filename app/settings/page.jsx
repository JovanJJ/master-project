import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth-config";
import WorkerSettings  from "./worker/WorkerSettings"; 
import { redirect } from "next/navigation"; 
import UserSettings from "./user/UserSettings";



export default async function Settings() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("login/user");
  }
 

  return (
    <section className="w-full h-full py-10 md:py-17">
      {session?.user?.role === "user" && <UserSettings />}
      {session?.user?.role === "worker" && <WorkerSettings />}
    </section>
  );
  
}