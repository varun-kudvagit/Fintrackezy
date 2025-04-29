import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Edit2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses, setSingleExpense } from "@/redux/expenseSlice";

const UpdateExpense = ({expense}) => {
  const {expenses, singleExpense} = useSelector(store=>store.expense)
    const [formData, setFormData] = useState({
        description:singleExpense?.description,
        amount:singleExpense?.amount,
        category:singleExpense?.category
    });
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()


    useEffect(()=>{
      setFormData({
        description:singleExpense?.description,
        amount:singleExpense?.amount,
        category:singleExpense?.category
      })
    },[singleExpense]);

   

    const changeEventHandler = (e) => {
        const {name,value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    const changeCategoryHandler = (value) => {
        setFormData(prevData =>({
            ...prevData,
            category:value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        // console.log(formData);
        
        try {
            setLoading(true);
            const res = await axios.put(`https://expensetracker-j2vn.onrender.com/api/v1/expense/update/${expense._id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if(res.data.success){
              const updatedExpenses = expenses.map(exp => exp._id === expense._id ? res.data.expense : exp);
              dispatch(setExpenses(updatedExpenses))
                toast.success(res.data.message)
                setIsOpen(false)
            }
        } catch (error) {
            console.log(error);  
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={()=> {
                  dispatch(setSingleExpense(expense))
                setIsOpen(false);
                }
                } size='icon' className='rounded-full border border-green-600 text-green-600 hover-border-transparent' variant="outline"><Edit2/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Expense</DialogTitle>
                    <DialogDescription>
                        Update your Expense. Click on Save, once done
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Description
                            </Label>
                            <Input id="description" placeholder="description" className="col-span-3" value={formData.description} name="description" onChange={changeEventHandler} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Amount
                            </Label>
                            <Input id="amount" type = 'number' className="col-span-3" placeholder="Add amount here" value={formData.amount} name="amount" onChange={changeEventHandler} />
                        </div>
                        <Select value={formData.category} onValueChange={changeCategoryHandler}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='rent'>Rent</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="salary">Salary</SelectItem>
                                    <SelectItem value="shopping">Shopping</SelectItem>
                                    <SelectItem value="others">Others</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        {
                            loading ? <Button className='w-full my-4'>
                                <Loader2 className="mr-2 h-4 animate-spin"/>
                                Please Wait
                            </Button>:
                            <Button type="submit">Update</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateExpense;
