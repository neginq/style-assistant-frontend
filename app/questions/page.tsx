"use client";

import { useState } from "react";
import { questions } from "@/data/questions";
import QuestionCard from "@/components/questionnaire/QuestionCard";
import QuestionnaireLayout from "@/components/questionnaire/QuestionnaireLayout";
import type { QuestionnaireAnswers } from "@/types/questionnaire";

const TOTAL_STAGES = 4;

const stageTitles = {
  1: "درباره شما",
  2: "استایل موردنیاز",
  3: "رنگ و سلیقه",
  4: "کمد شما",
};

export default function QuestionsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});

  // جنسیتی که کاربر در سؤال اول انتخاب کرده
  const selectedGender = answers.gender?.[0];

  // فقط سؤال‌های مشترک + سؤال‌های مربوط به جنسیت انتخاب‌شده
  const visibleQuestions = questions.filter((question) => {
    if (question.gender === "both") {
      return true;
    }

    if (!selectedGender) {
      return false;
    }

    return question.gender === selectedGender;
  });

  const currentQuestion = visibleQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return null;
  }

  const selectedValues = answers[currentQuestion.id] ?? [];

  const isFirstQuestion = currentQuestionIndex === 0;

  const isLastQuestion = currentQuestionIndex === visibleQuestions.length - 1;

  const currentStage = currentQuestion.stage;

  const stageTitle = stageTitles[currentStage];

  // اگر سؤال اختیاری باشد، بدون جواب هم می‌تواند جلو برود
  const canGoNext = !currentQuestion.required || selectedValues.length > 0;

  const handleSelectOption = (value: string) => {
    setAnswers((previousAnswers) => {
      const previousSelectedValues = previousAnswers[currentQuestion.id] ?? [];

      const isMultipleChoice = currentQuestion.type === "multiple";

      // سوال چندانتخابی
      if (isMultipleChoice) {
        const optionAlreadySelected = previousSelectedValues.includes(value);

        if (optionAlreadySelected) {
          return {
            ...previousAnswers,
            [currentQuestion.id]: previousSelectedValues.filter(
              (selectedValue) => selectedValue !== value,
            ),
          };
        }

        // اگر محدودیت تعداد انتخاب داریم
        if (
          currentQuestion.maxSelections &&
          previousSelectedValues.length >= currentQuestion.maxSelections
        ) {
          return previousAnswers;
        }

        return {
          ...previousAnswers,
          [currentQuestion.id]: [...previousSelectedValues, value],
        };
      }

      // سوال تک‌انتخابی
      const updatedAnswers = {
        ...previousAnswers,
        [currentQuestion.id]: [value],
      };

      // اگر جنسیت عوض شد،
      // پاسخ احتمالی قبلی مربوط به فرم بدن حذف شود
      if (currentQuestion.id === "gender") {
        delete updatedAnswers.female_body_shape;
        delete updatedAnswers.male_body_shape;
      }

      return updatedAnswers;
    });
  };

  const handlePrevious = () => {
    if (isFirstQuestion) return;

    setCurrentQuestionIndex((previousIndex) => previousIndex - 1);
  };

  const handleNext = () => {
    if (!canGoNext) return;

    if (isLastQuestion) {
      console.log("Questionnaire answers:", answers);

      alert("پاسخ‌های شما با موفقیت ثبت شدند.");

      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
  };

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
    >
      <QuestionCard
        question={currentQuestion}
        selectedValues={selectedValues}
        onSelectOption={handleSelectOption}
      />
    </QuestionnaireLayout>
  );
}
