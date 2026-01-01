'use server';

import { connectDB } from '../db';
import Worker from '../models/Worker';
import Comment from "../models/Comments";
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import cloudinary from '@/lib/cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import bcrypt from 'bcryptjs';


const ITEMS_PER_PAGE = 10;

const allowedFields = [
  "firstName",
  "lastName",
  "phone",
  "location",
  "profession",
  "description",
];

export async function fetchWorkers({ p, loc, page }: { p?: string, loc?: string, page?: string }) {
  await connectDB(); // Ensure connection is active

  try {
    const currentPage = Number(page) || 1;
    const skipCount = (currentPage - 1) * ITEMS_PER_PAGE;

    // 1. Construct the query filter
    const filter: any = {};

    // Case-insensitive search using Regex (best for partial matches)
    if (p) {
      filter.profession = { $regex: p, $options: 'i' };
    }
    if (loc) {
      filter.location = { $regex: loc, $options: 'i' };
    }

    // 2. Execute the query with pagination
    const workers = await Worker.find(filter)
      .skip(skipCount)
      .limit(ITEMS_PER_PAGE)
      .lean(); // .lean() returns plain JavaScript objects, improving performance

    // 3. Get the total count for pagination metadata
    const totalItems = await Worker.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return {
      workers: JSON.parse(JSON.stringify(workers)), // Serialize Mongoose objects for Next.js Server Components
      totalItems,
      totalPages,
      currentPage,
    };

  } catch (error) {
    console.error('Database Fetch Error:', error);
    throw new Error('Failed to fetch worker data.');
  }
}

export async function createWorker(formData: FormData) {
  await connectDB();

  const data = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    profession: formData.get('profession') as string,
    location: formData.get('city') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    birthYear: formData.get('birthYear') as string,
    gender: formData.get('gender') as string,
    password: formData.get('password') as string,
    role: formData.get("role") as string,
  };

  // 1. Validation
  if (!data.firstName || !data.profession || !data.email || !data.password) {
    return { success: false, message: "Missing required fields." };
  }

  // Validate password length
  if (data.password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters long." };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { success: false, message: "Invalid email format." };
  }

  try {
    // 2. Check if email already exists
    const existingWorker = await Worker.findOne({ email: data.email });
    if (existingWorker) {
      return { success: false, message: "Email already registered. Please use a different email." };
    }

    // 3. Create worker - password will be hashed by the pre-save hook
    const newWorker = await Worker.create(data);

    console.log(`✅ Successfully created worker: ${newWorker.firstName} ${newWorker.lastName}`);

    // 4. Revalidate search page
    revalidatePath('/search');

    return {
      success: true,
      message: `Account created successfully! You can now login.`
    };

  } catch (error: any) {
    console.error('❌ DB Write Error:', error);

    // Handle duplicate email error (in case race condition)
    if (error.code === 11000) {
      return { success: false, message: "Email already registered." };
    }

    return { success: false, message: 'Failed to create account. Please try again.' };
  }
}

export async function fetchWorkerById(id: string) {
  await connectDB();

  try {
    const worker = await Worker.findById(id).lean();

    if (!worker) {
      return null;
    }

    // Normalize profileImage to null if it's empty/falsy
    const normalizedProfileImage = worker.profileImage && String(worker.profileImage).trim() 
      ? String(worker.profileImage) 
      : null;

    return {
      ...worker,
      _id: worker._id.toString(),
      profileImage: normalizedProfileImage,
    };

  } catch (error) {
    console.error('Database Fetch Error:', error);
    throw new Error('Failed to fetch worker details.');
  }
}

export async function uploadProfileImage(formData: FormData) {
  await connectDB();

  const file = formData.get('profilePicture') as File;
  const workerId = formData.get('workerId') as string;

  // Validation
  if (!file) {
    return { success: false, message: 'Niste nalepili novu fotogradiju' };
  }

  if (!file.type.startsWith('image/')) {
    return { success: false, message: 'Fajl mora biti u image formatu' };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { success: false, message: 'Slika mora biti manja od 5MB' };
  }

  if (!workerId) {
    return { success: false, message: 'Došlo je do greške' };
  }

  try {
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'worker-profiles',
          transformation: [
            { width: 400, height: 400, crop: 'fill' },
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const imageUrl = (uploadResult).secure_url;

    // Update worker in database
    const updatedWorker = await Worker.findByIdAndUpdate(
      workerId,
      { profileImage: imageUrl },
      { new: true }
    );

    if (!updatedWorker) {
      return { success: false, message: 'Worker not found' };
    }

    // Revalidate any pages that show this worker
    revalidatePath('/settings');
    revalidatePath(`/worker/${workerId}`);

    return {
      success: true,
      imageUrl,
      message: 'Uspešno ste dodali novu sliku.'
    };

  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      message: 'Došlo je do greške, pokušajte ponovo.'
    };
  }
}

export async function changePassword(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, message: 'Niste uneli sva polja' };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: 'Nove lozinke se ne poklapaju' };
  }

  if (newPassword.length < 6) {
    return { success: false, message: 'Šifra mora da ima najmanje 6 karaktera' };
  }

  await connectDB();

  const worker = await Worker.findOne({
    email: email
  }).select("+password");

  if (!worker) {
    return { success: false, message: "Worker not found" };
  }

  const isValid = await bcrypt.compare(currentPassword, worker.password);

  if (!isValid) {
    return ({ success: false, message: "Pogrešna šifra" })
  }
  worker.password = newPassword;
  await worker.save();
  return ({ success: true, message: "Uspešno ste promenili lozinku" });

}

export async function changeMultipleFields(prevState, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, message: "Unauthorized" }
  }

  const updates = {};

  for (const field of allowedFields) {
    const value = formData.get(field);
    if (value) {
      updates[field] = value.toString();
    }
  }
  await connectDB();

  const result = await Worker.updateOne(
    { _id: session.user.id },
    { $set: updates }
  ).lean();

  revalidatePath(`/profile`);
  
  return {
    success: true,
  }


}

export async function addComments(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  const workerId = formData.get("workerId")?.toString();
  const text = formData.get("text")?.toString();

  if (!workerId || !text) {
    return { success: false, message: "Missing fields" };
  }

  await connectDB();

  try {
    const comment = await Comment.create({
      workerId: new mongoose.Types.ObjectId(workerId),
      userId: new mongoose.Types.ObjectId(session.user.id),
      text,
    });

    console.log("✅ Comment created:", comment.text);
    revalidatePath(`/profile/${workerId}`);
   
  } catch (err) {
    console.error("❌ Error:", err);
    return { success: false, message: "DB error" };
  }
}

export async function fetchComments(workerId: string){
  const session = await getServerSession(authOptions);
  if(!session) return {success: false, message: "Unauthorized"}

  await connectDB();

  const comment = await Comment.find({workerId})
  .sort({createdAt: - 1})
  .lean()
  .populate({
    path: "workerId",
    select: "firstName lastName profileImage",
  }).lean();

  
  
  return comment.map((c) => {
    return {
      id: c._id.toString(),
      text: c.text,
      createdAt: c.createdAt.toISOString(),
      user:{
        userId: c.workerId._id.toString(),
        firstName: c.workerId.firstName,
        lastName: c.workerId.lastName,
        profileImage: c.workerId.profileImage,
      }
    }
  
    
  });
  
  
}






