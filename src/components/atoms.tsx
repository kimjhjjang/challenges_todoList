import { atom, selector } from "recoil";

export enum Categories {
     "TO_DO" = "TO_DO", 
     "DOING" = "DOING",
     "DONE" = "DONE"
}

export interface IToDo {
    text: string;
    category: Categories;
    id: number
}

export const categoryState = atom<Categories>({
    key : "category",
    default: Categories.TO_DO,
});

 const getTodo = localStorage.getItem("toDos");
 const localData = JSON.parse(getTodo as any);

export const toDoState = atom<IToDo[]>({
     key: "toDo", 
     default: localData
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    }
});