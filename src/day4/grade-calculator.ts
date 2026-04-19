export type Grade = "A" | "B" | "C" | "D" | "F";

export interface GradeResult {
  score: number;
  grade: Grade;
  isPassing: boolean;
  remark: string;
}

export function calculateGrade(score: number): Grade {
  if (score < 0 || score > 100) throw new Error("Score must be between 0 and 100");
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export function isPassing(score: number): boolean {
  return calculateGrade(score) !== "F";
}

export function evaluate(score: number): GradeResult {
  const grade = calculateGrade(score);
  const remarks: Record<Grade, string> = {
    A: "Excellent",
    B: "Good",
    C: "Satisfactory",
    D: "Needs Improvement",
    F: "Failing",
  };
  return { score, grade, isPassing: grade !== "F", remark: remarks[grade] };
}

export function calculateClassAverage(scores: number[]): number {
  if (scores.length === 0) throw new Error("No scores provided");
  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}
