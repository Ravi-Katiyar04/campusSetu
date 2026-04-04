"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchMe } from "@/lib/features/auth/authSlice";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const profile = user?.profile;

  const [editMode, setEditMode] = useState(false);
  const [localProfile, setLocalProfile] = useState<any>(null);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setLocalProfile({
        course: profile.course ?? "B.Tech",
        year: profile.year ?? 1,
        skills: profile.skills || [],
      });
    }
  }, [profile]);

  if (!localProfile) return <div>Loading...</div>;

  // 🔹 Add Skill
  const addSkill = () => {
    if (!skillInput.trim()) return;

    setLocalProfile({
      ...localProfile,
      skills: [...localProfile.skills, skillInput],
    });
    setSkillInput("");
  };

  // 🔹 Remove Skill
  const removeSkill = (index: number) => {
    const updated = localProfile.skills.filter((_: any, i: number) => i !== index);
    setLocalProfile({ ...localProfile, skills: updated });
  };

  // 🔹 Save
  const saveProfile = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(localProfile),
    });

    dispatch(fetchMe()); // refresh data
    setEditMode(false);
  };

  return (
  <div className="min-h-screen bg-gray-100">

    {/* COVER + HEADER */}
    <div className="bg-white shadow">
      {/* Cover */}
      <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

      {/* Profile Info */}
      <div className="max-w-5xl mx-auto px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">

          {/* LEFT */}
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-white p-1 shadow-md">
              <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                {user?.name?.charAt(0)}
              </div>
            </div>

            {/* Name + Email */}
            <div className="mt-4 md:mt-0">
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-800">{user?.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                {localProfile.course || "B.Tech"} • Year {localProfile.year || 1}
              </p>
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => setEditMode(!editMode)}
            className={`mt-4 md:mt-0 px-5 py-2 rounded-full font-medium border transition ${
              editMode
                ? "bg-gray-200 text-gray-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>

    {/* MAIN CONTENT */}
    <div className="max-w-5xl mx-auto px-6 mt-6 space-y-6">

      {/* EDUCATION / COURSE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Education</h2>

        {editMode ? (
          <div className="grid md:grid-cols-2 gap-4">

            {/* Course */}
            <select
              value={localProfile.course}
              onChange={(e) =>
                setLocalProfile({ ...localProfile, course: e.target.value })
              }
              className="border rounded-lg p-3"
            >
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MCA">MCA</option>
            </select>

            {/* Year */}
            <input
              type="number"
              min={1}
              max={5}
              value={localProfile.year ?? ""}
              onChange={(e) =>
                setLocalProfile({
                  ...localProfile,
                  year:
                    e.target.value === "" ? null : Number(e.target.value),
                })
              }
              placeholder="Academic Year"
              className="border rounded-lg p-3"
            />
          </div>
        ) : (
          <p className="text-gray-700">
            {localProfile.course || "B.Tech"} • Year {localProfile.year || 1}
          </p>
        )}
      </div>

      {/* SKILLS */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Skills</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {localProfile.skills.map((skill: string, i: number) => (
            <span
              key={i}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {skill}
              {editMode && (
                <button
                  onClick={() => removeSkill(i)}
                  className="text-red-500"
                >
                  ✕
                </button>
              )}
            </span>
          ))}
        </div>

        {editMode && (
          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add a skill"
              className="flex-1 border rounded-lg p-3"
            />
            <button
              onClick={addSkill}
              className="bg-blue-600 text-white px-4 rounded-lg"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* SAVE BUTTON */}
      {editMode && (
        <div className="flex justify-end">
          <button
            onClick={saveProfile}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  </div>
);
}