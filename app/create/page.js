"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createTaskAction } from "../actions";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { GradientText } from "text-gradients";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const Create = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, Setloading] = useState(false);
  // const user = JSON.parse(localStorage.getItem("user"));
  // const userId = user ? user._id : null;
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setUserId(storedUser._id);
    }
  }, []);
  
  async function handleCreateTask(e) {
    e.preventDefault();
    Setloading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("dueDate", dueDate);
      formData.append("description", description);
      formData.append("time", time);
      formData.append("priority", priority);

      const result = await createTaskAction(formData, userId);

      if (result.success) {
        toast.success(result.message);
        setTitle("");
        setDueDate("");
        setDescription("");
        setTime("");
        setPriority("");
        router.push("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred while creating the task.");
    } finally {
      Setloading(false);
    }
  }
  if (!user) {
    return (
      <div className="flex justify-center">
        <GradientText
          color="bluepink"
          direction="top left"
          className="text-4xl font-extrabold text-center "
        >
          Please Login
        </GradientText>
      </div>
    );
  }
  return (
    <main className="w-[90%] sm:w-3/4 lg:w-1/2  m-auto mt-10 flex items-center h-[450px] flex-col gap-2 ">
      <GradientText
        color="bluepink"
        direction="top left"
        className="text-4xl font-extrabold text-center"
      >
        Create New Task
      </GradientText>
      <div className="flex flex-col w-full gap-y-6 justify-center items-center bg-white p-3 rounded-md">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-black"
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-black"
        />
        <TextField
          label="Due Date"
          type="date"
          variant="outlined"
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: new Date().toISOString().split("T")[0],
          }}
          className="text-black cursor-pointer"
        />
        <TextField
          label="Task Time"
          type="time"
          variant="outlined"
          fullWidth
          value={time}
          onChange={(e) => setTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          className="text-black"
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateTask}
          sx={{ width: "25%", marginTop: 2 }}
        >
          Create Task
        </Button>
      </div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </main>
  );
};

export default Create;
