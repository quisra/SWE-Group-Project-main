const data: LinkData[] = [
  {
    img: "https://images.unsplash.com/photo-1435527173128-983b87201f4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80",
    title: "Calendar",
    desc: "Stay organized and manage your time effectively. Our calendar app can help you keep track of your schedule, deadlines, and important events. With the app, you can set deadlines for assignments, schedule study time for exams, prioritize your workload, and track university events.",
    route: "/calendar",
  },
  {
    img: "https://images.unsplash.com/photo-1619468129361-605ebea04b44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    title: "Map",
    desc: "Find where you need to go on campus with ease. Using our Google Maps integrated application, you can locate the building and pinpoint the exact floor and location of any room on the UNF Campus. Save valuable time and ensure you arrive at your destination without getting lost.",
    route: "/map",
  },
  {
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    title: "Notecards",
    desc: "Prepare for tests and exams easier and more efficiently. With this tool, you can create digital notecards to help you study by answering questions or fill in the blank statements. Additionally, you can share your notecards with others, making it easy to collaborate and study with classmates.",
    route: "/notecards",
  },
];

export default data;

export type LinkData = {
  img: string;
  title: string;
  desc: string;
  route: string;
};
