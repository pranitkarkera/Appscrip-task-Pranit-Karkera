import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

async function getUser(userId: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/users/${userId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export default async function ProfilePage() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;

  if (!token || !userId) {
    redirect("/signin");
  }

  const user = await getUser(userId);

  if (!user) {
    return (
      <div>
        <p>User not found.</p>
      </div>
    );
  }

  return <ProfileClient user={user} />;
}
