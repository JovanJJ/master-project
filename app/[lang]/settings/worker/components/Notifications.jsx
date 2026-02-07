import Button from "../../worker/components/ToggleButton";

export default function Notifications({ lang }) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl">{lang === 'en' ? 'Notifications' : 'Obaveštenja'}</h1>
            </div>
            <div className="flex items-center justify-between gap-4">
                {lang === 'en' ? 'Email Notifications' : 'Email Obaveštenja'}
                <Button />
            </div>
            <div className="flex items-center justify-between gap-4">
                {lang === 'en' ? 'WhatsApp / Viber Notifications' : 'WhatsApp / Viber Obaveštenja'}
                <Button />
            </div>
        </div>
    );
}