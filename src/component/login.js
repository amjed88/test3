import react, { component, useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { appContext } from '../context'
import { CustomDialog, useDialog } from 'react-st-modal';
import {
  ModalProvider,
  Modal,
  useModal,
  ModalTransition,
} from 'react-simple-hook-modal';
import 'react-simple-hook-modal/dist/styles.css';
import "./items.css"


function Login() {
  const {isModalOpen, openModal, closeModal} = useModal();
  let history = useHistory()
  let { setUser } = useContext(appContext)
  const [logine, setlogine] = useState({
    username: "",
    password: ""
  });
  //login and get token
  const onclik = (ev) => {
    fetch("http://localhost:3000/api/get/login", {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      body: JSON.stringify(logine)
    })
      .then(res => res.json())
      .then(data => {
        setUser({
          token: data.Token,
          isLogin: true
        })
        localStorage.setItem('token', data.Token)
        history.replace('/display')
      }
      )

      .catch(err => {
        console.log('err', err)
      })
  }
  function CustomDialogContent() {
    const dialog = useDialog();

    const [value, setValue] = useState();

    return (
      <div>
        <input
          type="text"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <input
          type="text"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            // Сlose the dialog and return the value
            dialog.close(value);
          }}
        >
          Custom button
      </button>
      </div>
    );
  }



  return (
    <body id="bod">
    <div className="login">
      <label>username:</label>
      <input type="text" onChange={(e) => setlogine({ ...logine, username: e.target.value })} />
      <label>password:</label>
      <input type="text" onChange={(ee) => setlogine({ ...logine, password: ee.target.value })} />
      <button onClick={(ev) => onclik(ev)}>login</button>
      <button
        onClick={async () => {
          const result = await CustomDialog(<CustomDialogContent />, {
            title: 'Custom Dialog',
            showCloseIcon: true,
          });
        }}
      >
        Custom
      </button>
      <ModalProvider>
         <>
          <button onClick={openModal}>Open</button>
          <Modal
            id="any-unique-identifier"
            isOpen={isModalOpen}
            transition={ModalTransition.SCALE}
          >
            <button onClick={closeModal}>close</button>
          </Modal>
        </>
      </ModalProvider>
    </div>
    </body>
  )

}
export default Login