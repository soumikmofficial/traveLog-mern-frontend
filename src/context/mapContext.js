import React, { useContext, useState } from "react";
import axios from "axios";

const MapContext = React.createContext();

const MapProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [current, setCurrent] = useState(null);
  const [newPin, setNewPin] = useState(null);

  // TODO: fetch pins
  const fetchPins = async () => {
    try {
      const { data } = await axios.get("/api/v1/pins");
      setPins(data.pins);
    } catch (error) {
      console.log(error);
    }
  };
  // TODO: delete pins
  const deletePin = async (id) => {
    try {
      await axios.delete(`/api/v1/pins/${id}`);
      fetchPins();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <MapContext.Provider
      value={{
        deletePin,
        pins,
        setPins,
        current,
        setCurrent,
        newPin,
        setNewPin,
        fetchPins,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
const useMapContext = () => {
  return useContext(MapContext);
};

export { MapProvider, useMapContext };
