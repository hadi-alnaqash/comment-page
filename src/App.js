import React, { useEffect } from "react";
import './App.scss';
import HomeScreen from './pages/HomeScreen';
import { useAppStore } from './store';

function App() {

  const{
    comments,
    currentUser,
    setComments,
    deleteModalState,
    setCurrentUser,
  }= useAppStore();

  const getData = async () => {
    const res = await fetch('./data/data.json');
    // console.log("res: ", res)
    const data = await res.json();
    // console.log("data: ", data)
    setComments(data.comments);
    setCurrentUser(data.currentUser)
  };

  useEffect(() => {
    if (localStorage.getItem("comments") !== null && localStorage.getItem("currentUser") !== null) {
      setComments(JSON.parse(localStorage.getItem("comments")))
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
    }else{
      getData();
    }
  }, []);

  useEffect(() => {
    console.log("comments: ", comments)
    if (comments.length > 0) {
      localStorage.setItem("comments", JSON.stringify(comments));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [comments, deleteModalState]);

  return (
    <HomeScreen />
  );
}

export default App;
