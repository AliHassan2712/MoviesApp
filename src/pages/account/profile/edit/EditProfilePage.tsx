"use client";

// react
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

// components
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";

// hooks
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useEditProfile from "./hooks/useEditProfile";

// validation
import {
  editProfileSchema,
  EditProfileSchemaType,
} from "./validation";

export default function EditProfilePage() {
  const { user } = useAuth();
  const { updateProfile, isLoading } = useEditProfile();

  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProfileSchemaType>({
    resolver: yupResolver(editProfileSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  // create & cleanup preview URL
  useEffect(() => {
    if (!photo) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(photo);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const onSubmit = async (data: EditProfileSchemaType) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    if (photo) formData.append("photo", photo);

    await updateProfile(formData);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex justify-center py-20 px-6">
      <div className="w-full max-w-3xl bg-[var(--color-background-card)] border border-main rounded-xl shadow-2xl p-10 backdrop-blur-lg">

        <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
        <p className="text-muted mb-6">Update your personal information</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">

            <div
              className="relative w-24 h-24 rounded-full overflow-hidden border border-main bg-soft cursor-pointer hover:opacity-80"
              onClick={openFilePicker}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : user?.photo ? (
                <Image
                  src={user.photo}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <p className="flex items-center justify-center h-full text-primary font-bold text-xl">
                  {user?.firstName?.[0] ?? "U"}
                </p>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            />

            <button
              type="button"
              onClick={openFilePicker}
              className="text-primary hover:underline text-sm"
            >
              Change Avatar
            </button>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
            <Input
              label="Last Name"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>

          <Input
            label="Email"
            error={errors.email?.message}
            {...register("email")}
          />

          <PrimaryButton isLoading={isLoading} type="submit">
            Save Changes
          </PrimaryButton>

        </form>
      </div>
    </div>
  );
}
