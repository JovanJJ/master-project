'use client'

import { useState } from 'react';
import Image from "next/image";
import Simage from "../../public/settings-icon-14950.png";
import ProfileUpload from "./ProfileUpload";
import GeneralSettings from './GeneralSettings';
import Auth from './Auth';
import { fetchWorkerById } from '@/lib/actions/worker';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation"

export default function Settings() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("general");
  //const session = await getServerSession(authOptions);
  const { data: session, status } = useSession();
  
  if(status === "loading"){
    return('')
  }
  if(!session){
        redirect("/login");
    }
  console.log(session);
  const menuItems = [
    { id: "general", label: "Opšta podešavanja" },
    { id: "auth", label: "e-mail i lozinka" },
    { id: "security", label: "Bezbednost" },
    { id: "notifications", label: "Obavestenja" },
    { id: "messages", label: "Poruke" },
  ];

  return (
    <section className="w-full min-h-screen">
      <div className="max-w-[900px] mx-auto p-4 md:p-7 border border-blue-200 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-[31%_1fr]">

        {/* LEFT SIDEBAR */}
        <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl
        transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:w-auto md:shadow-none
        md:border-r border-blue-200
       `}>
          <button
            onClick={() => setMenuOpen(false)}
            className="md:hidden absolute top-4 right-4 text-xl"
          >
            ✕
          </button>

          <div className="font-bold p-4 pt-6 flex justify-center items-center pb-6">
            Podešavanja
            <Image src={Simage} alt="settings image" className="w-[30px] pl-2" />
          </div>

          <div className="flex flex-col items-center md:items-start gap-3 pb-4">
            {
              menuItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMenuOpen(false);
                    }}
                    className={`cursor-pointer transition ${activeSection === item.id
                        ? "text-blue-500 font-semibold"
                        : "hover:text-blue-400"
                      }`}
                  >
                    {item.label}
                  </div>
                );
              })
            }
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2"
          >
            ☰
          </button>
          <ProfileUpload />

          <div className="space-y-4 w-full px-4 pt-5">
           {activeSection === 'general' && <GeneralSettings session={session} status={status} />}
           {activeSection === 'auth' && <Auth />}
          </div>
        </div>
      </div>
    </section>

  );
}