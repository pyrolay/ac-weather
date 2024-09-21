import React from "react";

import "./Modal.css";

import { IoMdClose } from "react-icons/io";

import { Search } from "../Search/Search";
import { DailyForecast } from "../DailyForecast/DailyForecast";

const Modal = ({ setModal, isSearch }) => {
  return (
    <div className="mainContainer">
      <div className="modalContainer">
        <button
          className="closeModal"
          onClick={() => setModal({ visible: false, isSearch: false })}
        >
          <IoMdClose className="closeIcon" />
        </button>
        {isSearch ? <Search /> : <DailyForecast />}
      </div>
    </div>
  );
};

export { Modal };
