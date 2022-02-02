import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, newCategoryState } from "./atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function TodoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const newCategory = useRecoilValue(newCategoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    return (
        <div>
            <h1>To Do Add</h1>
            <CreateCategory />
            <hr />
            <select value={category} onInput={onInput}>
            {newCategory.map((category,i) =>  (
                <option value={category} key={i}>{category}</option>
            ))}
            </select>
            <CreateToDo />
            { toDos?.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
        </div>
    )
}

export default TodoList;