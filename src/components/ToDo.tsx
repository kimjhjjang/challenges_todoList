import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atoms";

function ToDo({text, category, id}:IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget : { name }} = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = {text, id, category:name as any};
            // 리턴시 배열 다시 셋팅 targetIndex 앞뒤로 짤라서 함수 만들고, 들어온 함수 넣고 다시 봉합
            return [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1),
            ];
        });
    };
    const onDelete = (event:React.MouseEvent<HTMLButtonElement>) => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            // 리턴시 배열 다시 셋팅 targetIndex 앞뒤로 짤라서 함수 만들고, 들어온 함수 넣고 다시 봉합
            return [
                ...oldToDos.slice(0, targetIndex),
                ...oldToDos.slice(targetIndex + 1),
            ];
        });
    };
    
    return  (
    <li>
        <span>{text}</span>
        {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To DO</button>}
        {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
        {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
        <button name="delete" onClick={onDelete} >Del</button>
    </li>
    )
}

export default ToDo;