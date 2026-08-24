"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { questions } from "@/data/questions";
import type { QuestionnaireAnswers } from "@/types/questionnaire";

export default function ProfilePage() {
  const [profileAnswers, setProfileAnswers] =
    useState<QuestionnaireAnswers | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profileAnswers");

    if (savedProfile) {
      try {
        const parsedProfile: QuestionnaireAnswers = JSON.parse(savedProfile);

        setProfileAnswers(parsedProfile);
      } catch (error) {
        console.error("Could not read profile answers:", error);
      }
    }

    setIsLoading(false);
  }, []);

  function getAnswerLabels(questionId: string) {
    if (!profileAnswers) {
      return [];
    }

    const selectedValues = profileAnswers[questionId] ?? [];

    const question = questions.find((item) => item.id === questionId);

    if (!question) {
      return selectedValues;
    }

    return selectedValues.map((value) => {
      const option = question.options.find((item) => item.value === value);

      return option?.label ?? value;
    });
  }

  if (isLoading) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-[#191b1d] text-white">
        <p className="text-white/70">در حال بارگذاری پروفایل...</p>
      </main>
    );
  }

  if (!profileAnswers) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-[#191b1d] px-4 text-white">
        <div className="w-full max-w-lg rounded-[32px] border border-[#b66fd1]/20 bg-[#2a232e] p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b66fd1]/15 text-3xl text-[#d59be8]">
            ✦
          </div>

          <h1 className="mb-3 text-2xl font-bold text-[#ebc6f5]">
            پروفایل استایل شما هنوز کامل نشده
          </h1>

          <p className="mb-7 leading-7 text-white/55">
            برای دریافت پیشنهادهای شخصی‌سازی‌شده، ابتدا اطلاعات استایل خود را
            تکمیل کنید.
          </p>

          <Link
            href="/profile/setup"
            className="inline-flex rounded-full bg-gradient-to-l from-[#71368d] via-[#914ab0] to-[#b05fc9] px-7 py-3 font-bold text-white shadow-[0_10px_30px_rgba(128,62,155,0.3)] transition hover:scale-[1.02] hover:brightness-110"
          >
            تکمیل پروفایل
          </Link>
        </div>
      </main>
    );
  }

  const selectedGender = profileAnswers.gender?.[0];

  const gender = getAnswerLabels("gender");

  const ageGroup = getAnswerLabels("age_group");

  const skinTone = getAnswerLabels("skin_tone");

  const skinUndertone = getAnswerLabels("skin_undertone");

  const femaleBodyShape = getAnswerLabels("female_body_shape");

  const maleBodyShape = getAnswerLabels("male_body_shape");

  const bodyShape =
    femaleBodyShape.length > 0 ? femaleBodyShape : maleBodyShape;

  const favoriteStyles =
    selectedGender === "female"
      ? getAnswerLabels("female_style_preferences")
      : getAnswerLabels("male_style_preferences");

  const favoriteColorPalettes =
    selectedGender === "female"
      ? getAnswerLabels("female_favorite_color_palettes")
      : getAnswerLabels("male_favorite_color_palettes");

  const dislikedColors = getAnswerLabels("colors_disliked");

  return (
    <main
      dir="rtl"
      className="min-h-svh bg-[#191b1d] px-4 py-8 text-white sm:px-6"
    >
      <section className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-4xl italic text-[#ce88e5] transition hover:text-[#e1b0ef] sm:text-5xl"
          >
            Stila
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm text-white/75 transition hover:border-[#b96bd4]/50 hover:bg-[#b96bd4]/10 hover:text-[#e0b0ef]"
          >
            صفحه اصلی
          </Link>
        </header>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#efc9f7] sm:text-4xl">
            پروفایل من
          </h1>
        </div>

        {/* Account section */}
        <section className="mb-8 overflow-hidden rounded-[34px] border border-[#b96bd4]/15 bg-gradient-to-br from-[#29252d] via-[#252428] to-[#212326] shadow-[0_22px_55px_rgba(0,0,0,0.28)]">
          <div className="flex flex-col gap-4 border-b border-white/8 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <h2 className="text-2xl font-bold text-[#e4b7ef]">
                اطلاعات حساب
              </h2>

              <p className="mt-1 text-sm text-white/45">
                اطلاعات پایه‌ای که هنگام ثبت‌نام وارد کرده‌اید
              </p>
            </div>

            <span className="w-fit rounded-full border border-[#c77ddd]/25 bg-[#b96bd4]/10 px-4 py-2 text-sm text-[#dca7ed]">
              حساب کاربری
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AccountItem title="نام" value="بعداً از حساب کاربری" />

              <AccountItem title="نام خانوادگی" value="بعداً از حساب کاربری" />

              <AccountItem title="شماره موبایل" value="بعداً از حساب کاربری" />
            </div>

            <div className="mt-6 rounded-2xl border border-[#b96bd4]/10 bg-[#b96bd4]/5 px-4 py-3">
              <p className="text-xs leading-6 text-white/40">
                بعد از اتصال کامل Frontend و Backend، این اطلاعات مستقیماً از
                حساب کاربری شما خوانده می‌شوند.
              </p>
            </div>
          </div>
        </section>

        {/* Style profile */}
        <section className="overflow-hidden rounded-[36px] border border-[#d49ae6]/20 bg-gradient-to-br from-[#c887df] via-[#bd78d5] to-[#a963c2] text-[#281b2d] shadow-[0_28px_65px_rgba(97,42,121,0.25)]">
          {/* Header */}
          <div className="flex flex-col gap-5 border-b border-[#6f327f]/20 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <h2 className="text-2xl font-bold">پروفایل استایل</h2>

              <p className="mt-1 text-sm text-[#563260]/80">
                ویژگی‌ها و ترجیحاتی که پیشنهادهای استایل بر اساس آن‌ها شخصی‌سازی
                می‌شوند
              </p>
            </div>

            <Link
              href="/profile/setup"
              className="inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-[#633078] px-6 py-3 font-bold text-white shadow-[0_8px_20px_rgba(75,28,91,0.25)] transition hover:scale-[1.02] hover:bg-[#542467]"
            >
              ویرایش پروفایل استایل
            </Link>
          </div>

          <div className="p-6 sm:p-8">
            {/* Personal features */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1.5 rounded-full bg-[#67327d]" />

                <div>
                  <h3 className="text-xl font-bold">ویژگی‌های شخصی</h3>

                  <p className="mt-1 text-sm text-[#5e396a]/75">
                    اطلاعات پایه برای شخصی‌سازی استایل
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ProfileItem title="جنسیت" values={gender} />

                <ProfileItem title="گروه سنی" values={ageGroup} />

                <ProfileItem title="رنگ پوست" values={skinTone} />

                <ProfileItem title="ته‌رنگ پوست" values={skinUndertone} />

                <ProfileItem title="فرم بدن" values={bodyShape} />
              </div>
            </section>

            <div className="my-8 border-t border-[#6c337e]/20" />

            {/* Preferences */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1.5 rounded-full bg-[#67327d]" />

                <div>
                  <h3 className="text-xl font-bold">سلیقه و ترجیحات استایل</h3>

                  <p className="mt-1 text-sm text-[#5e396a]/75">
                    رنگ‌ها و سبک‌هایی که بیشتر به آن‌ها علاقه دارید
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <ProfileItem
                  title="سبک‌های مورد علاقه"
                  values={favoriteStyles}
                />

                <ProfileItem
                  title="خانواده‌های رنگی مورد علاقه"
                  values={favoriteColorPalettes}
                />

                <ProfileItem title="رنگ‌های نامطلوب" values={dislikedColors} />
              </div>
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}

type AccountItemProps = {
  title: string;
  value: string;
};

function AccountItem({ title, value }: AccountItemProps) {
  return (
    <div className="rounded-3xl border border-[#c37bd9]/12 bg-gradient-to-br from-white/[0.07] to-white/[0.035] p-5 transition hover:border-[#c37bd9]/25 hover:bg-white/[0.08]">
      <p className="mb-3 text-sm font-bold text-[#d7a0e7]">{title}</p>

      <p className="text-sm leading-6 text-white/65">{value}</p>
    </div>
  );
}

type ProfileItemProps = {
  title: string;
  values: string[];
};

function ProfileItem({ title, values }: ProfileItemProps) {
  return (
    <div className="min-h-28 rounded-3xl border border-[#72368a]/20 bg-white/20 p-5 shadow-[0_8px_20px_rgba(91,45,105,0.08)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/25">
      <p className="mb-3 text-sm font-bold text-[#62366e]">{title}</p>

      {values.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <span
              key={value}
              className="rounded-full border border-white/40 bg-white/55 px-3 py-1.5 text-sm font-bold text-[#38233f] shadow-sm"
            >
              {value}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#694676]">ثبت نشده</p>
      )}
    </div>
  );
}
