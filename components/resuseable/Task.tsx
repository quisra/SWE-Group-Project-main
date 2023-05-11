import { colors, fonts, screen } from "@/styles/styleConstants";
import styled from "styled-components";
import { isStringLiteral } from "typescript";

export default function Task({
  title,
  startDate,
  endDate,
  allDay,
  eventType,
}: {
  title: string | undefined;
  startDate: Date | string | undefined;
  endDate: Date | string | undefined;
  allDay: boolean;
  eventType: string;
}) {
  function getDateString(date: Date | string | undefined) {
    if (typeof date === "string") {
      return date;
    } else if (typeof date === "undefined") {
      return "Unknown";
    } else {
      return date.toLocaleDateString("en-us", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    }
  }

  return (
    <>
      <TaskWrapper>
        <TaskHeader>
          <Tag>{eventType}</Tag>
          <TaskTitle>{title}</TaskTitle>
          <Date>
            {allDay || getDateString(startDate) == getDateString(endDate)
              ? getDateString(startDate)
              : getDateString(startDate) + " - " + getDateString(endDate)}
          </Date>
        </TaskHeader>
      </TaskWrapper>
    </>
  );
}

const Tag = styled.div`
  font-size: 1.25rem;
  padding-bottom: 0.5rem;

  color: #a98363;
`;

const TaskTitle = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  width: fit-content;
  border-bottom: 2px solid transparent;
  font-family: ${fonts.sansSerifSecondary};

  @media (max-width: ${screen.mobile}) {
    font-size: 1.5rem;
  }
`;

const TaskWrapper = styled.div`
  margin: 1rem;
  padding: 1rem;

  transition: 0.1s ease all;

  color: ${colors.nearBlack};

  @media (max-width: ${screen.mobile}) {
    margin: 1rem 0rem;
    padding: 1rem 0.5rem;
  }

  &:hover {
    cursor: pointer;

    ${TaskTitle} {
      color: ${colors.unfBlueLight};
    }
  }
`;

const TaskHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Date = styled.div`
  font-size: 0.9rem;
  color: ${colors.lightGray};
  margin-top: 0.25rem;
`;
