'use client';

import { useState, useRef, useEffect } from "react";
import { uploadProfileImage } from "../../../../../lib/actions/worker";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UserProfileUpload({ profileImage, userId, lang }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState([]);
    const fileInputRef = useRef(null);
    const { update } = useSession();
    const router = useRouter();


    console.log(userId);



    const userImage = profileImage;



    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (!file.type.startsWith("image/")) {
                alert(lang === 'en' ? "Please select an image file" : "Molimo izaberite sliku");
                return;
            }

            setSelectedImage(file);

            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setPreviewUrl(reader.result)
            }
        }

    }

    const inputButtonClick = () => {
        fileInputRef.current?.click();
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedImage) {
            setError(lang === 'en' ? 'Please select an image' : 'Molimo izaberite sliku')
            return
        }

        setError(null)


        try {

            const formData = new FormData()
            formData.append('profilePicture', selectedImage)
            formData.append('userId', userId)

            const res = await fetch(`/api/user/profileUpload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) {
                throw new Error(`Upload failed with status ${res.status}`);
            }

            const result = await res.json();

            if (!result.success) {
                throw new Error(result.message || 'Upload failed')
            }

            setSuccess(true);
            setSelectedImage(null);
            setPreviewUrl(result.data.profileImage);


        } catch (err) {
            setError(err.message);
        }
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="w-fit mx-auto p-6 space-y-4">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

            {
                previewUrl ? (
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition relative">
                        <Image src={previewUrl} alt="profile fill image" onClick={inputButtonClick} width={192} height={192} className="w-full h-full object-cover" />
                    </div>
                ) : (

                    <div onClick={inputButtonClick} className="flex items-center overflow-hidden justify-center bg-gray-100 border-2 border-blue-200 w-48 h-48 mx-auto rounded-full cursor-pointer hover:border-blue-500 transition relative">
                        {
                            userImage && !previewUrl ? (<Image src={userImage} alt="profile image" onClick={inputButtonClick} width={192} height={192} className="w-full h-full object-cover" />

                            ) : (
                                <span>{lang === 'en' ? 'Select Image' : 'Izaberi sliku'}</span>
                            )
                        }
                    </div>
                )
            }

            {selectedImage ? (
                <button type="submit" className="block px-3 py-2 bg-blue-500 rounded-3xl text-white w-fit mx-auto cursor-pointer active:bg-blue-200 hover:bg-blue-600 transition">{lang === 'en' ? 'Add Image' : 'Dodaj sliku'}</button>
            ) : (
                <button type="submit" disabled={!selectedImage} className="block px-3 py-2 bg-gray-300 rounded-3xl w-fit mx-auto cursor-pointer">{lang === 'en' ? 'Add Image' : 'Dodaj sliku'}</button>
            )
            }

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {lang === 'en' ? 'Image uploaded successfully' : 'Uspešno ste dodali sliku'}
                </div>
            )}
        </form>
    )

}