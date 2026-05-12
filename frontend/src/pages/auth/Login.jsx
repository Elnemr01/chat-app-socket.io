    import { useState } from "react";
    import { useFormik } from "formik";
    import * as Yup from "yup";
    import { useMutation } from "@tanstack/react-query";
    import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import client from "../../axiosGlobals/axiosGlobals";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../contextApi/UserProvider";


    // ─── Validation Schema ───────────────────────────────────────────────────────
    const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    // ─── Component ───────────────────────────────────────────────────────────────
        export default function Login({ onNavigateToRegister }) {
        const [showPassword, setShowPassword] = useState(false);
        const navigate= useNavigate();
        const {setUser,setSocket}=useAuth();

        const {mutate: login , isPending} = useMutation({
            mutationKey: ["login"],
            mutationFn: async (values) => await client.post('/api/auth/login',values),
            onSuccess: (data) => {
                console.log(data)
                toast.success("Login successful");
                localStorage.setItem("chatAppUser", JSON.stringify(data.data.user));
                localStorage.setItem("chatAppUserToken", data.data.token);
                navigate("/");
                setUser(data.data.user);
            },
            onError: (error) => {
            toast.error("Login failed");
            },
        });

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            login(values);
        },
    });

    return (
        <div style={styles.page}>
        {/* Background shapes */}
        <div style={styles.blob1} />
        <div style={styles.blob2} />

        <div style={styles.card}>
            {/* Header */}
            <div style={styles.header}>
            <div style={styles.logoRing}>
                <Lock size={22} color="#f97316" strokeWidth={2.5} />
            </div>
            <h1 style={styles.title}>Welcome back</h1>
            <p style={styles.subtitle}>Sign in to your account</p>
            </div>


            {/* Form */}
            <form onSubmit={formik.handleSubmit} style={styles.form} noValidate>
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
                    Sign In <ArrowRight size={17} style={{ marginLeft: 6 }} />
                </>
                )}
            </button>
            </form>

            {/* Footer */}
            <p style={styles.footerText}>
            Don't have an account?{" "}
            <Link
                style={styles.linkBtn}
                to={'/register'}
            >
                Create one
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
        width: 480,
        height: 480,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
        top: "-120px",
        right: "-100px",
        pointerEvents: "none",
    },
    blob2: {
        position: "absolute",
        width: 360,
        height: 360,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        bottom: "-80px",
        left: "-80px",
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
        background: "rgba(249,115,22,0.12)",
        border: "1.5px solid rgba(249,115,22,0.35)",
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
    submitBtn: {
        width: "100%",
        padding: "13px",
        background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
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
        color: "#f97316",
        fontSize: 13,
        fontFamily: "'Sora', sans-serif",
        fontWeight: 600,
        cursor: "pointer",
        padding: 0,
    },
    };