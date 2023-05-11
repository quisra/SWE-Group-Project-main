import { NotecardSetContext } from "@/components/layout/notecards/NotecardSetContext";
import NotecardLayout from "@/components/layout/notecards/layout";
import { useContext, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { images } from "@/temp/images";
import { colors, fonts, screen } from "@/styles/styleConstants";
import { useForm } from "react-hook-form";
import { NotecardSet } from "@/values/types";
import { baseURL } from "@/values/api";
import { Store } from "react-notifications-component";
import { useRouter } from "next/router";

export default function NotecardsOverviewPage() {
  const { notecardSet, setNotecardSet } = useContext(NotecardSetContext);
  const router = useRouter();

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [notecardSetInfo, setNotecardSetInfo] =
    useState<NotecardSet>(notecardSet);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NotecardSet>();

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  function onSubmit(data: NotecardSet): void {
    fetch(baseURL + "notecardset/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notecardSetInfo),
    })
      .then((res) => {
        if (res.ok) {
          setNotecardSet(notecardSetInfo);

          Store.addNotification({
            title: "Success",
            message: "Updating notecard set was successful",
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
            title: "Notecard set modification failed",
            message: "Could not find notecard set",
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
            title: "Notecard set modification failed",
            message:
              "Error occured while modifiying notecard set, please try again",
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

  function onDelete() {
    fetch(
      baseURL +
        `notecardset/delete?nNumber=${notecardSet.nNumber}&id=${notecardSet.id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          setNotecardSet({
            creator: { imageUrl: "", name: "", nNumber: "" },
            id: "",
            imageUrl: "",
            isPublic: false,
            name: "",
            nNumber: "",
            description: undefined,
            notecards: undefined,
          });

          Store.addNotification({
            title: "Success",
            message: "Deleting notecard set was successful",
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

          router.push("/notecards");
        } else if (res.status === 404) {
          Store.addNotification({
            title: "Notecard set deletion failed",
            message: "Could not find notecard set",
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

  return (
    <>
      <Head>
        <title>Notecards Set Settings | UNF App</title>
      </Head>
      <main>
        <Header>
          <StyledImage
            src={
              notecardSet.imageUrl
                ? notecardSet.imageUrl
                : images[getRandomInt(0, images.length)]
            }
          />
          <HeaderText>
            Settings for {notecardSet.name} by {notecardSet.creator.name}
          </HeaderText>
        </Header>
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
          <InputName>Display Title</InputName>
          <StyledInput
            placeholder="Software Engineering"
            {...register("name", {
              required: true,
              pattern: /^[\w\s]{1,30}$/i,
            })}
            value={notecardSetInfo.name}
            onChange={(evt) =>
              setNotecardSetInfo({ ...notecardSetInfo, name: evt.target.value })
            }
          />
          {errors.name && <ErrorMessage>This field is required</ErrorMessage>}
          {errors.name && <ErrorMessage>Max characters: 30</ErrorMessage>}

          <InputName>Description</InputName>
          <StyledTextArea
            placeholder="I haven't paid any attention a day in my life, someone please help me"
            {...register("description", { pattern: /^[\w\s]{0,300}$/i })}
            value={notecardSetInfo.description}
            onChange={(evt) =>
              setNotecardSetInfo({
                ...notecardSetInfo,
                description: evt.target.value,
              })
            }
          />
          {errors.description && (
            <ErrorMessage>Max characters: 300</ErrorMessage>
          )}

          <InputName>Image URL</InputName>
          <StyledInput
            placeholder="i.imgur.com/XtqOTWr"
            {...register("imageUrl", {
              required: false,
              maxLength: 150,
              pattern:
                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
            })}
            value={notecardSetInfo.imageUrl}
            onChange={(evt) =>
              setNotecardSetInfo({
                ...notecardSetInfo,
                imageUrl: evt.target.value,
              })
            }
          />
          {errors.imageUrl && <ErrorMessage>Max characters: 150</ErrorMessage>}

          <CheckboxHolder>
            <Checkbox
              type="checkbox"
              value="Public"
              {...register("isPublic")}
              checked={notecardSetInfo.isPublic}
              onChange={(evt) =>
                setNotecardSetInfo({
                  ...notecardSetInfo,
                  isPublic: evt.target.checked,
                })
              }
            />
            <InputName>Public</InputName>
          </CheckboxHolder>

          <SubmitButton
            disabled={
              notecardSet.name === notecardSetInfo.name &&
              notecardSet.description === notecardSetInfo.description &&
              notecardSet.imageUrl === notecardSetInfo.imageUrl &&
              notecardSet.isPublic === notecardSetInfo.isPublic
            }
            type="submit"
            value="Save"
          />
        </CustomForm>

        <ButtonHolder>
          {confirmDelete ? (
            <>
              <ConfirmationQuestion>Are you sure?</ConfirmationQuestion>
              <YesButton
                onClick={() => {
                  onDelete();
                }}
              >
                Yes
              </YesButton>
              <NoButton onClick={() => setConfirmDelete(false)}>No</NoButton>
            </>
          ) : (
            <DeleteSetButton onClick={() => setConfirmDelete(true)}>
              Delete Set
            </DeleteSetButton>
          )}
        </ButtonHolder>
      </main>
    </>
  );
}

const ConfirmationButton = styled.button`
  color: white;
  font-weight: 600;
  font-size: 1rem;

  cursor: pointer;

  margin: 0 0.5rem;
  padding: 0.25rem 0.5rem;
`;

const YesButton = styled(ConfirmationButton)`
  background-color: #24ac0c;
  border: 2px solid #1c8509;

  &:focus {
    border: 2px solid black;
  }
`;

const NoButton = styled(ConfirmationButton)`
  background-color: #e41b1b;
  border: 2px solid #c91818;

  &:focus {
    border: 2px solid green;
  }
`;

const ConfirmationQuestion = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
`;

const ButtonHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 1rem;
`;

const DeleteSetButton = styled.button`
  background-color: #e41b1b;

  color: white;
  font-weight: 600;
  font-size: 1.25rem;

  padding: 0.75rem;

  border: 2px solid #c91818;

  cursor: pointer;

  &:focus {
    border: 2px solid green;
  }
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  filter: brightness(0.35);
`;

const HeaderText = styled.div`
  font-size: 1.75rem;
  font-weight: 800;

  text-align: center;

  color: #eee;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: ${screen.tablet}) {
    font-size: 1.25rem;
  }
  @media (max-width: ${screen.mobile}) {
    font-size: 1.1rem;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 6rem;

  background-color: #111;

  position: relative;
`;

NotecardsOverviewPage.getLayout = function getLayout(page: any) {
  return <NotecardLayout>{page}</NotecardLayout>;
};

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

  height: 10rem;

  font-size: 1rem;
  font-family: ${fonts.sansSerifMain};
  font-weight: 600;

  border: 2px solid ${colors.unfBlue};

  resize: none;

  @media (max-width: ${screen.tablet}) {
    height: 6rem;
  }
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

  @media (max-width: ${screen.tablet}) {
    gap: 0.5rem;
    margin: 2rem 1rem;
  }
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

  &:disabled {
    background-color: ${colors.unfBlueNearWhite};

    cursor: auto;

    &:hover {
      background-color: ${colors.unfBlueNearWhite};
    }
  }

  &:hover {
    background-color: ${colors.unfBlueLight};
  }

  &:focus {
    outline: 2px solid blue;
  }

  @media (max-width: ${screen.tablet}) {
    padding: 0.9rem;
  }
`;
