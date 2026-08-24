"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { questions } from "@/data/questions";

import QuestionCard from "@/components/questionnaire/QuestionCard";
import QuestionnaireLayout from "@/components/questionnaire/QuestionnaireLayout";

import type { QuestionnaireAnswers } from "@/types/questionnaire";

const TOTAL_STAGES = 3;

const stageTitles = {
  1: "نیاز امروز",
  2: "کمد شما",
  3: "تنظیم پیشنهاد",
};

export default function QuestionsPage() {
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});

  const [profileAnswers, setProfileAnswers] =
    useState<QuestionnaireAnswers | null>(null);

  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  /*
    فعلاً پروفایل از localStorage خوانده می‌شود.
    بعداً GET /user/profile جایگزین این قسمت خواهد شد.
  */
  useEffect(() => {
    const savedProfile = localStorage.getItem("profileAnswers");

    if (!savedProfile) {
      router.replace("/profile/setup");
      return;
    }

    try {
      const parsedProfile: QuestionnaireAnswers = JSON.parse(savedProfile);

      setProfileAnswers(parsedProfile);
    } catch (error) {
      console.error("Could not read profile answers:", error);

      router.replace("/profile/setup");
      return;
    }

    setIsLoadingProfile(false);
  }, [router]);

  const selectedGender = profileAnswers?.gender?.[0];

  /*
    فقط سؤال‌های مربوط به درخواست روزانه
    + سؤال‌های مشترک
    + سؤال‌های مربوط به جنسیت ذخیره‌شده در پروفایل
  */
  const visibleQuestions = useMemo(() => {
    if (!selectedGender) {
      return [];
    }

    return questions.filter((question) => {
      if (question.scope !== "request") {
        return false;
      }

      if (question.gender === "both") {
        return true;
      }

      return question.gender === selectedGender;
    });
  }, [selectedGender]);

  /*
    چون stageهای اصلی questions.ts قبلاً 2 تا 4 بودند،
    اینجا برای Questionnaire جدید به 3 مرحله تبدیلشان می‌کنیم.
  */
  function getRequestStage(questionId: string) {
    // مرحله 1: نیاز امروز
    if (
      questionId === "occasion" ||
      questionId === "season" ||
      questionId === "female_fit_preference" ||
      questionId === "male_fit_preference" ||
      questionId === "female_coverage_preference" ||
      questionId === "male_formality_level"
    ) {
      return 1;
    }

    // مرحله 2: کمد شما
    if (
      questionId === "female_wardrobe_palette" ||
      questionId === "male_wardrobe_palette" ||
      questionId === "female_wardrobe_items" ||
      questionId === "male_wardrobe_items"
    ) {
      return 2;
    }

    // مرحله 3: تنظیم پیشنهاد
    if (
      questionId === "female_exploration_level" ||
      questionId === "male_exploration_level"
    ) {
      return 3;
    }

    return 1;
  }

  if (isLoadingProfile) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-[#1c1e1e] text-white">
        <p className="text-white/70">در حال آماده‌سازی پرسشنامه...</p>
      </main>
    );
  }

  if (!profileAnswers) {
    return null;
  }

  const currentQuestion = visibleQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return null;
  }

  const selectedValues = answers[currentQuestion.id] ?? [];

  const isFirstQuestion = currentQuestionIndex === 0;

  const isLastQuestion = currentQuestionIndex === visibleQuestions.length - 1;

  const currentStage = getRequestStage(currentQuestion.id);

  const stageTitle = stageTitles[currentStage as keyof typeof stageTitles];

  const canGoNext = !currentQuestion.required || selectedValues.length > 0;

  function handleSelectOption(value: string) {
    setAnswers((previousAnswers) => {
      const previousSelectedValues = previousAnswers[currentQuestion.id] ?? [];

      const isMultipleChoice = currentQuestion.type === "multiple";

      // -------------------------
      // سؤال چندانتخابی
      // -------------------------
      if (isMultipleChoice) {
        const selectedOption = currentQuestion.options.find(
          (option) => option.value === value,
        );

        // گزینه exclusive
        if (selectedOption?.exclusive) {
          return {
            ...previousAnswers,
            [currentQuestion.id]: [value],
          };
        }

        // حذف گزینه exclusive قبلی
        const previousWithoutExclusive = previousSelectedValues.filter(
          (selectedValue) => {
            const option = currentQuestion.options.find(
              (item) => item.value === selectedValue,
            );

            return !option?.exclusive;
          },
        );

        const optionAlreadySelected = previousWithoutExclusive.includes(value);

        // حذف انتخاب قبلی
        if (optionAlreadySelected) {
          return {
            ...previousAnswers,

            [currentQuestion.id]: previousWithoutExclusive.filter(
              (selectedValue) => selectedValue !== value,
            ),
          };
        }

        // محدودیت تعداد انتخاب
        if (
          currentQuestion.maxSelections &&
          previousWithoutExclusive.length >= currentQuestion.maxSelections
        ) {
          return previousAnswers;
        }

        return {
          ...previousAnswers,

          [currentQuestion.id]: [...previousWithoutExclusive, value],
        };
      }

      // -------------------------
      // سؤال تک‌انتخابی
      // -------------------------
      return {
        ...previousAnswers,
        [currentQuestion.id]: [value],
      };
    });
  }

  function handlePrevious() {
    if (isFirstQuestion) {
      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex - 1);
  }

  function handleNext() {
    if (!canGoNext) {
      return;
    }

    if (isLastQuestion) {
      /*
        فعلاً خروجی request را فقط ذخیره می‌کنیم.
        در مرحله 9 و 10 این قسمت به mapper و POST /recommend وصل می‌شود.
      */
      localStorage.setItem("requestAnswers", JSON.stringify(answers));

      console.log("Recommendation request answers:", answers);

      alert("اطلاعات درخواست استایل آماده شده است.");

      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
  }

  return (
    <QuestionnaireLayout
      currentQuestion={currentQuestionIndex + 1}
      totalQuestions={visibleQuestions.length}
      currentStage={currentStage}
      totalStages={TOTAL_STAGES}
      stageTitle={stageTitle}
      isFirstQuestion={isFirstQuestion}
      isLastQuestion={isLastQuestion}
      canGoNext={canGoNext}
      onPrevious={handlePrevious}
      onNext={handleNext}
      finalButtonText="مشاهده پیشنهاد"
      showStageInfo={true}
    >
      <QuestionCard
        question={currentQuestion}
        selectedValues={selectedValues}
        onSelectOption={handleSelectOption}
      />
    </QuestionnaireLayout>
  );
}
