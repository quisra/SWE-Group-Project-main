import { Notecard } from "@/values/types";
import { useForm } from "react-hook-form";
import { useContext, useReducer } from "react";
import styled from "styled-components";
import { NotecardSetContext } from "@/components/layout/notecards/NotecardSetContext";
import { baseURL } from "@/values/api";
import { Store } from "react-notifications-component";
import { screen } from "@/styles/styleConstants";

function reducer(prev: Notecard, next: Notecard): Notecard {
  function makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return {
    ...prev,
    ...next,
    noteid:
      next.question.substring(0, 10) +
      next.answer.substring(0, 10) +
      makeid(10),
  };
}

export default function NotecardNew() {
  const { notecardSet, setNotecardSet } = useContext(NotecardSetContext);

  const [notecardInfo, setNotecardInfo] = useReducer(reducer, {
    answer: "",
    noteid: "",
    question: "",
    setid: notecardSet.id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Notecard>();

  function onSubmit(data: Notecard): void {
    const json = JSON.stringify(notecardInfo);
    console.log(json);
    console.log(notecardInfo);

    fetch(baseURL + "notecard/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    })
      .then((res) => {
        if (res.ok) {
          if (notecardSet.notecards) {
            setNotecardSet({
              ...notecardSet,
              notecards: [...notecardSet.notecards, notecardInfo],
            });
          } else {
            setNotecardSet({ ...notecardSet, notecards: [notecardInfo] });
          }
          setNotecardInfo({ ...notecardInfo, answer: "", question: "" });
        } else if (res.status === 409) {
          Store.addNotification({
            title: "Could not add notecard to pack",
            message: "Error occured adding notecard, please try again",
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
      <Fields>
        <div>
          <InputField
            {...register("question", {
              required: true,
              maxLength: 100,
            })}
            value={notecardInfo.question}
            onChange={(evt) =>
              setNotecardInfo({ ...notecardInfo, question: evt.target.value })
            }
          />
          <RequiredText>
            {errors.question && "Field is required, max characters: 100"}
          </RequiredText>
        </div>

        <div>
          <InputField
            {...register("answer", {
              required: true,
              maxLength: 300,
            })}
            value={notecardInfo.answer}
            onChange={(evt) =>
              setNotecardInfo({ ...notecardInfo, answer: evt.target.value })
            }
          />
          <RequiredText>
            {errors.answer && "Field is required, max characters: 300"}
          </RequiredText>
        </div>
      </Fields>
      <ButtonHolder>
        <SaveButton
          type="submit"
          disabled={notecardInfo.question === "" || notecardInfo.answer === ""}
        >
          Add New
        </SaveButton>

        <DeleteButton
          type="button"
          onClick={() => {
            setNotecardInfo({ ...notecardInfo, answer: "", question: "" });
          }}
          disabled={notecardInfo.question === "" && notecardInfo.answer === ""}
        >
          Clear
        </DeleteButton>
      </ButtonHolder>
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

  border: 2px solid #eee;
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
    border: 2px solid #dda7a7;
    background-color: #e4b1b1;
  }
`;
