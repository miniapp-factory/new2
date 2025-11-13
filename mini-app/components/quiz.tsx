"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import Share from "./share";

type Question = {
  text: string;
  options: { label: string; princess: string }[];
};

const questions: Question[] = [
  {
    text: "What is your favorite type of adventure?",
    options: [
      { label: "A magical journey", princess: "Cinderella" },
      { label: "A daring rescue", princess: "Belle" },
      { label: "A sea voyage", princess: "Ariel" },
      { label: "A quest to find a hidden treasure", princess: "Rapunzel" },
      { label: "A mission to protect your people", princess: "Mulan" },
    ],
  },
  {
    text: "Which trait describes you best?",
    options: [
      { label: "Kind and patient", princess: "Cinderella" },
      { label: "Intelligent and curious", princess: "Belle" },
      { label: "Free-spirited and adventurous", princess: "Ariel" },
      { label: "Creative and brave", princess: "Rapunzel" },
      { label: "Strong and determined", princess: "Mulan" },
    ],
  },
  {
    text: "What is your favorite setting?",
    options: [
      { label: "A grand ballroom", princess: "Cinderella" },
      { label: "A library", princess: "Belle" },
      { label: "The ocean", princess: "Ariel" },
      { label: "A tower with a view", princess: "Rapunzel" },
      { label: "A battlefield", princess: "Mulan" },
    ],
  },
  {
    text: "How do you handle challenges?",
    options: [
      { label: "With grace and optimism", princess: "Cinderella" },
      { label: "With research and planning", princess: "Belle" },
      { label: "With curiosity and courage", princess: "Ariel" },
      { label: "With creativity and teamwork", princess: "Rapunzel" },
      { label: "With bravery and strategy", princess: "Mulan" },
    ],
  },
  {
    text: "What is your favorite pastime?",
    options: [
      { label: "Reading stories", princess: "Belle" },
      { label: "Singing", princess: "Ariel" },
      { label: "Exploring", princess: "Rapunzel" },
      { label: "Training", princess: "Mulan" },
      { label: "Dreaming of a better life", princess: "Cinderella" },
    ],
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleSelect = (princess: string) => {
    const newAnswers = [...answers, princess];
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const counts: Record<string, number> = {};
      newAnswers.forEach((p) => {
        counts[p] = (counts[p] || 0) + 1;
      });
      const best = Object.entries(counts).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0];
      setResult(best);
    }
  };

  if (result) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-xl font-semibold">
          You are most similar to {result}!
        </h2>
        <Share
          text={`I just took the Disney Princess Quiz and discovered I'm most similar to ${result}! Check it out: ${process.env.NEXT_PUBLIC_URL}`}
          className="mt-2"
        />
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="flex flex-col gap-4 items-center">
      <h3 className="text-lg font-medium">{q.text}</h3>
      <div className="flex flex-col gap-2">
        {q.options.map((opt) => (
          <Button
            key={opt.label}
            onClick={() => handleSelect(opt.princess)}
            className="w-full"
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
