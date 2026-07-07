import { digitalBusinessLO } from "./digital-business";
import { LearningObject } from "@/lib/learning-objects";

export const F01_LEARNING_OBJECTS: LearningObject[] = [
  digitalBusinessLO,
];

export const F01_MODULE = {
  id: "foundation:f01",
  title: "F01: The Digital World",
  description: "How modern life runs on code, networks, and data.",
  learningObjects: F01_LEARNING_OBJECTS,
};
