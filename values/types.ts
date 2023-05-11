export type Notecard = {
  setid: string;
  noteid: string;
  question: string;
  answer: string;
};

export type NotecardSet = {
  id: string;
  name: string;
  isPublic: boolean;
  nNumber: string;
  description?: string;
  notecards?: Notecard[];
  creator: User;
  imageUrl: string;
};

export type User = {
  nNumber: string;
  name: string;
  imageUrl: string;
};

export type PlannerTask = {
  startDate: string;
  endDate: string;
  taskSubject: string;
  description: string;
  allDayTrigger: boolean;
  repeatValue: string;
  userID: string;
};
