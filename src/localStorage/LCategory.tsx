import { defaultCategories } from "../components/atoms";

export const LOCALSTORAGE = "CATEGORIES";

export const loadCategories = (): string[] => {
    const localCategories = localStorage.getItem(LOCALSTORAGE);
    if(localCategories){
        return JSON.parse(localCategories);
    }
    
    return defaultCategories;
}

export const saveCateogories = (categories : string[]) => {
    localStorage.setItem(LOCALSTORAGE, JSON.stringify(categories))
}