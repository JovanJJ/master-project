import WorkerAccount from "./worker/WorkerAccount";
import UserAccount from "./user/UserAccount";
import { getServerSession } from 'next-auth';
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    const role = session?.user.role;
    if (!session) redirect('/');
    return (
        <>
            {role === "worker" && <WorkerAccount />}
            {role === "user" && <UserAccount />}
        </>
    );
}