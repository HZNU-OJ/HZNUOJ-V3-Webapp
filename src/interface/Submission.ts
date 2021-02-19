export enum SubmissionStatusType {
  accepted = 'Accepted',
  wrongAnswer = 'Wrong Answer',
  runtimeError = 'Runtime Error',
  timeLimitExceeded = 'Time Limit Exceeded',
  memoryLimitExceeded = 'Memory Limit Exceeded',
  compilationError = 'Compilation Error',
  outputLimitExceeded = 'Output Limit Exceeded',
  systemError = 'System Error',
  canceled = 'Canceled',
  pending = 'Pending',
  running = 'Running',
}

export const SubmissionStatusTypeTitle = [
  'Accepted',
  'Wrong Answer',
  'Runtime Error',
  'Time Limit Exceeded',
  'Memory Limit Exceeded',
  'Compilation Error',
  'Output Limit Exceeded',
  'System Error',
  'Canceled',
  'Pending',
  'Running',
];

export enum SubmissionLangType {
  cpp = 'C++',
  c = 'C',
  java = 'Java',
  kotlin = 'Kotlin',
  pascal = 'Pascal',
  python = 'Python',
  rust = 'Rust',
  swift = 'Swift',
  go = 'Go',
  haskell = 'Haskell',
  cSharp = 'C#',
  fSharp = 'F#',
}

export const SubmissionLangTypeTitle = [
  'C++',
  'C',
  'Java',
  'Kotlin',
  'Pascal',
  'Python',
  'Rust',
  'Swift',
  'Go',
  'Haskell',
  'C#',
  'F#',
];
