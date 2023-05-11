import { colors, fonts } from "@/styles/styleConstants";
import Head from "next/head";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/components/layout/LoginContext";
import { Store } from "react-notifications-component";
import { NotecardSet } from "@/values/types";
import { baseURL } from "@/values/api";

export default function CreateNotecardSet() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NotecardSet>();

  function onSubmit(data: NotecardSet): void {
    if(data.isPublic) {
      data.isPublic = true;
    }
    else {
      data.isPublic = false;
    }

    data.creator = user!;

    data.nNumber = user!.nNumber;

    fetch(baseURL + "notecardset/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          router.push(`/notecards/packs/${user!.nNumber}/${data.id}/overview`);
        } else if (res.status === 409) {
          Store.addNotification({
            title: "Pack with that id already exists",
            message: "A pack is already created with that id",
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

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      Store.addNotification({
        title: "User Not Logged In",
        message: "Log in to create notecards packs",
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

      router.push("/users/create");
    }
  }, [user, router]);

  if (user) {
    return (
      <>
        <Head>
          <title>Create Notecard Set | UNF App</title>
        </Head>
        <main>
          <Hero></Hero>

          <FormTitle>Create Notecard Set</FormTitle>

          <CustomForm onSubmit={handleSubmit(onSubmit)}>
            <InputName>Display Title</InputName>
            <StyledInput
              placeholder="Software Engineering"
              {...register("name", {
                required: true,
                pattern: /^[\w\s]{1,30}$/i,
              })}
            />
            {errors.name && <ErrorMessage>This field is required</ErrorMessage>}
            {errors.name && <ErrorMessage>Max characters: 30</ErrorMessage>}

            <InputName>Description</InputName>
            <StyledTextArea
              placeholder="I haven't paid any attention a day in my life, someone please help me"
              {...register("description", { pattern: /^[\w\s]{0,300}$/i })}
            />
            {errors.description && (
              <ErrorMessage>Max characters: 300</ErrorMessage>
            )}

            <InputName>Set ID</InputName>
            <StyledInput
              placeholder="AlexSoftwareEngineering"
              {...register("id", {
                required: true,
                pattern: /^\w{3,30}$/i,
              })}
            />
            {errors.id && <ErrorMessage>This field is required</ErrorMessage>}

            <InputName>Image URL</InputName>
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
              <ErrorMessage>Max characters: 150</ErrorMessage>
            )}

            <CheckboxHolder>
              <Checkbox
                type="checkbox"
                value="Public"
                {...register("isPublic")}
              />
              <InputName>Public</InputName>
            </CheckboxHolder>

            <SubmitButton type="submit" />
          </CustomForm>
        </main>
      </>
    );
  } else {
    return (
      <Head>
        <title>Create Notecard Set | UNF App</title>
      </Head>
    );
  }
}

const CheckboxHolder = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Checkbox = styled.input`
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: ${colors.unfBlue};
  width: 1.25rem;
  height: 1.25rem;
  border: 0.15em solid ${colors.unfBlue};
  border-radius: 0.15em;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;

  &::before {
    content: "";
    width: 0.75rem;
    height: 0.75rem;
    transform: scale(0);
    transition: 100ms transform ease-in-out;
    box-shadow: inset 1em 1em black;
    background-color: ${colors.unfBlue};

    transform-origin: center;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus {
    outline: 2px solid ${colors.unfBlue};
  }

  &:disabled {
    color: #888;
    cursor: not-allowed;
  }
`;

const FormTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 800;

  color: #eee;
  background-color: ${colors.unfBlue};

  padding: 2.25rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputName = styled.label`
  font-size: 1.25rem;
  font-weight: 600;

  color: ${colors.unfBlue};
`;

const StyledTextArea = styled.textarea`
  border-radius: 1rem;
  padding: 0.5rem;

  height: 6rem;

  font-size: 1rem;
  font-family: ${fonts.sansSerifMain};
  font-weight: 600;

  border: 2px solid ${colors.unfBlue};

  resize: vertical;
`;

const StyledInput = styled.input`
  border-radius: 1rem;
  padding: 0.5rem;

  font-size: 1rem;
  font-family: ${fonts.sansSerifMain};
  font-weight: 600;

  border: 2px solid ${colors.unfBlue};
`;

const ErrorMessage = styled.div`
  color: #c30000;
  font-weight: 600;
  margin: 0.25rem 0;
`;

const Hero = styled.div`
  height: 5rem;
  background-color: white;
`;

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin: 2rem 3rem;
`;

const SubmitButton = styled.input`
  flex-grow: 0;
  width: max-content;

  background-color: ${colors.unfBlue};
  color: ${colors.unfBlueWhite};

  padding: 1.25rem;
  border: none;

  font-size: 1.1rem;
  font-weight: 600;

  cursor: pointer;

  transition: 100ms ease background-color;

  &:hover {
    background-color: ${colors.unfBlueLight};
  }

  &:focus {
    outline: 2px solid blue;
  }
`;
