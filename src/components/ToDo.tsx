import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { IToDo, newCategoryState, toDoState } from "./atoms";

function ToDo({ text, category, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const newCategory = useRecoilValue(newCategoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    const targetIndex = toDos.findIndex((toDo) => toDo.id === id);
    const newToDo = { text, id, category: name as any };
    const data = [...toDos.slice(0, targetIndex),
        newToDo,
        ...toDos.slice(targetIndex + 1),]
    setToDos(data);
    localStorage.setItem("toDos", JSON.stringify(data) as any);
  };
  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // 리턴시 배열 다시 셋팅 targetIndex 앞뒤로 짤라서 함수 만들고, 들어온 함수 넣고 다시 봉합
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {newCategory.map(
        (newCategory, i) =>
          newCategory !== category && (
            <button name={newCategory} key={i} onClick={onClick}>
              {newCategory}
            </button>
          )
      )}
      {}
      <button name="delete" onClick={onDelete}>
        Del
      </button>
    </li>
  );
}

export default ToDo;
