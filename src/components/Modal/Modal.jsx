import React from "react";

import "./Modal.css";

import { IoMdClose } from "react-icons/io";

import { Search } from "../Search/Search";
import { DailyForecast } from "../DailyForecast/DailyForecast";

const Modal = ({
  setModal,
  isSearch,
  setCityName,
  citySearchData,
  setCityData,
}) => {
  return (
    <div className="mainContainer">
      <div className="modalContainer">
        <button className="closeModal">
          <IoMdClose
            className="closeIcon"
            onClick={() => setModal({ visible: false, isSearch: false })}
          />
        </button>
        {isSearch ? (
          <Search
            setCityName={setCityName}
            citySearchData={citySearchData}
            setCityData={setCityData}
            setModal={setModal}
          />
        ) : (
          <DailyForecast />
        )}
      </div>
    </div>
  );
};

export { Modal };
