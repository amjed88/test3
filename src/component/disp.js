import react, { component, useState, useEffect, useContext } from 'react';
import axios from "axios";
import Add from "./add";
import { useHistory } from 'react-router-dom';
import { appContext } from '../context'

function Display() {
  let { username } = useContext(appContext)
  const hist = useHistory();
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/get/", {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setdata(data)
      });

  });
  //edit
  const onclick = (e, availability) => {
    hist.push("/add", { availability });
  };
  //delete
  const ondelet = (ed, availability) => {
    const ID = availability.id
    fetch("http://localhost:3000/api/get/", {
      method: "delete",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      body: JSON.stringify(ID)
    })
      .then(res => res.json())
      .then(data => {console.log(data)
      }
      )
  }
  return (
    <div>
      DIPLAY welcome to {username}
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">name</th>
            <th scope="col">date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(availability => {
            return (
              <tr>
                <td>{availability.id}</td>
                <td>{availability.name}</td>
                <td >{availability.date} <button onClick={(e) => onclick(e, availability)}>edit</button> <button onClick={(ed) => ondelet(ed, availability)}>delete</button> </td>


              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

  )

}
export default Display;