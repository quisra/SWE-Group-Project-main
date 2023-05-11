import Head from "next/head";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/components/layout/LoginContext";
import { useRouter } from "next/router";
import { User } from "@/values/types";
import { Store } from "react-notifications-component";
import { Appointment } from "devextreme/ui/scheduler";
import { baseURL } from "@/values/api";
import { CalendarContext } from "@/components/layout/CalendarContext";

export default function EditUser() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const [userInfo, setUserInfo] = useState<User>(user!);

  function onSubmit(data: User): void {
    fetch(baseURL + "user/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => {
        if (res.ok) {
          setUser(userInfo);

          Store.addNotification({
            title: "Success",
            message: "Updating user was successful",
            type: "success",
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
        } else if (res.status === 404) {
          Store.addNotification({
            title: "User modification failed",
            message: "Could not find user",
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
        } else if (res.status === 409) {
          Store.addNotification({
            title: "User modification failed",
            message:
              "Error occured while modifiying User, please try again",
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
      <>
        <Head>
          <title>Edit User | UNF App</title>
        </Head>
        <ContentLayout>
          <Hero></Hero>

          <RegisterElement onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>Edit User</FormTitle>
            <InputName>Username</InputName>
            <StyledInput
              placeholder="John Doe"
              {...register("name", {
                required: true,
                pattern: /^[\w\s]{1,20}$/i,
              })}
              value={userInfo.name}
              onChange={(evt) =>
                setUserInfo({ ...userInfo, name: evt.target.value })
              }
            />
            {errors.name && (
              <ErrorMessage>Alphanumeric characters only</ErrorMessage>
            )}

            <br />

            <InputName>Profile Picture Url</InputName>
            <StyledInput
              placeholder="i.imgur.com/XtqOTWr"
              {...register("imageUrl", {
                required: false,
                maxLength: 150,
                pattern:
                  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
              })}
              value={userInfo.imageUrl}
              onChange={(evt) =>
                setUserInfo({ ...userInfo, imageUrl: evt.target.value })
              }
            />
            {errors.imageUrl && (
              <ErrorMessage>
                A valid url is required, max characters: 150
              </ErrorMessage>
            )}

            <br />

            <Buttons>
              <SubmitButton disabled={user.name === userInfo.name && user.imageUrl === userInfo.imageUrl} type="submit" value="Save" />
            </Buttons>
          </RegisterElement>
        </ContentLayout>
      </>
    );
  } else {
    return (
      <Head>
        <title>Edit User | UNF App</title>
      </Head>
    );
  }
}

const Buttons = styled.div`
  display: flex;
  justify-content: center;
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

  border: 2px solid #13139a;

  &:focus {
    outline: 1px solid blue;
  }

  &:disabled {
  background-color: #8181e8;
  border: 2px solid #7272ce;
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
