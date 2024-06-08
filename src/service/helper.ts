import { TaskType } from "./defaultData";

export const getDateInString = (isModified: Boolean): string => {
  const currentDate = new Date();
  let addition = 0;

  if (isModified) {
    addition = 1;
  }
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1 + addition;
  const currentYear = currentDate.getFullYear();

  const formattedDate = `${currentDay}/${currentMonth}/${currentYear}`;

  return formattedDate;
};

export function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);

  // Create a new date object
  const date = new Date(year, month - 1, day); // Month is zero-based, so subtract 1

  // Get the day, month, and year
  const formattedDay = date.getDate();
  const formattedMonth = date.getMonth() + 1; // Month is zero-based, so add 1
  const formattedYear = date.getFullYear();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}

export const sortTasksAscending = (tasks: TaskType[]): TaskType[] => {
  return tasks.sort((a: TaskType, b: TaskType) => {
    const dateA = new Date(a.date.split("/").reverse().join("/"));
    const dateB = new Date(b.date.split("/").reverse().join("/"));
    return dateA.getTime() - dateB.getTime(); // Use getTime() to compare dates
  });
};

export const sortTasksDescending = (tasks: TaskType[]): TaskType[] => {
  return tasks.sort((a: TaskType, b: TaskType) => {
    const dateA = new Date(a.date.split("/").reverse().join("/"));
    const dateB = new Date(b.date.split("/").reverse().join("/"));
    return dateB.getTime() - dateA.getTime(); // Use getTime() to compare dates
  });
};
