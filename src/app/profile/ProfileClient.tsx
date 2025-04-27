"use client";

import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import styles from "./profile.module.css";
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  address: {
    number: number;
    street: string;
    city: string;
    zipcode: string;
  };
}

interface ProfileClientProps {
  user: User;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.replace("/");
  };

  return (
    <div className={styles.container}>
      <h1>
        <FaUser style={{ marginRight: "8px", verticalAlign: "middle" }} />
        Profile
      </h1>
      <div className={styles.profileBox}>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Name:</strong> {user.name.firstname} {user.name.lastname}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong> {user.address.number} {user.address.street},{" "}
          {user.address.city}, {user.address.zipcode}
        </p>
      </div>
      <button className={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
