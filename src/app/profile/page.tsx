"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      router.replace("/signin");
      return;
    }

    fetch(`https://fakestoreapi.com/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, [router]);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found.</p>;

  return <ProfileClient user={user} />;
}
