'use client';
import { ChevronRight } from "lucide-react";
import { SurveyCategory } from '@/types';
import { useCallback } from "react";

interface Props {
  category: SurveyCategory;
}

export function SurveyCard({ category }: Props) {

  const handleOpenSurvey = useCallback(() => {
    console.log("trying to open . . . .")
    window.open(category.formUrl, "_blank", "noopener,noreferrer");
  }, [category.formUrl]);



  return (
    <button
      type="button"
      onClick={handleOpenSurvey}
      aria-label={`Open survey for ${category.title}`}
      className="
        relative w-full text-left rounded-2xl
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        transition-transform
        active:scale-[0.96]
        cursor-pointer
      "
    >
      {/* Visual glow (NON-interactive) */}
      <div
        aria-hidden
        className="
           absolute inset-0 rounded-2xl
          bg-gradient-to-r from-blue-500/30 to-cyan-500/30
          blur-xl opacity-40
        "
      />

      {/* Card */}
      <div
        className="
          relative h-full p-8
          bg-gray-950 rounded-2xl
          border border-gray-800
          transition-all duration-300
          hover:border-transparent
          hover:scale-[1.03]
          flex flex-col
        "
      >
        <div className="text-6xl mb-4">{category.icon}</div>

        <h3 className="text-2xl font-bold text-white mb-1">
          {category.title}
        </h3>

        <p className="text-sm text-purple-400 mb-4">
          {category.subtitle}
        </p>

        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          {category.description}
        </p>

        <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-white">
          Take Survey
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}
