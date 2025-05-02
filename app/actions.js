"use server";
import ConnectDb from "./db";
import bcrypt from "bcryptjs";
import tasksmodal from "./modals/tasksschema";
import User from "./modals/userschema";
import jwt from "jsonwebtoken";

export async function registerUserAction({ name, email, password }) {
  try {
    if (!name || !email || !password) {
      return { success: false, message: "All fields are required" };
    }

    await ConnectDb();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error registering user" };
  }
}

export async function loginUserAction({ email, password }) {
  try {
    if (!email || !password) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    await ConnectDb();

    const user = await User.findOne({ email: email });

    if (!user) {
      return {
        success: false,
        message: "No such user found",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        message: "Invalid password or email",
      };
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SeceretKey,
      { expiresIn: "2d" }
    );
     const plainUser = user.toObject();

    return {
      success: true,
      message: "Login successful",
      token,
      plainUser
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "An error occurred during login",
    };
  }
}

export async function createTaskAction(formData,userId) {
  try {
    const title = formData.get("title");
    const dueDate = formData.get("dueDate");
    const description = formData.get("description");
    const time = formData.get("time");
    const priority = formData.get("priority") || "medium"; 

   
    if (!title || !dueDate || !description || !time || !userId) {
      return {
        success: false,
        message: "All fields are required and user must be logged in.",
      };
    }

    await ConnectDb();

    const newTask = new tasksmodal({
      title,
      dueDate,
      description,
      time,
      priority,
      userId, 
    });

     await newTask.save();

    return {
      success: true,
      message: "Task created successfully.",
    };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, message: "Error creating task." };
  }
}

export async function deleteTaskAction(id) {
  try {
    if (!id) {
      return { success: false, message: "ID parameter is missing" };
    }

    await ConnectDb();
    const response = await tasksmodal.findByIdAndDelete(id).lean();

    if (response) {
      return { success: true, message: "Task deleted successfully" };
    } else {
      return { success: false, message: "Task not found" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error deleting task" };
  }
}

export async function getTasksAction(page = 1, userid) {
  try {
    console.log(userid)
    if (!userid) {
      return { success: false, message: "user id is not availiable" };
    }

    await ConnectDb();

    const skipCount = (page - 1) * 4;

    const tasks = await tasksmodal
      .find({userId:userid })
      .limit(4)
      .skip(skipCount)
      .lean();

    if (tasks.length > 0) {
      const sanitizedTasks = tasks.map((task) => ({
        ...task,
        _id: task._id.toString(),
        dueDate: task.dueDate?.toISOString(),
        createdAt: task.createdAt?.toISOString(),
        updatedAt: task.updatedAt?.toISOString(),
      }));

      return {
        success: true,
        message: "Fetched tasks successfully",
        tasks: sanitizedTasks,
      };
    } else {
      return { success: false, message: "No tasks found" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error fetching tasks" };
  }
}

export async function getTasksCountAction(userId) {
  try {
    await ConnectDb();

    // Count tasks only for the specified userId
    const tasksCount = await tasksmodal.countDocuments({ userId });

    if (tasksCount >= 0) {
      return {
        success: true,
        message: "Fetched tasks count successfully",
        tasksCount,
      };
    } else {
      return { success: false, message: "No tasks found" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Cannot fetch task count" };
  }
}

export async function updateTaskAction(
  id,
  { newtitle, newdescription, newdueDate, newStatus, newTime }
) {
  try {
    if (!newtitle && !newdescription && !newdueDate && !newTime && !newStatus) {
      return { success: false, message: "At least one field is required." };
    }

    await ConnectDb();

    const task = await tasksmodal.findById(id).lean();
    if (task) {
      const updatedTask = await tasksmodal
        .findByIdAndUpdate(
          id,
          {
            title: newtitle || task.title,
            dueDate: newdueDate || task.dueDate,
            description: newdescription || task.description,
            status: newStatus || task.status,
            time: newTime || task.time,
          },
          { new: true }
        )
        .lean();

      return { success: true, message: "Updated successfully", updatedTask };
    } else {
      return { success: false, message: "Task not found" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error in updating task" };
  }
}

export async function getSingleTaskDataAction(id) {
  try {
    if (!id) {
      return { success: false, message: "Task ID is missing" };
    }
    await ConnectDb();
    const task = await tasksmodal.findById(id).lean();

    if (task) {
      return { success: true, message: "Fetched task successfully", task };
    } else {
      return { success: false, message: "No task found" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error fetching task" };
  }
}
