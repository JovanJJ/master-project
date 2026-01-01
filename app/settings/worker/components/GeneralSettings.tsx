"use client";

import { useState, useEffect } from "react";
import { changeMultipleFields } from "@/lib/actions/worker";
import React from "react"

export default  function  GeneralSettings({ session, status, profileData, reloadProfile }) {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [clickDescription, setClickDescription] = useState(null);
    const [state, formAction] = React.useActionState(changeMultipleFields, {  success: false });
    console.log(session.user.role);
    useEffect(() => {
        if (state) {
            reloadProfile();
        }
    }, [state.success]);

    console.log(state)

    if (status === "loading" || !profileData) return null;
    

    const current = [
        ["Ime", "firstName", profileData.firstName],
        ["Prezime", "lastName", profileData.lastName],
        ["Profesija", "profession", profileData.profession],
        ["Lokacija", "location", profileData.location],
        ["Telefon", "phone", profileData.phone],
    ];
    
  
    

    return (
        <form action={formAction}>
            {current.map(([label, field, value]) => (
                <div key={field} className="flex gap-4 space-y-4 items-center">
                    <div className="w-24 font-medium">{label}</div>

                    {editingField === field ? (
                        <input
                            defaultValue={value}
                            className="w-full sm:max-w-36 border outline-none border-blue-400 rounded p-2"
                            name={field}
                        />
                    ) : (
                        <div className="w-full sm:max-w-36 underline">
                            {value}
                        </div>
                    )}

                    <button
                        className="text-sm underline cursor-pointer"
                        onClick={() => setEditingField(editingField === field ? null : field)}
                        type="button"
                    >
                        {editingField === field ? "poništi" : "izmeni"}
                    </button>
                </div>

            ))}
            <div className="flex flex-col pt-4">
                <span>Opis:</span>
                <textarea
                    onFocus={() => setClickDescription(true)}
                    
                    defaultValue={profileData.description && profileData.description}
                    placeholder={!profileData.description ? "Dodaj opis profila i pokaži šta te izdvaja! Ispričaj ukratko svoje iskustvo, veštine i ono u čemu si najbolji u svom zanatu. Dobar opis pomaže da te klijenti lakše pronađu, steknu poverenje i izaberu baš tebe.": ""}
                    className="bg-gray-50 w-full min-h-[90px] border border-blue-300 rounded-sm outline-0 p-2 italic resize-none field-sizing-content"
                    name="description"
                />
            </div>
            {(editingField || clickDescription) && (
                <div>
                    {state.message && (
                        <p className={state.result === "success" ? "text-green-600" : "text-red-600"}>
                            {state.message}
                        </p>
                    )}
                    <button 
                        type="submit"
                        className="bg-blue-400 rounded-2xl px-2.5 py-1 cursor-pointer text-white mt-2 hover:bg-blue-500 transition"
                    >
                        Sačuvaj
                    </button>
                </div>
            )}
        </form>
    );
}
