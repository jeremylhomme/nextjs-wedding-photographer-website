"use client";
import React from "react";

interface WordsGridProps {
  label: string;
  sections: {
    left: string[];
    center: string[];
    right: string[];
  };
  description: string;
}

const WordsGrid: React.FC<WordsGridProps> = ({
  label,
  sections,
  description,
}) => {
  return (
    <section className="container mx-auto px-6 md:px-12 text-center">
      {/* Top Label */}
      <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
        {label}
      </h3>

      {/* Words Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-0">
        {/* Left Column */}
        <div className="flex flex-col justify-between text-left md:text-right">
          {sections.left.map((text, index) => (
            <p key={index} className="text-xs md:text-sm text-muted-foreground">
              {text}
            </p>
          ))}
        </div>

        {/* Center Column */}
        <div className="flex flex-col gap-y-6 items-center">
          {sections.center.map((text, index) => (
            <h1
              key={index}
              className="text-5xl md:text-6xl font-serif leading-tight"
            >
              {text}
            </h1>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between text-left md:text-left">
          {sections.right.map((text, index) => (
            <p key={index} className="text-xs md:text-sm text-muted-foreground">
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <p className="mt-12 text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
        {description}
      </p>
    </section>
  );
};

export default WordsGrid;
