"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
export default function Home() {
  const router = useRouter();
  const { isLoggedIn, isAuthReady } = useAuth();

  function handleStart() {
    if (!isAuthReady) {
      return;
    }

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    router.push("/questions");
  }
  return (
    <main className="min-h-screen bg-[#1c1e1e] text-white">
      {/* Header */}
      <header className="flex h-20 items-center justify-between bg-[#af7fcb] px-6 md:px-12">
        {/* Logo */}
        <Image
          src="/images/logo.png"
          alt="لوگوی Stila"
          width={120}
          height={120}
          priority
          className="w-24 h-auto"
        />

        <h1 className="font-serif text-4xl italic text-[#241b28]">Stila</h1>

        <Link
          href="/login"
          className="rounded-xl bg-[#80479f] px-6 py-3 text-sm text-white transition hover:bg-[#713c91]"
        >
          ورود
        </Link>
      </header>

      {/* Hero section */}
      <section className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-6xl flex-col items-center justify-center px-5 py-10 sm:px-8 md:py-14">
        <div className="flex w-full flex-col items-center gap-10 rounded-[32px] bg-[#cf9be6] px-6 py-8 text-[#241b28] shadow-lg sm:px-10 md:flex-row md:justify-between md:gap-14 md:rounded-[40px] md:px-14 md:py-12">
          {/* Text - سمت راست در دسکتاپ */}
          <div className="w-full flex-1 text-center md:text-right">
            <h2 className="text-2xl font-bold leading-[1.8] sm:text-3xl md:text-4xl">
              بهترین استایل خودت را پیدا کن
            </h2>

            <p className=" text-lg leading-8 text-[#704184] sm:text-xl md:mr-8  md:text-2xl">
              استایلیست شخصی خودت را همیشه همراه داشته باش
            </p>
          </div>

          {/* Image - سمت چپ در دسکتاپ */}
          <div className="flex w-full justify-center md:w-auto md:flex-none">
            <div className="overflow-hidden rounded-[28px] bg-[#c18adb] p-3 shadow-md sm:p-4">
              <Image
                src="/images/home.jpg"
                alt="تصویر دستیار انتخاب استایل"
                width={320}
                height={320}
                priority
                className="h-56 w-56 rounded-[20px] object-cover sm:h-64 sm:w-64 md:h-60 md:w-60 lg:h-64 lg:w-64"
              />
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-10 text-center md:mt-12">
          <p className="mb-7 text-xl text-[#d09ae8] sm:text-2xl">
            آماده‌ای برای اوت‌فیت امروز؟
          </p>

          <button
            type="button"
            onClick={handleStart}
            disabled={!isAuthReady}
            className="inline-flex min-w-36 items-center justify-center rounded-full bg-[#9b5fbd] px-10 py-4 font-medium text-white transition duration-200 hover:scale-105 hover:bg-[#ad6dcc] disabled:cursor-not-allowed disabled:opacity-60"
          >
            شروع
          </button>
        </div>
      </section>
    </main>
  );
}
