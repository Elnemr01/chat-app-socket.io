    import { useState, useRef } from "react";
    import { useFormik } from "formik";
    import * as Yup from "yup";
    import { useMutation } from "@tanstack/react-query";
    import { ArrowLeft, User, FileText, Loader2, CheckCircle2, Camera, X, ChessKing } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import client from "../../axiosGlobals/axiosGlobals";
import { useAuth } from "../../contextApi/UserProvider";
import { Link } from "react-router-dom";

    // ─── Validation ──────────────────────────────────────────────────────────────
    const editSchema = Yup.object({
        FullName: Yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
        bio: Yup.string().max(200, "Bio can't exceed 200 characters"),
    });

    // ─── Component ───────────────────────────────────────────────────────────────
    export default function EditProfile() {
    const fileInputRef = useRef(null);

    const navigate=useNavigate();
    const {user,setUser}=useAuth();
    const [previewUrl, setPreviewUrl] = useState(user?.profilePicture || "");
    
    
    
    
    const mutation = useMutation({
        mutationKey: ["updateProfile"],
        mutationFn: async (formData) => await client.put('/api/auth/update-profile',formData,{
            headers : {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${localStorage.getItem("chatAppUserToken")}`,
            }
        }),
        onSuccess: (data) => {
            toast.success("Profile updated successfully");
            setUser(data.data.user);
            navigate("/profile");
        },
        onError :()=> {
            toast.error("Failed to update profile. Please try again.");
        }
    });


    const formik = useFormik({
        initialValues: { 
            fullName: user?.fullName || "",
            bio: user?.bio || "",
            profilePicture: user?.profilePicture || "" },
        // validationSchema: editSchema,
        onSubmit: (values) => {
                let formData = new FormData();
                formData.append("fullName", values.fullName);
                formData.append("bio", values.bio);
                if (fileInputRef.current?.files[0]) {
                    formData.append("profilePicture", fileInputRef.current.files[0]);
                }
                mutation.mutate(formData);
            },
        });

    
    const bioLength = formik.values.bio.length;

    return (
        <div className="min-h-screen bg-[#080c14] font-['Sora',sans-serif] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Blobs */}
        <div className="absolute w-120 h-120 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)", top: "-140px", left: "-100px" }} />
        <div className="absolute w-90 h-90 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(249,115,22,0.09) 0%, transparent 70%)", bottom: "-80px", right: "-80px" }} />

        <div className="w-full max-w-md relative z-10 rounded-2xl p-10 backdrop-blur-xl"
            style={{ background: "rgba(15,20,30,0.85)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 64px rgba(0,0,0,0.5)", animation: "fadeUp 0.5s ease forwards" }}>

            {/* Back + Header */}
            <div className="flex items-center gap-3 mb-8">
            <Link to={'/profile'} aria-label="Go back"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:brightness-125"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <ArrowLeft size={17} color="#94a3b8" />
            </Link>
            <div>
                <h1 className="text-white text-xl font-bold tracking-tight leading-tight">Edit Profile</h1>
                <p className="text-slate-500 text-xs mt-0.5">Update your photo, name and bio</p>
            </div>
            </div>

            {/* ── Avatar Upload ── */}
            <div className="flex flex-col items-center mb-8">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                {/* Gradient ring */}
                <div className="absolute -inset-0.75 rounded-full"
                style={{ background: "linear-gradient(135deg, #f97316, #6366f1)", zIndex: 0 }} />

                {/* Avatar */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden z-10 bg-[#0d1220]">
                    <img src={previewUrl} alt="avatar preview" loading="lazy"
                    className="w-full h-full object-cover"
                    />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: "rgba(0,0,0,0.58)" }}>
                    <Camera size={20} color="#fff" />
                    <span className="text-white text-[10px] font-semibold">Change</span>
                </div>
                </div>
            </div>

            <button type="button" onClick={() => fileInputRef.current?.click()}
                className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-150 font-medium">
                {formik.values.profilePicture ? "Change photo" : "Upload photo"}
            </button>
            <p className="text-slate-600 text-[11px] mt-1">JPG, PNG or WEBP · max 5MB</p>

            <input ref={fileInputRef} type="file" name="profilePicture" accept="image/jpeg,image/png,image/webp"
                className="hidden" onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    setPreviewUrl(URL.createObjectURL(file));
                }
            }} />
            </div>

            

            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5" noValidate>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-slate-400 text-xs font-medium uppercase tracking-wider">Full Name</label>
                <div className="relative flex items-center">
                <User size={16} className="absolute left-3.5 pointer-events-none"
                    color={formik.touched.fullName && formik.errors.fullName ? "#ef4444" : "#475569"} />
                <input id="fullName" name="fullName" type="text" placeholder="Your full Name" value={formik.values.fullName}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-100 text-sm placeholder-slate-600 outline-none transition-all duration-200"
                    style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${formik.touched.fullName && formik.errors.fullName ? "#ef4444" : "rgba(255,255,255,0.09)"}`,
                    fontFamily: "'Sora', sans-serif",
                    }}
                    onBlur={(e) => {
                    formik.handleBlur(e);
                    e.target.style.boxShadow = "none";
                    e.target.style.borderColor = formik.errors.fullName ? "#ef4444" : "rgba(255,255,255,0.09)";
                    }}
                    onChange={formik.handleChange} />
                </div>
                {formik.touched.fullName && formik.errors.fullName && (
                <span className="text-red-400 text-xs">{formik.errors.fullName}</span>
                )}
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                <label htmlFor="bio" className="text-slate-400 text-xs font-medium uppercase tracking-wider">Bio</label>
                <span className={`text-xs ${bioLength > 180 ? "text-orange-400" : "text-slate-600"}`}>{bioLength}/200</span>
                </div>
                <div className="relative flex items-start">
                <FileText size={16} className="absolute left-3.5 top-3.5 pointer-events-none"
                    color={formik.touched.bio && formik.errors.bio ? "#ef4444" : "#475569"} />
                <textarea id="bio" name="bio" rows={4} placeholder="Tell people a little about yourself..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-100 text-sm placeholder-slate-600 outline-none resize-none transition-all duration-200"
                    style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${formik.touched.bio && formik.errors.bio ? "#ef4444" : "rgba(255,255,255,0.09)"}`,
                    fontFamily: "'Sora', sans-serif",
                    lineHeight: "1.6",
                    }}
                    value={formik.values.bio}
                    onChange={formik.handleChange} />
                </div>
                {formik.touched.bio && formik.errors.bio && (
                <span className="text-red-400 text-xs">{formik.errors.bio}</span>
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-1">
                <Link to="/profile"
                className="flex-1 text-center py-3.5 rounded-xl text-slate-400 text-sm font-semibold transition-all duration-200 hover:text-white hover:brightness-125"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                Cancel
                </Link>
                <button type="submit" disabled={mutation.isPending}
                className="flex-2 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" }}>
                {mutation.isPending
                    ? <Loader2 size={17} style={{ animation: "spin 1s linear infinite" }} />
                    : "Save Changes"}
                </button>
            </div>
            </form>
        </div>

        </div>
    );
    }