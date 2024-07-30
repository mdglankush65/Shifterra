"use client";
import "./Navbar.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import kraftbaseStore from "../store";

const Navbar = () => {
    const user = kraftbaseStore(state => state.user);
    const setUser = kraftbaseStore(state => state.setUser);
    const router = useRouter();

    const onLogout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logged out successfully!");
            router.push('/login');
            setUser(null);
        } catch (error: any) {
            console.log({ error: error.message }, { status: 500 });
        }
    };

    return (
        <div className="nb-container">
            <p className="nb-title">Shifterra</p>
            <div className="nb-btn-group flex">
                <button className={`nb-btn nb-selected-btn`} onClick={onLogout}>
                    Log out
                </button>
                <div className="ml-1 font-extrabold text-2xl px-4 pt-2 align-middle bg-slate-300 border rounded-3xl">{user?.username.toUpperCase().charAt(0)}</div>
            </div>
        </div>
    );
};

export default Navbar;