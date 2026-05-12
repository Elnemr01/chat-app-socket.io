    import { useState } from "react";
    import { useFormik } from "formik";
    import * as Yup from "yup";
    import { useMutation } from "@tanstack/react-query";
    import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Loader2 } from "lucide-react";
    import toast from "react-hot-toast";
    import client from "./../../axiosGlobals/axiosGlobals";
    import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contextApi/UserProvider";


    // ─── Validation Schema ───────────────────────────────────────────────────────
    const registerSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });

    // ─── Component ───────────────────────────────────────────────────────────────
    export default function Register({ onNavigateToLogin }) {
    const [showPassword, setShowPassword] = useState(false);
        const navigate =useNavigate();
        const {setUser,socketConnection}=useAuth();



    const {mutate: register,isPending} = useMutation({
        mutationKey: ["register"],
        mutationFn: async (values) => await client.post('/api/auth/register',{
            fullName: values.name,
            email: values.email,
            password: values.password,
        }),
        onSuccess: (data) => {
            toast.success("Register successful");
            localStorage.setItem("chatAppUser", JSON.stringify(data.data.user));
            localStorage.setItem("chatAppUserToken", data.data.token);
            setUser(data.data.user);
            socketConnection(data.data.user);
            navigate('/');
        },
        onError: (error) => {
            toast.error("Registration failed");
            // console.error("Registration error:", error.message);
        },
    });

    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: registerSchema,
        onSubmit: (values) => {
        register(values);
        },
    });

    return (
        <div style={styles.page}>
        {/* Background shapes */}
        <div style={styles.blob1} />
        <div style={styles.blob2} />
        <div style={styles.blob3} />

        <div style={styles.card}>
            {/* Header */}
            <div style={styles.header}>
            <div style={styles.logoRing}>
                <User size={22} color="#6366f1" strokeWidth={2.5} />
            </div>
            <h1 style={styles.title}>Create account</h1>
            <p style={styles.subtitle}>Join us today, it's free</p>
            </div>


            {/* Form */}
            <form onSubmit={formik.handleSubmit} style={styles.form} noValidate>
            {/* Name */}
            <div style={styles.fieldGroup}>
                <label style={styles.label} htmlFor="name">Full Name</label>
                <div style={styles.inputWrapper}>
                <User
                    size={17}
                    color={formik.touched.name && formik.errors.name ? "#ef4444" : "#94a3b8"}
                    style={styles.inputIcon}
                />
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    style={{
                    ...styles.input,
                    borderColor:
                        formik.touched.name && formik.errors.name
                        ? "#ef4444"
                        : "rgba(255,255,255,0.1)",
                    }}
                    {...formik.getFieldProps("name")}
                />
                </div>
                {formik.touched.name && formik.errors.name && (
                <span style={styles.errorText}>{formik.errors.name}</span>
                )}
            </div>

            {/* Email */}
            <div style={styles.fieldGroup}>
                <label style={styles.label} htmlFor="email">Email</label>
                <div style={styles.inputWrapper}>
                <Mail
                    size={17}
                    color={formik.touched.email && formik.errors.email ? "#ef4444" : "#94a3b8"}
                    style={styles.inputIcon}
                />
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    style={{
                    ...styles.input,
                    borderColor:
                        formik.touched.email && formik.errors.email
                        ? "#ef4444"
                        : "rgba(255,255,255,0.1)",
                    }}
                    {...formik.getFieldProps("email")}
                />
                </div>
                {formik.touched.email && formik.errors.email && (
                <span style={styles.errorText}>{formik.errors.email}</span>
                )}
            </div>

            {/* Password */}
            <div style={styles.fieldGroup}>
                <label style={styles.label} htmlFor="password">Password</label>
                <div style={styles.inputWrapper}>
                <Lock
                    size={17}
                    color={formik.touched.password && formik.errors.password ? "#ef4444" : "#94a3b8"}
                    style={styles.inputIcon}
                />
                <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    style={{
                    ...styles.input,
                    paddingRight: "44px",
                    borderColor:
                        formik.touched.password && formik.errors.password
                        ? "#ef4444"
                        : "rgba(255,255,255,0.1)",
                    }}
                    {...formik.getFieldProps("password")}
                />
                <button
                    type="button"
                    style={styles.eyeBtn}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label="Toggle password visibility"
                >
                    {showPassword ? (
                    <EyeOff size={16} color="#94a3b8" />
                    ) : (
                    <Eye size={16} color="#94a3b8" />
                    )}
                </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                <span style={styles.errorText}>{formik.errors.password}</span>
                )}

                {/* Password strength hint */}
                
            </div>

            {/* Submit */}
            <button
                type="submit"
                style={styles.submitBtn}
                disabled={isPending}
            >
                {isPending ? (
                <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                <>
                    Create Account <ArrowRight size={17} style={{ marginLeft: 6 }} />
                </>
                )}
            </button>
            </form>

            {/* Footer */}
            <p style={styles.footerText}>
            Already have an account?{" "}
            <Link
                style={styles.linkBtn}
                to='/login'
            >
                Sign in
            </Link>
            </p>
        </div>

        </div>
    );
    }

    // ─── Styles ──────────────────────────────────────────────────────────────────
    const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#080c14",
        fontFamily: "'Sora', sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "24px",
    },
    blob1: {
        position: "absolute",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%)",
        top: "-140px",
        left: "-100px",
        pointerEvents: "none",
    },
    blob2: {
        position: "absolute",
        width: 360,
        height: 360,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)",
        bottom: "-80px",
        right: "-80px",
        pointerEvents: "none",
    },
    blob3: {
        position: "absolute",
        width: 240,
        height: 240,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
        bottom: "30%",
        left: "10%",
        pointerEvents: "none",
    },
    card: {
        width: "100%",
        maxWidth: 420,
        background: "rgba(15,20,30,0.85)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: "40px 36px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        animation: "fadeUp 0.5s ease forwards",
        position: "relative",
        zIndex: 1,
    },
    header: {
        textAlign: "center",
        marginBottom: 32,
    },
    logoRing: {
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "rgba(99,102,241,0.12)",
        border: "1.5px solid rgba(99,102,241,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 16px",
    },
    title: {
        color: "#f8fafc",
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: "-0.5px",
        marginBottom: 6,
    },
    subtitle: {
        color: "#64748b",
        fontSize: 14,
        fontWeight: 400,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
    },
    fieldGroup: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
    },
    label: {
        color: "#94a3b8",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.3px",
    },
    inputWrapper: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    inputIcon: {
        position: "absolute",
        left: 14,
        pointerEvents: "none",
    },
    input: {
        width: "100%",
        padding: "11px 14px 11px 42px",
        background: "rgba(255,255,255,0.04)",
        border: "1.5px solid rgba(255,255,255,0.1)",
        borderRadius: 10,
        color: "#f1f5f9",
        fontSize: 14,
        fontFamily: "'Sora', sans-serif",
        transition: "border-color 0.2s, box-shadow 0.2s",
    },
    eyeBtn: {
        position: "absolute",
        right: 13,
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: 2,
    },
    strengthBar: {
        display: "flex",
        gap: 4,
        marginTop: 6,
    },
    strengthSegment: {
        flex: 1,
        height: 3,
        borderRadius: 4,
        transition: "background 0.3s",
    },
    submitBtn: {
        width: "100%",
        padding: "13px",
        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        border: "none",
        borderRadius: 10,
        color: "#fff",
        fontSize: 15,
        fontWeight: 600,
        fontFamily: "'Sora', sans-serif",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "filter 0.2s, transform 0.1s",
        marginTop: 4,
        letterSpacing: "0.2px",
    },
    errorText: {
        color: "#ef4444",
        fontSize: 12,
        marginTop: 2,
    },
    errorBanner: {
        background: "rgba(239,68,68,0.1)",
        border: "1px solid rgba(239,68,68,0.3)",
        color: "#fca5a5",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
        marginBottom: 16,
        textAlign: "center",
    },
    successBanner: {
        background: "rgba(34,197,94,0.1)",
        border: "1px solid rgba(34,197,94,0.3)",
        color: "#86efac",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
        marginBottom: 16,
        textAlign: "center",
    },
    footerText: {
        textAlign: "center",
        color: "#475569",
        fontSize: 13,
        marginTop: 24,
    },
    linkBtn: {
        background: "none",
        border: "none",
        color: "#6366f1",
        fontSize: 13,
        fontFamily: "'Sora', sans-serif",
        fontWeight: 600,
        cursor: "pointer",
        padding: 0,
    },
    };