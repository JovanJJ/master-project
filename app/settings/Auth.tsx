"use client"
import { useState } from "react"
import backArrow from "../../public/back-arrow.png";
import Image from "next/image";
import { changePassword } from "@/lib/actions/worker";
import React from "react";
import { signOut } from "next-auth/react";

export default function Auth({ session, status, profileData }) {
    const [passwordChange, setPasswordChange] = useState(false);
    const initialState = { success: false, message: "" };
    const [state, formAction] = React.useActionState(changePassword, initialState);

    if (state.success) {
        return (
            <div className="space-y-4">
                <p className="text-green-600">{state.message}</p>

                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="px-4 py-2 bg-blue-400 rounded-2xl text-white cursor-pointer"
                >
                    Ulogujte se ponovo
                </button>
            </div>
        );
    }



    return (
        <form action={formAction}>
            
            {   status === "loading" ? (
                    <div>Loading...</div>

                ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center pb-4 gap-2">
                        <label className="w-24 font-medium">e-mail</label>
                        <input
                            placeholder={session.user.email}
                            className="w-full sm:max-w-36 border border-blue-300 rounded p-2 focus:outline-none focus:border-blue-600 transition"
                            readOnly
                        />
                        <span className="text-[13px] cursor-pointer underline">
                            izmeni
                        </span>
                    </div>
                )
            }


            {!passwordChange ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="w-24 font-medium">password</label>
                    <input
                        placeholder={"*********"}
                        className="w-full sm:max-w-36 border border-blue-300 rounded p-2 focus:outline-none focus:border-blue-600 transition"
                        readOnly
                    />
                    <span onClick={() => setPasswordChange(true)} className="text-[13px] cursor-pointer underline">
                        izmeni
                    </span>
                </div>
            ) :
                (
                    <div className="flex flex-col pt-7 border-t border-blue-200 gap-2">
                        <div className="flex items-center gap-4">
                            <label className="w-35 font-medium">Trenutna lozinka</label>
                            <input
                                name="currentPassword"
                                type="password"
                                className="w-full sm:max-w-36 border border-blue-300 rounded p-2 focus:outline-none focus:border-blue-600 transition"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-35 font-medium">Nova lozinka</label>
                            <input
                                name="newPassword"
                                type="password"
                                className="w-full sm:max-w-36 border border-blue-300 rounded p-2 focus:outline-none focus:border-blue-600 transition"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-35 font-medium">Potvdi novu lozinku</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                className="w-full sm:max-w-36 border border-blue-300 rounded p-2 focus:outline-none focus:border-blue-600 transition"
                            />
                        </div>
                        <div className="flex items-center pt-2">
                            <div className="w-24 cursor-pointer">
                                <Image onClick={() => setPasswordChange(false)} src={backArrow} alt="back" className="w-7 h-7"></Image>
                            </div>
                            <div className="w-full sm:max-w-[205px] flex justify-end ">
                                <button type="submit" className="px-3 py-1 rounded-3xl text-white bg-blue-400 cursor-pointer">Izmeni</button>
                            </div>
                        </div>
                    </div>
                )}
            {state?.message && (
                <div className={`mt-4 p-3 rounded ${!state.success && 'bg-red-100 text-red-700'}`}>
                    {state.message}
                </div>
            )}
        </form>
    );
}