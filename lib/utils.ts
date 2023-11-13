import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateName() {
  const adjectives = [
    "Whimsical",
    "Enchanting",
    "Mystical",
    "Spectacular",
    "Breathtaking",
    "Astounding",
    "Captivating",
    "Dazzling",
    "Radiant",
    "Sparkling",
    "Ethereal",
    "Marvelous",
    "Enigmatic",
    "Vibrant",
    "Fascinating",
    "Illustrious",
    "Mesmerizing",
    "Phenomenal",
    "Resplendent",
    "Ineffable",
  ];

  const nouns = [
    "Phoenix",
    "Celestial",
    "Infinity",
    "Aurora",
    "Eclipse",
    "Serenity",
    "Galaxy",
    "Dreamweaver",
    "Velvetine",
    "Harmony",
    "Nebula",
    "Tranquility",
    "Luminosity",
    "Cascade",
    "Zephyr",
    "Peregrine",
    "Cynosure",
    "Aegis",
    "Umbra",
    "Quasar",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}
