import Head from "next/head";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "@/components/layout/LoginContext";
import { useRouter } from "next/router";
import { User } from "@/values/types";
import { Store } from "react-notifications-component";
import { Appointment } from "devextreme/ui/scheduler";
import { baseURL } from "@/values/api";
import { CalendarContext } from "@/components/layout/CalendarContext";
import plannerData from "@/temp/calendarData";

export default function Users() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const { setEvents } = useContext(CalendarContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  function onSubmit(data: User): void {
    data.nNumber = data.nNumber.toLowerCase()
    
    fetch(baseURL + `user/get?nNumber=${data.nNumber}`)
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then((res: User) => {
              if (res.name == data.name) {
                setUser(res);

                fetch(baseURL + `planner/getall?nNumber=${res.nNumber}`)
                  .then((res) => {
                    if (res.ok) {
                      res.json().then((res: Appointment[]) => {
                        setEvents(plannerData.concat(res));
                      });
                    } else if (res.status === 404) {
                      Store.addNotification({
                        title: "Could not find planner data",
                        message: "User planner data not found",
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
                  });

                router.push("/");
              } else {
                Store.addNotification({
                  title: "Incorrect login",
                  message: "Incorrect username or n-number",
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
              }
            })
            .catch((error) => {
              Store.addNotification({
                title: "ERROR: Unexpected behavior",
                message: "Data processing error",
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
            });
        } else if (res.status === 404) {
          Store.addNotification({
            title: "Invalid login",
            message: "Incorrect username or n-number",
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
      });
  }

  if (user) {
    return (
      <Head>
        <title>Login User | UNF App</title>
      </Head>
    );
  } else {
    return (
      <>
        <Head>
          <title>Login User | UNF App</title>
        </Head>
        <ContentLayout>
          <Hero></Hero>

          <RegisterElement onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>Login</FormTitle>
            <InputName>Username</InputName>
            <StyledInput
              placeholder="John Doe"
              {...register("name", {
                required: true,
                pattern: /^[\w\s]{1,20}$/i,
              })}
            />
            {errors.name && (
              <ErrorMessage>Alphanumeric characters only</ErrorMessage>
            )}

            <br />

            <InputName>N-Number</InputName>
            <StyledInput
              placeholder="n01234567"
              {...register("nNumber", {
                required: true,
                pattern: /^[nN][0-9]{8}$/i,
              })}
            />
            {errors.nNumber && <ErrorMessage>Invalid n-number</ErrorMessage>}

            <br />

            <Buttons>
              <SubmitButton type="submit" value="Login" />
              <RegisterButton href="/users/create">Register</RegisterButton>
            </Buttons>
          </RegisterElement>
        </ContentLayout>
      </>
    );
  }
}

const RegisterButton = styled(Link)`
  all: unset;
  background-color: #2d2d2d;
  color: white;
  padding: 0.75rem;
  font-weight: 600;

  width: max-content;

  cursor: pointer;

  &:focus {
    outline: 1px solid blue;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ErrorMessage = styled.div`
  color: #c30000;
  font-weight: 600;
  margin: 0.25rem 0;
`;

const FormTitle = styled.div`
  color: black;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 800;
`;

const StyledInput = styled.input`
  width: 15rem;

  font-family: inherit;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.25rem;
  margin: 0.25rem 0;

  border: 2px solid #ccc;
  border-radius: 6px;
`;

const InputName = styled.label`
  font-size: 1.25rem;
`;

const SubmitButton = styled.input`
  all: unset;
  background-color: #1c1cc1;
  color: white;
  padding: 0.75rem;
  font-weight: 600;

  width: max-content;

  cursor: pointer;

  &:focus {
    outline: 1px solid blue;
  }
`;

const Hero = styled.div`
  height: 5rem;
  background-color: white;
`;

const ContentLayout = styled.main`
  padding-top: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterElement = styled.form`
  background-color: #eee;
  padding: 3rem 2rem;
  padding-top: 1rem;

  border-radius: 1rem;

  display: flex;
  flex-direction: column;

  border: 2px solid #e8e8e8;
`;
