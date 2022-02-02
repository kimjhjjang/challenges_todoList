import { atom, selector } from "recoil";
import { loadCategories } from "../localStorage/LCategory";

export const defaultCategories: (string)[] = [
    "TO_DO",
    "DOING",
    "DONE"
]

const getCategories = loadCategories();
export const newCategoryState = atom({
    key: "newCategory",
    default : getCategories === [] ? defaultCategories : getCategories 
});

export interface IToDo {
    text: string;
    category: string;
    id: number
}

export const categoryState = atom({
    key : "category",
    default: defaultCategories[0]
});

const getTodo = localStorage.getItem("toDos");
const localToDos = JSON.parse(getTodo as any);

export const toDoState = atom<IToDo[]>({
    key: "toDo", 
    default: localToDos === null ? [] : localToDos,
});
 
export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    }
});