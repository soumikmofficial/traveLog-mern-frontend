import React, { useEffect } from "react";
import styled from "styled-components";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "timeago.js";
import Fade from "react-reveal/Fade";
import { PinForm, Stars, UpdateForm } from "../components";
import { useMapContext } from "../context/mapContext";
import { useAppContext } from "../context/appContext";
import { Loading } from ".";

function Map() {
  const {
    deletePin,
    pins,
    setPins,
    current,
    setCurrent,
    newPin,
    setNewPin,
    fetchPins,
  } = useMapContext();
  const { user, loading } = useAppContext();

  const [viewport, setViewport] = React.useState({
    longitude: 88.3709,
    latitude: 22.4955,
    zoom: 14,
  });

  // TODO: HANDLE PIN CLICK
  const handlePinClick = (id, lat, long) => {
    setCurrent(id);
    setViewport({ ...viewport, longitude: long, latitude: lat });
  };

  // TODO: DOUBLE CLICK
  const handleDblClick = (e) => {
    const [long, lat] = e.lngLat;
    setCurrent(null);
    setNewPin({ long, lat });
  };

  useEffect(() => {
    fetchPins();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/soumikmofficial/ckxyqopyl3cz514o6q1ilwa80"
      onDblClick={(e) => handleDblClick(e)}
      transitionDuration="300"
    >
      {pins &&
        pins.map((pin) => {
          return (
            <div key={pin._id}>
              <Marker
                key={pin._id}
                latitude={pin.lat}
                longitude={pin.long}
                offsetLeft={-viewport.zoom}
                offsetTop={-viewport.zoom * 2}
              >
                <RoomIcon
                  style={{
                    fontSize: viewport.zoom * 3,
                    color:
                      user.username === pin.username
                        ? "var(--col-green)"
                        : "var(--col-red)",
                  }}
                  onClick={() => handlePinClick(pin._id, pin.lat, pin.long)}
                  className="location"
                />
              </Marker>

              {/* TODO: detailed view of single pin */}
              {current === pin._id && (
                <Fade>
                  <Popup
                    className="popup active"
                    latitude={pin.lat}
                    longitude={pin.long}
                    closeButton={false}
                    anchor="bottom"
                  >
                    <ActionBtns>
                      {user.username === pin.username && (
                        <DeleteIcon
                          className="deleteIcon"
                          onClick={() => deletePin(pin._id)}
                        />
                      )}
                      <CloseIcon
                        className="closeIcon"
                        onClick={() => setCurrent(null)}
                      />
                    </ActionBtns>
                    <PopupBox>
                      <label htmlFor="place">place</label>
                      <h2 id="place">{pin.title}</h2>
                      <label htmlFor="review">review</label>
                      <p id="review">{pin.review}</p>
                      <label htmlFor="rating">rating</label>
                      <Stars rating={pin.rating} />
                      <label htmlFor="information">information</label>
                      <p id="information">
                        Created by <span>{user.username}</span>
                      </p>
                      <p className="ago">{format(pin.updatedAt)}</p>
                    </PopupBox>
                  </Popup>
                </Fade>
              )}

              {/* TODO: create new pin */}
              {newPin && (
                <Fade>
                  <Popup
                    className="popup active"
                    latitude={newPin.lat}
                    longitude={newPin.long}
                    closeButton={false}
                    anchor="bottom"
                  >
                    <ActionBtns>
                      <CloseIcon
                        className="closeIcon"
                        onClick={() => setNewPin(null)}
                      />
                    </ActionBtns>
                    <PinForm
                      long={newPin.long}
                      lat={newPin.lat}
                      pins={pins}
                      setPins={setPins}
                      setNewPin={setNewPin}
                    />
                  </Popup>
                </Fade>
              )}
            </div>
          );
        })}
    </ReactMapGL>
  );
}

export default Map;

const PopupBox = styled.div`
  padding: 0 1.5rem;
  width: 100%;
  label {
    display: block;
    margin: 1.5rem 0 0.8rem;
    font-weight: bold;
    font-size: 1.3rem;
    text-transform: capitalize;
    color: var(--col-2);
    border-bottom: 1px solid var(--col-2);
    width: fit-content;
    padding-bottom: 0.25rem;
  }
  #review {
    font-size: 1.3rem;
  }

  #information {
    font-size: 1.3rem;
    span {
      font-weight: bold;
    }
  }

  .ago {
    margin-top: 0.5rem;
    font-size: 1.3rem;
    color: var(--col-3);
  }
`;

const ActionBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  .closeIcon,
  .editIcon,
  .deleteIcon {
    color: var(--col-2);
    cursor: pointer;
  }
`;
