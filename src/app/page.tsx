"use client"
import Navbar from "./Navbar/page";
import Dashboard from "./dashboard/page";
import GitHubFooter from "./GitHubFooter/page";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Dashboard/>
      <GitHubFooter/>
    </>
  );
}
