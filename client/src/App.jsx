import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [toDos, setToDos] = useState([]);
  const [value, setValue] = useState("");
  const [userNameValue, setUserNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [registerUserNameValue, setRegisterUserNameValue] = useState("");
  const [registerEmailValue, setRegisterEmailValue] = useState("");
  const [registerPasswordValue, setRegisterPasswordValue] = useState("");
  const [taskValue, setTaskValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [refresh, setRefresh] = useState();
  const [user, setUser] = useState([]);

  
  useEffect(() => {
    axios
    .get("http://localhost:3005/todos/fetchtodo")
    .then(({ data }) => setToDos(data))
    .catch((err) => console.log(err.message));
  }, [refresh]);
  
  useEffect(() => {
    axios
    .get("http://localhost:3005/users")
    .then(({ data }) => setUser(data))
    .catch((err) => console.log(err.message));
  }, [refresh]);

  function login(){
    axios
    .post("http://localhost:3005/users/login", {userName: userNameValue, email: emailValue, password: passwordValue}).then((user) =>{
      localStorage.setItem("user-token", user.data.token)
    })
    .catch(err => {
      if(err) {console.log(err)};
    })
  }
  async function register(){
    try{
      const user = await axios.post("http://localhost:3005/users/register", {userName: registerUserNameValue, email: registerEmailValue, password: registerPasswordValue})
    }catch(err){
      console.log('sdsd');
    }
    }

  const handleAddItem = async () => {
    try {
      const { data: newTask } = await axios.post(
        "http://localhost:3005/todos/publishtodo",
        { task: taskValue }
      );
      setRefresh(Math.random());
      console.log(newTask);
    } catch (err) {
      console.log(err.response.data.task);
    }
  };
  const deleteItem = async (index) => {
    try {
      const deleteToDo = await axios.delete(
        `http://localhost:3005/todos/deletetodo/${toDos[index]._id}`
      );
      setRefresh(Math.random());
      console.log(deleteToDo);
    } catch (err) {
      console.log(err.response.data.task);
    }
  };
  const editItem = async (index) => {
    try {
      const editToDo = await axios.put(
        `http://localhost:3005/todos/puttodo/${toDos[index]._id}`,
        { task: newValue }
      );
      setRefresh(Math.random());
      console.log(editToDo);
    } catch (err) {
      console.log(err.response.data.task);
    }
  };
  return (
    <div>
      <div>
        <h1>Welcome back {`${user.userNameValue}`}</h1>
      </div>
      <div id="login-register-container">
        <div id="login-container">
          <h1>Login</h1>
          <input
            type="text"
            name="username"
            onChange={(event) => {
              setUserNameValue(event.target.value);
            }}
          /> <br />
          <input
            type="text"
            name="email"
            onChange={(event) => {
              setEmailValue(event.target.value);
            }}
          /> <br />
          <input
            type="text"
            name="password"
            onChange={(event) => {
              setPasswordValue(event.target.value);
            }}
          /> <br />
          <button id="login-btn" type="sumbit" onClick={login}>login</button>
        </div>
        <div id="register-container">
        <h1>Register</h1>
          <input
            type="text"
            name="registerUsername"
            onChange={(event) => {
              setRegisterUserNameValue(event.target.value);
            }}
          /> <br />
          <input
            type="text"
            name="registerEmail"
            onChange={(event) => {
              setRegisterEmailValue(event.target.value);
            }}
          /> <br />
          <input
            type="text"
            name="registerPassword"
            onChange={(event) => {
              setRegisterPasswordValue(event.target.value);
            }}
          /> <br />
          <button id="login-btn" type="sumbit" onClick={register}>register</button>
        </div>
      </div>
      <div id="container">
        <h1>To do list </h1>
        <div id="app">
          <input
            id="input"
            name="task"
            type="text"
            placeholder="Type text here"
            onChange={(event) => {
              setTaskValue(event.target.value);
            }}
          />
          <button id="addButton" type="submit" onClick={handleAddItem}>
            +
          </button>
        </div>
        <ul id="list-container">
          {toDos.map((newTask, index) => {
            return (
              <li key={index}>
                {newTask.task}
                {newTask.value}
                <input
                  key={index}
                  type="text"
                  onChange={(e) => setNewValue(e.target.value)}
                />
                <button id="edit" type="edit" onClick={() => editItem(index)}>
                  edit task
                </button>
                <button
                  id="delete"
                  type="delete"
                  onClick={() => deleteItem(index)}
                >
                  delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default App;
