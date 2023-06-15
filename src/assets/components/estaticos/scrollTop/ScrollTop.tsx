import React from "react";
import "./ScrollTop.css"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToken } from "../../../../store/tokens/actions";
import { TokenState } from "../../../../store/tokens/tokensReducer";




function ScrollTop() {

  
  function scrollTop() {
    window.scrollTo(0, 0);
  }

  const navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  const dispatch = useDispatch();

  function goLogout() {
    dispatch(addToken(""));
    toast.warn("Usuário Deslogado!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/login");
  }

  let scroolTopButton;

  if (token !== "") {
    scroolTopButton = (
      
      <button onClick={scrollTop} className="scrollTopBtn">
        <img
          src="https://cdn.discordapp.com/attachments/1094735633810997421/1117925062385876992/image.png"
          className="scrollTopImg"
        />
      </button>
    );
  }

  return <>{scroolTopButton}</>;
}

export default ScrollTop;


