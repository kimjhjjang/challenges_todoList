import { useForm } from "react-hook-form";
import {  useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "./atoms";


interface IForm {
    toDo : string;
};

function CreateToDo(){
    //
    const [toDos, setToDos] = useRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const onSubmitVaild = ({ toDo }: IForm) => {
        let data = [{ 
            text: toDo, 
            category, 
            id: Date.now() },
            ...toDos];
        setToDos(data);
        setValue("toDo", "");
       // console.log(JSON.stringify(data))
        localStorage.setItem("toDos",JSON.stringify(data) as any);
    }
    return (
        <form onSubmit={handleSubmit(onSubmitVaild)}>
                <input {...register("toDo", {required : "Write This!"})} placeholder="Todo List Write"/>
                <span></span>
                <button>Add</button>
            </form>
    );
}

export default CreateToDo;