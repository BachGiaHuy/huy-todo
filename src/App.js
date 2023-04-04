import { useState, useReducer, useRef } from "react";
import './style.css'

const initState = {
  job: "",
  jobs: []
};

// action
const SETJOB = "set_job";
const ADDJOB = "add_job";
const DELETEJOB = "delete_job";
const EDITJOB = "edit_job";
const REMOVEALL = "remove_all";

const set_job = (payload) => {
  return {
    type: SETJOB,
    payload
  };
};

const add_job = (payload) => {
  return {
    type: ADDJOB,
    payload
  };
};

const delete_job = (payload) => {
  return {
    type: DELETEJOB,
    payload
  };
};

const edit_job = (payload) => {
  return {
    type: EDITJOB,
    payload
  };
};

const remove_all = payload => {
    return {
      type : REMOVEALL,
      payload
    }
}
// reducer
const reducer = (state, action) => {
  // console.log("index hyu", action.payload.index);
  // console.log(action.payload.value);
  let newState;
  switch (action.type) {
    case SETJOB:
      newState = {
        ...state,
        job: action.payload
      };
      break;
    case ADDJOB:
      newState = {
        ...state,
        jobs: [action.payload, ...state.jobs]
      };
      break;
    case DELETEJOB:
      const newJobs = [...state.jobs];
      newJobs.splice(action.payload, 1);
      newState = {
        ...state,
        jobs: newJobs
      };
      break;
    case EDITJOB:
      const uploadJobs = [...state.jobs];
      uploadJobs[action.payload.index] = action.payload.value;
      newState = {
        ...state,
        jobs: uploadJobs
      };
      break;
    case REMOVEALL :
      newState ={
        jobs : [],
      }
      break;
    default:
      throw new Error("invalid action");
  }
  return newState;
};
 function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { job, jobs } = state;
  // có job và jobs dùng two way binding
  const [editIndex, setEditIndex] = useState(null);
  console.log(editIndex);
  const [editValue, setEditValue] = useState("");
  const handleSubmit = () => {
    dispatch(add_job(job));
    dispatch(set_job(""));
    inputRef.current.focus();
    console.log(job);
  };
  const handleEdit = (index, value) => {
    dispatch(edit_job({ index, value }));
    setEditIndex(null)
    // khi setIndex === null thi thang index no khac cai dieu kien
    setEditValue("");
  };
  const inputRef = useRef();
  return (
    <div className="App">
      <h1 className="heading">To Do List With Gia Huy</h1>
      <label fullname="todo" className="form_label">
        Nhập bạn việc cần làm
      </label>
      <input
        ref={inputRef}
        name="todo"
        className="form_input"
        value={job}
        onChange={(e) => dispatch(set_job(e.target.value))}
      />
      <button className="button" onClick={handleSubmit}>
        <span>Thim</span>
      </button>

      <ul className="list">
        {jobs.map((job, index) => (
          <li className="item" key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  defaultValue={job}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleEdit(index, editValue)}>
                  OK rồi
                </button>
              </>
            ) : (
              <>
                {job}
                <button className="button btn-bottom" onClick={() => dispatch(delete_job(index))}>
                  <span>Xóa</span>
                </button>
                <button className="button" onClick={() => setEditIndex(index)}>
                  <span>Chỉnh sửa</span>
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      {jobs.length > 1 && (
        <button className="btn-remove-all" onClick={() =>dispatch(remove_all())}>Xóa hết</button>
      )}
    </div>
  );
}


export default App
