"use client"

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordReset() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(true);
    const searchParams = useSearchParams();

    const token = searchParams.get('token');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("newPassword", newPassword);
        formData.append("confirmedPassword", confirmPassword);
        formData.append("token", token);

        const res = await fetch('/api/change-password', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                newPassword,
                confirmPassword,
                token,
            })
        });

        const message = await res.json();
        setMessage(message.message);
        setSuccess(message.success);

        if (message.success) {
            setTimeout(() => {
                router.push('/login/worker')
            }, 1500);
        }

    }
   
    return(
        <section className="w-full h-screen" >
            <div className="flex items-center flex-col justify-center w-full h-screen">
                <h1 className="mx-auto w-fit text-3xl pb-6 ">Resetovanje lozinke</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-64">
                    <div className="flex flex-col">
                        <label className="pb-2">Unesite novu lozinku</label>
                        <input type="password" onChange={(e) => {setNewPassword(e.target.value)}} className="px-2 py-2 border border-blue-400 rounded-xl outline-blue-500 flex-1" />
                    </div>

                    <div className="flex flex-col">
                        <label className="pb-2">Potvrdite novu lozinku</label>
                        <input type="password" onChange={(e) => {setConfirmPassword(e.target.value)}} className="px-2 py-2 border border-blue-400 rounded-xl outline-blue-500 flex-1" />
                    </div>

                    <div>
                        <button type="submit" className="px-2 py-1 bg-blue-400 text-white rounded-xl cursor-pointer active:bg-blue-300">Izmeni</button>
                    </div>

                    <span className={` ${
                        !success ? 'text-red-400' : 'text-green-400'}`}>{message}</span>
                </form>
            </div>
        </section>
    );
}

