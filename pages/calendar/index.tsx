import Head from "next/head";
import { useContext } from "react";
import styled from "styled-components";
import "devextreme/dist/css/dx.light.css";
import { Scheduler } from "devextreme-react/scheduler";
import { CalendarContext } from "@/components/layout/CalendarContext";
import { UserContext } from "@/components/layout/LoginContext";
import { baseURL } from "@/values/api";
import { Appointment } from "devextreme/ui/scheduler";
import { PlannerTask } from "@/values/types";
import { Store } from "react-notifications-component";

export default function TodoPage() {
  const { user } = useContext(UserContext);
  const { events, setEvents } = useContext(CalendarContext);

  function addEvent(e: any) {
    if (!user) {
      Store.addNotification({
        title: "Warning",
        message: "User not logged in, appointments will not be saved",
        type: "warning",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
          pauseOnHover: true,
          showIcon: true,
        },
      });

      setEvents([...events, e.appointmentData]);
    } else {
      const plannerTask: PlannerTask = {
        allDayTrigger: e.appointmentData.allDay,
        description: e.appointmentData.description,
        endDate: e.appointmentData.endDate,
        repeatValue: e.appointmentData.recurrenceRule,
        startDate: e.appointmentData.startDate,
        taskSubject: e.appointmentData.text,
        userID: user.nNumber,
      };

      fetch(baseURL + "planner/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plannerTask),
      })
        .then((res) => {
          if (res.ok) {
            setEvents([...events, e.appointmentData]);
          } else if (res.status === 409) {
            Store.addNotification({
              title: "Task already exists",
              message: "A task with that name and time already exists",
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
            });
          } else if (res.status === 500) {
            Store.addNotification({
              title: "Internal Server Error",
              message: "Server is down, contact webmaster",
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
            });

            e.cancel = true;
          } else {
            Store.addNotification({
              title: "ERROR: Unexpected behavior",
              message: `${res.status}: ${res.statusText}`,
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
            });

            e.cancel = true;
          }
        })
        .catch((error) => {
          Store.addNotification({
            title: "Client failed to connect to API",
            message: "Possible network error or disruption",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
              pauseOnHover: true,
              showIcon: true,
            },
          });

          console.log(error);

          e.cancel = true;
        });
    }
  }

  function updateEvent(e: any) {
    if (user) {
      const oldPlannerTask: PlannerTask = {
        allDayTrigger: e.oldData.allDay,
        description: e.oldData.description,
        endDate: e.oldData.endDate,
        repeatValue: e.oldData.recurrenceRule,
        startDate: e.oldData.startDate,
        taskSubject: e.oldData.text,
        userID: user.nNumber,
      };

      const newPlannerTask: PlannerTask = {
        allDayTrigger: e.newData.allDay,
        description: e.newData.description,
        endDate: e.newData.endDate,
        repeatValue: e.newData.recurrenceRule,
        startDate: e.newData.startDate,
        taskSubject: e.newData.text,
        userID: user.nNumber,
      };

      fetch(baseURL + "planner/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([oldPlannerTask, newPlannerTask]),
      })
        .then((res) => {
          if (res.status === 500) {
            Store.addNotification({
              title: "An error occured",
              message: "Possible conflict with another task",
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
            });

            e.cancel = true;
          } else {
            Store.addNotification({
              title: "ERROR: Unexpected behavior",
              message: `${res.status}: ${res.statusText}`,
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
            });

            e.cancel = true;
          }
        })
        .catch((error) => {
          Store.addNotification({
            title: "Client failed to connect to API",
            message: "Possible network error or disruption",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
              pauseOnHover: true,
              showIcon: true,
            },
          });

          console.log(error);

          e.cancel = true;
        });
    }
  }

  function deleteEvent(e: any) {
    if (user) {
      fetch(
        baseURL +
          `planner/delete?startDate=${e.appointmentData.startDate}&endDate=${e.appointmentData.endDate}&taskSubject=${e.appointmentData.text}&userID=${user.nNumber}`,
        {
          method: "PATCH",
        }
      )
        .then((res) => {
          if (res.status === 404) {
            Store.addNotification({
              title: "Task could not be found",
              message: "Task was not saved",
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
            });

            e.cancel = true;
          } else if (res.status === 500) {
            Store.addNotification({
              title: "Internal Server Error",
              message: "Server is down, contact webmaster",
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
            });

            e.cancel = true;
          } else {
            Store.addNotification({
              title: "ERROR: Unexpected behavior",
              message: `${res.status}: ${res.statusText}`,
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
              },
            });

            e.cancel = true;
          }
        })
        .catch((error) => {
          Store.addNotification({
            title: "Client failed to connect to API",
            message: "Possible network error or disruption",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
              pauseOnHover: true,
              showIcon: true,
            },
          });

          console.log(error);

          e.cancel = true;
        });
    }
  }

  function editAppointmentForm(e: any) {
    const form = e.form;
    let mainGroupItems = form.itemOption("mainGroup").items;

    mainGroupItems[0] = {
      ...mainGroupItems[0],
      validationRules: [{ type: "required" }],
    };

    form.itemOption("mainGroup", "items", mainGroupItems);
  }

  return (
    <>
      <Head>
        <title>Calendar | UNF App</title>
      </Head>
      <main>
        <Hero></Hero>
        <Scheduler
          timeZone="America/New_York"
          dataSource={[...events]}
          views={[
            "day",
            "week",
            "month",
            { type: "agenda", agendaDuration: 365 },
          ]}
          defaultCurrentView="month"
          defaultCurrentDate={new Date()}
          height={600}
          showAllDayPanel={true}
          firstDayOfWeek={1}
          startDayHour={0}
          endDayHour={24}
          onAppointmentFormOpening={editAppointmentForm}
          onAppointmentAdded={addEvent}
          onAppointmentUpdating={updateEvent}
          onAppointmentDeleted={deleteEvent}
        ></Scheduler>
      </main>
    </>
  );
}

const Hero = styled.div`
  height: 5rem;
`;
