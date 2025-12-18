"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import { PATHS } from "@/constant/PATHS";

import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  editProfileSchema,
  EditProfileSchemaType,
} from "./validation";

import { useEditProfile } from "./hooks/useEditProfile";

export default function EditProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { submit, isLoading } = useEditProfile();

  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProfileSchemaType>({
    resolver: yupResolver(editProfileSchema),
  });

  useEffect(() => {
    if (!user) return;
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("email", user.email);
  }, [user, setValue]);

  useEffect(() => {
    if (!photo) return setPreviewUrl(null);
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

    const result = await submit(formData);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Profile updated successfully");
    router.push(PATHS.PROFILE);
  };

  const openFilePicker = () =>
    fileInputRef.current?.click();

  return (
    <div className="min-h-screen flex justify-center py-20 px-6">
      <div className="w-full max-w-3xl bg-card  rounded-xl p-10 shadow-2xl">

        <h1 className="text-3xl font-bold mb-2">
          Edit Profile
        </h1>
        <p className="text-muted mb-6">
          Update your personal information
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div
              onClick={openFilePicker}
              className="relative w-24 h-24 rounded-full overflow-hidden bg-soft border cursor-pointer"
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Preview"
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
                <span className="flex items-center justify-center h-full font-bold text-primary text-xl">
                  {user?.firstName?.[0] ?? "U"}
                </span>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                setPhoto(e.target.files?.[0] || null)
              }
            />

            <button
              type="button"
              onClick={openFilePicker}
              className="text-primary text-sm hover:underline"
            >
              Change Avatar
            </button>
          </div>

          {/* Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
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

          <PrimaryButton
            isLoading={isLoading}
            type="submit"
          >
            Save Changes
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
