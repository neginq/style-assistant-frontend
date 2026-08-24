"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { questions } from "@/data/questions";

import QuestionCard from "@/components/questionnaire/QuestionCard";
import QuestionnaireLayout from "@/components/questionnaire/QuestionnaireLayout";

import type { QuestionnaireAnswers } from "@/types/questionnaire";

export default function ProfileSetupPage() {
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});

  /*
    اگر قبلاً پروفایل تکمیل شده باشد،
    جواب‌های قبلی برای حالت ویرایش خوانده می‌شوند.
  */
  useEffect(() => {
    const savedProfile = localStorage.getItem("profileAnswers");

    if (!savedProfile) {
      return;
    }

    try {
      const parsedProfile: QuestionnaireAnswers = JSON.parse(savedProfile);

      setAnswers(parsedProfile);
    } catch (error) {
      console.error("Could not load saved profile:", error);
    }
  }, []);

  const selectedGender = answers.gender?.[0];

  const profileQuestions = questions.filter((question) => {
    if (question.scope !== "profile") {
      return false;
    }

    if (question.gender === "both") {
      return true;
    }

    if (!selectedGender) {
      return false;
    }

    return question.gender === selectedGender;
  });

  const currentQuestion = profileQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return null;
  }

  const selectedValues = answers[currentQuestion.id] ?? [];

  const isFirstQuestion = currentQuestionIndex === 0;

  const isLastQuestion = currentQuestionIndex === profileQuestions.length - 1;

  const canGoNext = !currentQuestion.required || selectedValues.length > 0;

  function handleSelectOption(value: string) {
    setAnswers((previousAnswers) => {
      const previousSelectedValues = previousAnswers[currentQuestion.id] ?? [];

      const isMultipleChoice = currentQuestion.type === "multiple";

      // -------------------------
      // سوال چندانتخابی
      // -------------------------
      if (isMultipleChoice) {
        const selectedOption = currentQuestion.options.find(
          (option) => option.value === value,
        );

        // مثل "محدودیتی ندارم"
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

        // اگر دوباره کلیک شد، حذف شود
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
      // سوال تک‌انتخابی
      // -------------------------

      const updatedAnswers = {
        ...previousAnswers,
        [currentQuestion.id]: [value],
      };

      /*
        اگر جنسیت عوض شود،
        داده‌های مربوط به جنسیت قبلی حذف می‌شوند.
      */
      if (currentQuestion.id === "gender") {
        const newGender = value;

        questions.forEach((question) => {
          if (question.gender !== "both" && question.gender !== newGender) {
            delete updatedAnswers[question.id];
          }
        });

        /*
          چون تعداد و مسیر سؤال‌های جنسیتی ممکن است
          بعد از تغییر gender تغییر کند،
          از سؤال اول دوباره جلو می‌رویم.
        */
      }

      return updatedAnswers;
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
        فعلاً ذخیره موقت در فرانت.
        بعداً PATCH /user/profile جایگزین این قسمت می‌شود.
      */
      localStorage.setItem("profileAnswers", JSON.stringify(answers));

      console.log("Saved profile answers:", answers);

      router.push("/profile");

      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
  }

  return (
    <QuestionnaireLayout
      currentQuestion={currentQuestionIndex + 1}
      totalQuestions={profileQuestions.length}
      currentStage={1}
      totalStages={1}
      stageTitle="تکمیل پروفایل استایل"
      isFirstQuestion={isFirstQuestion}
      isLastQuestion={isLastQuestion}
      canGoNext={canGoNext}
      onPrevious={handlePrevious}
      onNext={handleNext}
      finalButtonText="تکمیل پروفایل"
      showStageInfo={false}
    >
      <QuestionCard
        question={currentQuestion}
        selectedValues={selectedValues}
        onSelectOption={handleSelectOption}
      />
    </QuestionnaireLayout>
  );
}
