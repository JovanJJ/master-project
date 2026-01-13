import Button from "../../worker/components/ToggleButton";

export default function Notifications () {
    return(
        <div className="space-y-6">
            <div>
            <h1 className="text-xl">Obaveštenja</h1>
            </div>
            <div className="flex items-center justify-between gap-4">
                Email Obaveštenja
                <Button />
            </div>
            <div className="flex items-center justify-between gap-4">
                WhatsApp / Viber Obaveštenja
                <Button />
            </div>
        </div>
    );
}