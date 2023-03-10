import { createContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { IUser } from '../UserContext/types';
import {
  ITask,
  ITaskContext,
  ITaskCreate,
  ITaskProviderProps,
  ITaskUpdate,
} from './types';

export const TaskContext = createContext<ITaskContext>({} as ITaskContext);

export const TaskProvider = ({ children }: ITaskProviderProps) => {
  const [tasksList, setTasksList] = useState<ITask[]>([]);
  const [showMenu, setShowMenu] = useState<true | null>(null);
  const [typesModal, setTypesModal] = useState('');
  const [taskSelected, setTaskSelected] = useState<ITask | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const id = localStorage.getItem('@ID');
  const token = localStorage.getItem('@TOKEN');

  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const searchTaskList = tasksList.filter((task) => {
    if(task.name.includes(search)){
      return task
    } else if (search == ''){
      return tasksList
    }
  });
  console.log(searchTaskList);
  const showCreateModal = () => {
    setOpenCreateModal(true);
  };

  const showUpdateModal = (task: ITask, id: string) => {
    if (task.id === id) {
      setTaskSelected(task);
      setOpenUpdateModal(true);
    }
  };

  const closeModal = () => {
    setOpenUpdateModal(false);
    setOpenCreateModal(false);
    setTaskSelected(null);
  };

  const createTask = async (data: ITaskCreate) => {
    try {
      const response = await api.post('/tasks', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    readTask(id);
  };

  const readTask = async (id: string | null) => {
    try {
      const response = await api.get(`/tasks?userId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasksList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readTask(id);
  }, []);

  const updateTask = async (data: ITaskUpdate, id: string) => {
    const token = localStorage.getItem('@TOKEN');

    try {
      const response = await api.patch(`/tasks/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newTask = tasksList.map((task) => {
        if (task.id == response.data.id) {
          console.log({ ...task, ...data });
          return { ...task, ...data };
        } else {
          return task;
        }
      });
      setTasksList(newTask as []);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async () => {
    let taskId = taskSelected?.id;

    try {
      const response = api.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const removeTask = tasksList.filter((task) => taskId != task.id);
      setTasksList(removeTask);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasksList,
        setTasksList,
        createTask,
        updateTask,
        deleteTask,
        showMenu,
        setShowMenu,
        typesModal,
        setTypesModal,
        taskSelected,
        setTaskSelected,
        openUpdateModal,
        setOpenUpdateModal,
        showUpdateModal,
        closeModal,
        showCreateModal,
        openCreateModal,
        search,
        setSearch,
        searchValue,
        setSearchValue,
        searchTaskList,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
