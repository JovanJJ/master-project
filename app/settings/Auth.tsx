export default function Auth(){
    const current = [
        ['e-mail', 'jovan@gmail.com'],
        ['lozinka', '****']
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