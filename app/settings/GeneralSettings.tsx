import { lstat } from "fs";

export default function GeneralSettings({session, status}){
    if(status === "loading"){
        return('');
    }
    const { email, firstName, id, lastName, name, profession, location, gender, phone } = session.user;
    const current = [
              ["Ime", firstName],
              ["Prezime", lastName],
              ["Profesija", profession],
              ["Lokacija", location],
              ["Pol", gender],
              ["Telefon", phone]
    ]

    return(
        current.map(([label, placeholder]) => {
            return(
                 <div
                 key={label}
                 className="flex flex-col sm:flex-row sm:items-center gap-2"
                 >
                   <label className="w-24 font-medium">{label}</label>
                   <input
                   placeholder={placeholder}
                   className="w-full sm:max-w-36 border border-blue-300 rounded p-2 focus:outline-none focus:border-blue-600 transition"
                   />
                   <span className="text-[13px] cursor-pointer underline">
                    change
                   </span>
                </div>
            );
        })
    );
}