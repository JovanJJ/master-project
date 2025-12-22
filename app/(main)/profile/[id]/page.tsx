import Image from "next/image";
import Globe from "../../../../public/JJ.jpg";
import Star from "../../../../public/stars.avif";
import { fetchWorkerById } from "@/lib/actions/worker";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type WorkerProfilePageProps = {
    params: {
        id: string
    }
}

export default async function ProfilePage({ params }: WorkerProfilePageProps) {
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/login");
    }
    console.log(session);
    const profilePageParams = await params;
    const workerId = session.user.id;
    const workerData = await fetchWorkerById(workerId);
    const { _id, firstName, lastName, profession, location, birthYear, gender, email, phone, profileImage } = workerData;
    console.log(workerData);
    return (
        <section className="w-full">
            <div className="mx-auto max-w-[1100px] flex flex-col xl:flex-row gap-7 mt-[30px]">
                <div className="mx-auto max-w-[800px] p-3 shadow-2xl rounded-3xl">
                    <div className="w-full flex justify-center sm:justify-start pt-7">
                        <div className="w-2/3 max-w-48 aspect-square rounded-full relative border-3 border-blue-200">
                            <Image src={profileImage} fill alt="Profile Image" className="w-full rounded-full object-cover"></Image>
                            <div className="absolute -bottom-6 -right-6 z-30 sm:-bottom-5 sm:-right-5 md:-bottom-1 md:-right-5 lg:bottom-1 lg:right-1">
                                <Image src={Star} alt="star" className="w-[50px] h-[50px]"></Image>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4  max-w-[300px] text-[18px] sm:text-xl pt-7">
                        <div><span className="italic text text-base">Ime:</span> {firstName}</div>
                        <div><span className="italic text text-base">Prezime:</span> {lastName}</div>
                        <div><span className="italic text text-base">Profesija:</span> {profession}</div>
                        <div><span className="italic text text-base">Lokacija:</span> {location}</div>
                        <div><span className="italic text text-base">Pol:</span> {gender}</div>
                        <div><span className="italic text text-base">Godina rodjenja:</span> {birthYear}</div>
                        <div><span className="italic text text-base">E-mail:</span> {email}</div>
                        <div><span className="italic text text-base">Telefon:</span> {phone}</div>
                    </div>

                    <div className="border border-blue-200 mt-4  p-3 rounded-2xl sm:w-full shadow-xl">
                        <span><span className="font-bold">Opis:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                            in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum
                        </span>
                    </div>

                    <div className="max-w-[1100px] p-4 mt-7">
                        <h2 className="text-xl font-semibold mb-4">Komentari</h2>
                        <textarea name="comment" placeholder="Dodaj svoj komentar" className="resize-none w-full md:w-full min-h-[100px] 
                     focus:outline-none border border-blue-200 p-4 rounded-xl shadow-xl"></textarea>
                        <button className="px-2 py-1 rounded-xl bg-blue-400 block text-white">Pošalji</button>

                        <div className="w-full mt-6 pl-3 overflow-y-auto max-h-[300px]">
                            <div className="border p-2 rounded-2xl border-blue-200 relative w-[97%] md:w-full shadow-xl mb-3">
                                <div className="flex items-center gap-2">
                                    <Image src={Globe} alt="userImage" className="w-[50px] rounded-full"></Image>
                                    <div className="font-bold italic">Marko Markovic</div>
                                </div>

                                <div className="mt-2 pb-2.5 text-[14px]">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci explicabo magnam laboriosam maiores nostrum, ipsum veniam.aaaaaaaaaaaaaaa
                                </div>
                                <div className="absolute bottom-0 right-2 text-[12px] text-gray-500 italic">12.12.1999, 15:45</div>
                            </div>

                            <div className="border p-2 rounded-2xl border-blue-200 relative w-[97%] md:w-full shadow-xl mb-3">
                                <div className="flex items-center gap-2">
                                    <Image src={Globe} alt="userImage" className="w-[50px] rounded-full"></Image>
                                    <div className="font-bold italic">Marko Markovic</div>
                                </div>

                                <div className="mt-2 pb-2.5 text-[14px]">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci explicabo magnam laboriosam maiores nostrum, ipsum veniam.aaaaaaaaaaaaaaa
                                </div>
                                <div className="absolute bottom-0 right-2 text-[12px] text-gray-500 italic">12.12.1999, 15:45</div>
                            </div>

                            <div className="border p-2 rounded-2xl border-blue-200 relative w-[97%] md:w-full shadow-xl mb-3">
                                <div className="flex items-center gap-2">
                                    <Image src={Globe} alt="userImage" className="w-[50px] rounded-full"></Image>
                                    <div className="font-bold italic">Marko Markovic</div>
                                </div>

                                <div className="mt-2 pb-2.5 text-[14px]">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci explicabo magnam laboriosam maiores nostrum, ipsum veniam.aaaaaaaaaaaaaaa
                                </div>
                                <div className="absolute bottom-0 right-2 text-[12px] text-gray-500 italic">12.12.1999, 15:45</div>
                            </div>
                        </div>

                    </div>
                    <aside className="xl:hidden p-4 mt-7 md:max-w-[1100px] h-auto border border-blue-200 rounded-xl">
                        <h2 className="w-fit mx-auto text-xl pb-4">Pogledajte i nase ostale majstore</h2>
                        <div className="overflow-y-auto h-[300px] grid grid-cols gap-4 p-4 sm:grid-cols-2 ">
                            <div className="flex w-2/3 sm:w-full max-h-[120px]  gap-3 p-3 rounded-xl border border-blue-100 bg-white hover:shadow-md transition">

                                <div>
                                    <Image
                                        src={Globe}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-xl "
                                    />
                                </div>


                                <div className="flex flex-col justify-between min-w-0">
                                    <div className="space-y-1">
                                        <div className="font-semibold text-sm truncate">
                                            Jovan Jovanović
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Programer
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Beograd
                                        </div>
                                    </div>

                                    <button className="text-xs text-blue-600 hover:underline self-start">
                                        Pogledaj profil →
                                    </button>
                                </div>
                            </div>

                            <div className="flex w-2/3 sm:w-full max-h-[120px]  gap-3 p-3 rounded-xl border border-blue-100 bg-white hover:shadow-md transition">

                                <div>
                                    <Image
                                        src={Globe}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-xl "
                                    />
                                </div>


                                <div className="flex flex-col justify-between min-w-0">
                                    <div className="space-y-1">
                                        <div className="font-semibold text-sm truncate">
                                            Jovan Jovanović
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Programer
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Beograd
                                        </div>
                                    </div>

                                    <button className="text-xs text-blue-600 hover:underline self-start">
                                        Pogledaj profil →
                                    </button>
                                </div>
                            </div>

                            <div className="flex w-2/3 sm:w-full max-h-[120px]  gap-3 p-3 rounded-xl border border-blue-100 bg-white hover:shadow-md transition">

                                <div>
                                    <Image
                                        src={Globe}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-xl "
                                    />
                                </div>


                                <div className="flex flex-col justify-between min-w-0">
                                    <div className="space-y-1">
                                        <div className="font-semibold text-sm truncate">
                                            Jovan Jovanović
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Programer
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Beograd
                                        </div>
                                    </div>

                                    <button className="text-xs text-blue-600 hover:underline self-start">
                                        Pogledaj profil →
                                    </button>
                                </div>
                            </div>

                            <div className="flex w-2/3 sm:w-full max-h-[120px]  gap-3 p-3 rounded-xl border border-blue-100 bg-white hover:shadow-md transition">

                                <div>
                                    <Image
                                        src={Globe}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-xl "
                                    />
                                </div>


                                <div className="flex flex-col justify-between min-w-0">
                                    <div className="space-y-1">
                                        <div className="font-semibold text-sm truncate">
                                            Jovan Jovanović
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Programer
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Beograd
                                        </div>
                                    </div>

                                    <button className="text-xs text-blue-600 hover:underline self-start">
                                        Pogledaj profil →
                                    </button>
                                </div>
                            </div>

                            <div className="flex w-2/3 sm:w-full max-h-[120px]  gap-3 p-3 rounded-xl border border-blue-100 bg-white hover:shadow-md transition">

                                <div>
                                    <Image
                                        src={Globe}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-xl "
                                    />
                                </div>


                                <div className="flex flex-col justify-between min-w-0">
                                    <div className="space-y-1">
                                        <div className="font-semibold text-sm truncate">
                                            Jovan Jovanović
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Programer
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Beograd
                                        </div>
                                    </div>

                                    <button className="text-xs text-blue-600 hover:underline self-start">
                                        Pogledaj profil →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                <aside className="hidden mt-4 xl:block w-[300px] space-y-6 h-[500px]">
                    <h2 className="w-fit mx-auto text-xl">Pogledajte ostale majstore</h2>
                    <div className="flex gap-3 p-3 rounded-xl border border-blue-100 bg-white hover:shadow-md transition">

                        <div>
                            <Image
                                src={Globe}
                                alt="Profile"
                                className="w-24 h-24 rounded-xl "
                            />
                        </div>


                        <div className="flex flex-col justify-between min-w-0">
                            <div className="space-y-1">
                                <div className="font-semibold text-sm truncate">
                                    Jovan Jovanović
                                </div>
                                <div className="text-xs text-gray-600">
                                    Programer
                                </div>
                                <div className="text-xs text-gray-500">
                                    Beograd
                                </div>
                            </div>

                            <button className="text-xs text-blue-600 hover:underline self-start">
                                Pogledaj profil →
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 p-3 rounded-xl border border-blue-100 bg-white hover:shadow-md transition">

                        <div>
                            <Image
                                src={Globe}
                                alt="Profile"
                                className="w-24 h-24 rounded-xl "
                            />
                        </div>


                        <div className="flex flex-col justify-between min-w-0">
                            <div className="space-y-1">
                                <div className="font-semibold text-sm truncate">
                                    Jovan Jovanović
                                </div>
                                <div className="text-xs text-gray-600">
                                    Programer
                                </div>
                                <div className="text-xs text-gray-500">
                                    Beograd
                                </div>
                            </div>

                            <button className="text-xs text-blue-600 hover:underline self-start">
                                Pogledaj profil →
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 p-3 rounded-xl border border-blue-100 bg-white hover:shadow-md transition">

                        <div>
                            <Image
                                src={Globe}
                                alt="Profile"
                                className="w-24 h-24 rounded-xl "
                            />
                        </div>


                        <div className="flex flex-col justify-between min-w-0">
                            <div className="space-y-1">
                                <div className="font-semibold text-sm truncate">
                                    Jovan Jovanović
                                </div>
                                <div className="text-xs text-gray-600">
                                    Programer
                                </div>
                                <div className="text-xs text-gray-500">
                                    Beograd
                                </div>
                            </div>

                            <button className="text-xs text-blue-600 hover:underline self-start">
                                Pogledaj profil →
                            </button>
                        </div>
                    </div>


                    <div className="flex gap-3 p-3 rounded-xl border border-blue-100 bg-white hover:shadow-md transition">

                        <div>
                            <Image
                                src={Globe}
                                alt="Profile"
                                className="w-24 h-24 rounded-xl "
                            />
                        </div>


                        <div className="flex flex-col justify-between min-w-0">
                            <div className="space-y-1">
                                <div className="font-semibold text-sm truncate">
                                    Jovan Jovanović
                                </div>
                                <div className="text-xs text-gray-600">
                                    Programer
                                </div>
                                <div className="text-xs text-gray-500">
                                    Beograd
                                </div>
                            </div>

                            <button className="text-xs text-blue-600 hover:underline self-start">
                                Pogledaj profil →
                            </button>
                        </div>
                    </div>


                    <div className="flex gap-3 p-3 rounded-xl border border-blue-100 bg-white hover:shadow-md transition">

                        <div>
                            <Image
                                src={Globe}
                                alt="Profile"
                                className="w-24 h-24 rounded-xl "
                            />
                        </div>


                        <div className="flex flex-col justify-between min-w-0">
                            <div className="space-y-1">
                                <div className="font-semibold text-sm truncate">
                                    Jovan Jovanović
                                </div>
                                <div className="text-xs text-gray-600">
                                    Programer
                                </div>
                                <div className="text-xs text-gray-500">
                                    Beograd
                                </div>
                            </div>

                            <button className="text-xs text-blue-600 hover:underline self-start">
                                Pogledaj profil →
                            </button>
                        </div>
                    </div>

                </aside>
            </div>
        </section>
    );
}