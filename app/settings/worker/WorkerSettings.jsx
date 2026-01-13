'use client'

import { useState, useEffect } from 'react';
import Image from "next/image";
import Simage from "../../../public/settings-icon-14950.png";
import ProfileUpload from "./components/ProfileUpload";
import GeneralSettings from './components/GeneralSettings';
import Auth from './components/Auth';
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation"
import { fetchWorkerById } from "../../../lib/actions/worker";
import Notifications from './components/Notifications';
import blueRightArrow from "../../../public/arrow-right-1.svg";

export default function Settings() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("general");
  const [profileData, setProfileData] = useState(null);
  const { data: session, status } = useSession();


  useEffect(() => {
  if (status !== "authenticated" || !session?.user?.id) return;

  const loadProfile = async () => {
    const data = await fetchWorkerById(session.user.id);
    setProfileData(data);
  };

  loadProfile();
}, [status, session?.user?.id]);

  if (status === "loading") {
    return ('')
  }
  if (!session) {
    redirect("/login");
  }

  const menuItems = [
    { id: "general", label: "Profil" },
    { id: "auth", label: "e-mail i lozinka" },
    { id: "notifications", label: "Obavestenja" },
  ];

  return (
    <section className="w-full  flex md:items-center justify-center">
      <div className="w-[900px] mx-auto p-4 md:p-7 md:border md:border-blue-200 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-[31%_1fr]">

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

        <div>
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2"
          >
            <Image src={blueRightArrow} alt='img' width={25} height={20}/>
          </button>
          {activeSection === 'general' && <ProfileUpload profileData={profileData} />}

          <div className="space-y-4 w-full px-4 pt-5">
            {activeSection === 'general' && <GeneralSettings session={session} status={status} profileData={profileData} reloadProfile={() => loadProfile(session.user.id)} />}
            {activeSection === 'auth' && <Auth session={session} status={status} profileData={profileData} />}
            {activeSection === "notifications" && <Notifications /> }
          </div>
        </div>
      </div>
    </section>

  );
}