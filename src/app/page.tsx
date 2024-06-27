"use client";
import Navbar from "./Navbar/page";
import Dashboard from "./dashboard/page";
import axios from 'axios';
import GitHubFooter from "./GitHubFooter/page";
import kraftbaseStore from "@/app/store";
import { useEffect, useState } from "react";
import Shimmer from "./shimmer";

export default function Home() {
  const user = kraftbaseStore(state => state.user);
  const setUser = kraftbaseStore(state => state.setUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function SetUser() {
      try {
        setLoading(true);
        const response = await axios.get('/api/users/user');
        setLoading(false);
        setUser(response.data.user);
      } catch (error: any) {
        setLoading(false);
        throw new Error(error.message);
      }
    }
    if (!user)
      SetUser();
    // eslint-disable-next-line
  }, []);

  if (!user || loading)
    return <Shimmer />

  return (
    <>
      <Navbar />
      <Dashboard />
      <GitHubFooter />
    </>
  );
}
