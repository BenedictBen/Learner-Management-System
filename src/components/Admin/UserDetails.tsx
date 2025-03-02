
"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { loadSession, signin } from "@/features/authSlice";
import { Avatar } from "@chakra-ui/react";
import Image from "next/image";

const UserDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const admin = user?.role === "admin" ? user : null;

  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

    // New state for password fields
    const [localPassword, setLocalPassword] = useState("");
    const [localNewPassword, setLocalNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    dispatch(loadSession());
  }, [dispatch]);

  useEffect(() => {
    if (admin) {
      setLocalUser({
        firstName: admin.first_name,
        lastName: admin.last_name,
        email: admin.email,
        contact: admin.contact,
      });
      setImagePreview(admin.image || null);
      setLocalPassword("");
      setLocalNewPassword("");
    }
  }, [admin]);

  const handleEdit = () => setIsEditing(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalUser({ ...localUser, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = () => {
    if (!admin) return;

    const updatedAdmin = {
      ...admin,
      first_name: localUser.firstName,
      last_name: localUser.lastName,
      email: localUser.email,
      contact: localUser.contact,
      image: imagePreview || admin.image,
      // Optionally include password updates if provided
      ...(localPassword && localNewPassword && {
        password: localPassword,
        newPassword: localNewPassword,
      }),
    };

    dispatch(signin(updatedAdmin));
    localStorage.setItem("adminUser", JSON.stringify(updatedAdmin));
    setIsEditing(false);
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!admin)
    return <div className="text-center p-4 text-red-500">Unauthorized</div>;

  return (
    <div className="w-full py-4">
      <div className="px-2 lg:px-6 py-6 md:py-0">
        {/* Profile Picture Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full px-2 lg:px-6 py-6 md:py-0 bg-casbGreyBorder md:bg-white">
          <div className="flex items-center flex-col md:flex-row gap-4 w-full md:w-auto flex-1">
            {imagePreview ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={imagePreview}
                alt="Admin Avatar"
                fill
                className="object-cover"
              />
            </div>
            ) : (
              <Avatar
                name={`${admin.first_name} ${admin.last_name}`}
                boxSize={100}
                colorScheme="blue"
              />
            )}
            <h2 className="text-base">Profile Picture</h2>
          </div>
          {isEditing && (
            <div className="w-44 md:max-w-[200px] flex-1 mx-auto">
              <label
                htmlFor="imageUpload"
                className="inline-flex items-center justify-center bg-casbBluePrimary hover:bg-casbBlueHover text-white rounded-sm px-4 py-2 cursor-pointer transition-colors w-full"
              >
                <Image
                  src="/uploadImage.png"
                  alt="Upload Icon"
                  width={20}
                  height={20}
                  className="filter invert-100 mr-2"
                />
                <span className="text-sm md:text-base">Upload Image</span>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Form Section */}
        <form className="space-y-6">
          {/* Full Name */}
          <div className="py-4">
            <span className="py-2 block">Full name</span>
            <div className="bg-casbGreyBorder py-4 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    value={localUser.firstName}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className="p-2 w-full pr-10 pl-8 bg-white border-b-2 focus:border-casbBluePrimary focus:outline-none rounded-sm border-casbBluePrimary"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={localUser.lastName}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className="p-2 w-full pr-10 pl-8 bg-white border-b-2 focus:border-casbBluePrimary focus:outline-none rounded-sm border-casbBluePrimary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="py-4">
            <div className="py-4">
              <span className="pb-2 block">Email</span>
              <p className="text-sm text-gray-600">Manage account email address</p>
            </div>
            <div className="bg-casbGreyBorder py-4 px-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={localUser.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="border-b-2 p-2 w-full pr-10 pl-10 bg-white focus:border-casbBluePrimary focus:outline-none rounded-sm border-casbBluePrimary"
                />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="py-4">
            <div className="py-4">
              <span className="pb-2 block">Contact</span>
            </div>
            <div className="bg-casbGreyBorder py-4 px-4">
              <div className="relative">
                <input
                  type="tel"
                  name="contact"
                  value={localUser.contact}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="border-b-2 p-2 w-full pr-10 pl-10 bg-white focus:border-casbBluePrimary focus:outline-none rounded-sm border-casbBluePrimary"
                />
              </div>
            </div>
          </div>

           {/* Password Section */}
           <div className="py-4">
            <div className="py-4">
              <span className="pb-2 block">Password</span>
              <p className="text-sm text-gray-600">Modify your current password</p>
            </div>
            <div className="bg-casbGreyBorder py-4 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Password */}
                <div className="relative">
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={localPassword}
                      onChange={(e) => setLocalPassword(e.target.value)}
                      readOnly={!isEditing}
                      className="w-full p-2 pl-8 pr-16 border-b-2 bg-white focus:border-casbBluePrimary focus:outline-none rounded-sm border-casbBluePrimary"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer"
                      >
                        <Image
                          src={showPassword ? "/eye-close.png" : "/eye.png"}
                          alt={showPassword ? "Hide Password" : "Show Password"}
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* New Password */}
                <div className="relative">
                  <div className="relative flex items-center">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New Password"
                      value={localNewPassword}
                      onChange={(e) => setLocalNewPassword(e.target.value)}
                      readOnly={!isEditing}
                      className="w-full p-2 pl-8 pr-16 border-b-2 bg-white focus:border-casbBluePrimary focus:outline-none rounded-sm border-casbBluePrimary"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
                      <div
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="cursor-pointer"
                      >
                        <Image
                          src={showNewPassword ? "/eye-close.png" : "/eye.png"}
                          alt={showNewPassword ? "Hide Password" : "Show Password"}
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-start gap-3 mt-6">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="flex-1 bg-casbBluePrimary text-white p-2 rounded-sm hover:bg-casbBlueHover transition-colors duration-300"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-casbGreyPrimary text-gray-600 p-2 rounded-sm hover:bg-gray-200 transition-colors duration-300"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="w-full bg-casbBluePrimary text-white p-2 rounded-sm hover:bg-casbBlueHover transition-colors duration-300 w-full md:w-44"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
