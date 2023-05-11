After cloning, don't forget to run "npm i"

This project uses Next 13, TypeScript, and styled components.

This project requires the following back-end storage:

UNF Buildings with data {
number: string; Ex. "41",
name: string; Ex. "Building 41 - Police Building",
coordinates: key-value pair of {latitude: float, longitude, float}; Ex. { latitude: 30.26714525333742, longitude: -81.51225882517198 },
OR plain columns of latitude: float; longitude: float;
}

Notecard collections with data {
title: string; Ex. "Software Engineering",
description: string; Ex. "Study scrum concepts, unit testing, and how to break production",
img: string; Ex. "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
creator: key-value pair of {img: string, name: string}; Ex. {img: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", name: "Wall-E" },
OR plain columns of img: string; name: string;

Notecards with data {
question: string; Ex. "How many programmers does it take to change a light bulb?"
answer: string; Ex. "None, that's a hardware problem"
}
}

Calendar dates with data {
  startTime: date;
  endTime: date;
  title: string;
  description: string;
}


Non-critical:
User data {
  name: string;
  img: string;
  password: string;
}
