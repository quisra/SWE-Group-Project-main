import Head from "next/head";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { UserContext } from "@/components/layout/LoginContext";
import { baseURL } from "@/values/api";
import { useRouter } from "next/router";
import { Store } from "react-notifications-component";
import { User } from "@/values/types";

export default function Users() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const router = useRouter();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  function onSubmit(data: User): void {
    data.nNumber = data.nNumber.toLowerCase()

    fetch(baseURL + "user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          setUser(data);

          router.push("/");
        } else if (res.status === 409) {
          Store.addNotification({
            title: "User already exists",
            message: "A user is already registered with that n-number",
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
      <Head>
        <title>Create User | UNF App</title>
      </Head>
    );
  } else {
    return (
      <>
        <Head>
          <title>Create User | UNF App</title>
        </Head>
        <ContentLayout>
          <Hero></Hero>

          <RegisterElement onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>Register</FormTitle>
            <InputName>
              Username<RequiredStar>*</RequiredStar>
            </InputName>
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

            <InputName>
              N-Number<RequiredStar>*</RequiredStar>
            </InputName>
            <StyledInput
              placeholder="n01234567"
              {...register("nNumber", {
                required: true,
                pattern: /^[nN][0-9]{8}$/i,
              })}
            />
            {errors.nNumber && <ErrorMessage>Invalid n-number</ErrorMessage>}

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
            />
            {errors.imageUrl && (
              <ErrorMessage>A valid url is required, max characters: 150</ErrorMessage>
            )}

            <br />

            <RequiredMessage>*Required</RequiredMessage>

            <Buttons>
              <SubmitButton type="submit" value="Register" />
              <RegisterButton href="/users/login">Login</RegisterButton>
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

const RequiredStar = styled.span`
  color: #c30000;
`;

const RequiredMessage = styled.div`
  color: #c30000;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
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
