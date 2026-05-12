    import { useState } from "react";
    import { Mail, FileText, Pencil, Calendar } from "lucide-react";
    import { Link } from "react-router-dom";
import { useAuth } from "../../contextApi/UserProvider";



    export default function Profile() {
    const [imgError, setImgError] = useState(false);
    const {user} = useAuth();


    return (
        <div className="min-h-screen bg-[#080c14] font-['Sora',sans-serif] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Blobs */}
        <div className="absolute w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)", top: "-120px", right: "-100px" }} />
        <div className="absolute w-[360px] h-[360px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", bottom: "-80px", left: "-80px" }} />

        <div className="w-full max-w-md relative z-10 rounded-2xl p-10 backdrop-blur-xl"
            style={{ background: "rgba(15,20,30,0.85)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 64px rgba(0,0,0,0.5)", animation: "fadeUp 0.5s ease forwards" }}>

            {/* ── Avatar ── */}
            <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
                {/* Gradient ring */}
                <div className="absolute -inset-[3px] rounded-full"
                style={{ background: "linear-gradient(135deg, #f97316, #6366f1)", zIndex: 0 }} />
                {/* Image or initials */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden z-10 bg-[#0d1220]">
                    <img
                    src={user.profilePicture}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                    />
                </div>
                {/* Online dot */}
                <span className="absolute bottom-1 right-1 z-20 w-4 h-4 rounded-full bg-emerald-400 ring-2 ring-[#080c14]" />
            </div>

            <h1 className="text-white text-2xl font-bold tracking-tight">{user.fullName}</h1>
            <div className="flex items-center gap-1.5 mt-1.5 text-slate-500 text-xs">
                <Calendar size={12} />
                <span>Joined {user.createdAt}</span>
            </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Info cards */}
            <div className="flex flex-col gap-4 mb-8">
            {/* Email */}
            <div className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)" }}>
                <Mail size={15} color="#f97316" />
                </div>
                <div className="min-w-0">
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-0.5">Email</p>
                <p className="text-slate-200 text-sm truncate">{user.email}</p>
                </div>
            </div>

            {/* Bio */}
            <div className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <FileText size={15} color="#6366f1" />
                </div>
                <div>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-0.5">Bio</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                    {user.bio || <span className="text-slate-600 italic">No bio added yet.</span>}
                </p>
                </div>
            </div>
            </div>

            {/* Edit Button */}
            <Link to='/edit-profile'
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" }}>
            <Pencil size={16} />
                Edit Profile
            </Link>
        </div>

        </div>
    );
    }