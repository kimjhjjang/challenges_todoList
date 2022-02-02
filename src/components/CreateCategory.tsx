import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { saveCateogories } from "../localStorage/LCategory";
import { newCategoryState } from "./atoms";

interface ICategory {
  addCategory: string;
}

function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const [newCategory, setNewCategory] = useRecoilState(newCategoryState);
  const onSubmitValid = ({ addCategory }: ICategory) => {
    const data = [...newCategory, addCategory];
    setNewCategory(data);
    saveCateogories(data);
    setValue("addCategory", "");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <input
          {...register("addCategory", { required: "write category name!" })}
          placeholder="category name"
        />
        <button>Category Add</button>
      </form>
    </>
  );
}

export default CreateCategory;
