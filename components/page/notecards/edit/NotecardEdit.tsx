import { Notecard } from "@/values/types";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import styled from "styled-components";
import { baseURL } from "@/values/api";
import { NotecardSetContext } from "@/components/layout/notecards/NotecardSetContext";
import { Store } from "react-notifications-component";
import { screen } from "@/styles/styleConstants";

export default function NotecardEdit({ notecard }: { notecard: Notecard }) {
  const { notecardSet, setNotecardSet } = useContext(NotecardSetContext);
  const [notecardInfo, setNotecardInfo] = useState(notecard);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Notecard>();

  function onSubmit(data: Notecard): void {
    fetch(baseURL + "notecard/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notecardInfo),
    })
      .then((res) => {
        if (res.ok) {
          if (notecardSet.notecards) {
            const index = notecardSet.notecards.findIndex(
              (notecard: Notecard) => notecard.noteid === notecardInfo.noteid
            );

            let oldNotecards = notecardSet.notecards;

            oldNotecards[index] = notecardInfo;

            setNotecardSet({
              ...notecardSet,
              notecards: oldNotecards,
            });
          } else {
            setNotecardSet({ ...notecardSet, notecards: [notecardInfo] });
          }

          setIsOpen(false);
        } else if (res.status === 404) {
          Store.addNotification({
            title: "Card modification failed",
            message: "Could not find notecard",
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
            title: "Card modification failed",
            message:
              "Error occured while modifiying notecard, please try again",
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
        `notecard/delete?noteID=${notecardInfo.noteid}&setID=${notecardInfo.setid}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          if (notecardSet.notecards) {
            const index = notecardSet.notecards.findIndex(
              (notecard: Notecard) => notecard.noteid === notecardInfo.noteid
            );

            let oldNotecards = notecardSet.notecards;

            oldNotecards.splice(index, 1);

            setNotecardSet({
              ...notecardSet,
              notecards: oldNotecards,
            });
          }
        } else if (res.status === 404) {
          Store.addNotification({
            title: "Card deletion failed",
            message: "Could not find notecard",
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
    <NotecardEditWrapper onSubmit={handleSubmit(onSubmit)}>
      <Fields
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div>
          <InputField
            {...register("question", {
              maxLength: 100,
            })}
            value={notecardInfo.question}
            onChange={(evt) =>
              setNotecardInfo({ ...notecardInfo, question: evt.target.value })
            }
          />
          <RequiredText>
            {errors.question && "Max characters: 100"}
          </RequiredText>
        </div>

        <div>
          <InputField
            {...register("answer", {
              maxLength: 300,
            })}
            value={notecardInfo.answer}
            onChange={(evt) =>
              setNotecardInfo({ ...notecardInfo, answer: evt.target.value })
            }
          />
          <RequiredText>{errors.answer && "Max characters: 300"}</RequiredText>
        </div>
      </Fields>

      {isOpen && (
        <ButtonHolder>
          <SaveButton
            type="submit"
            disabled={
              notecardInfo.question === notecard.question &&
              notecardInfo.answer === notecard.answer
            }
          >
            Save
          </SaveButton>

          <DeleteButton
            onClick={() => {
              onDelete();
            }}
            type="button"
          >
            Delete
          </DeleteButton>
        </ButtonHolder>
      )}
    </NotecardEditWrapper>
  );
}

const RequiredText = styled.div`
  color: #c30000;
  font-weight: 600;
  margin: 0.25rem 0;
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: ${screen.mobile}) {
    gap: 0.25rem;
  }
`;

const ButtonHolder = styled.div`
  display: flex;

  justify-content: space-around;

  padding: 1rem 0;
`;

const NotecardEditWrapper = styled.form`
  margin: 1.5rem 0.5rem;
  padding: 0.75rem;
  background-color: #f4f4f4;

  border: 2px solid #eee;

  @media (max-width: ${screen.tablet}) {
    margin: 1.5rem 0rem;
  }

  @media (max-width: ${screen.mobile}) {
    padding: 0.25rem;
  }
`;

const InputField = styled.textarea`
  padding: 0.5rem;
  font-family: inherit;
  font-size: 1rem;

  border: none;

  box-sizing: border-box;

  width: 100%;

  resize: vertical;

  min-height: 2rem;

  border: 1px solid #eee;
`;

const Button = styled.button`
  font-weight: 600;
  font-size: 1rem;

  width: max-content;

  border: none;

  padding: 0.5rem 1rem;

  color: white;

  cursor: pointer;
`;

const SaveButton = styled(Button)`
  background-color: #3dac3d;
  border: 2px solid #329432;

  &:disabled {
    background-color: #aed2ae;
    border: 2px solid #9fc59f;
  }
`;

const DeleteButton = styled(Button)`
  font-weight: 600;
  font-size: 1rem;

  width: max-content;

  border: none;

  padding: 0.5rem 1rem;

  color: white;

  cursor: pointer;

  background-color: #f23b3b;
  border: 2px solid #c72d2d;

  &:disabled {
    background-color: #e4b1b1;
    border: 2px solid #dda7a7;
  }
`;
