import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getRaces, Race } from "../api";
import IndividualRace from "./IndividualRace";

interface MainPageProps {
  currentRace: string;
  setCurrentRace: Dispatch<SetStateAction<string>>;
  currentEvent: string;
  setCurrentEvent: Dispatch<SetStateAction<string>>;
}

function MainPage(props: MainPageProps) {
  const [upcomingRaces, setUpcomingRaces] = useState<Race[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getRaces()
      .then((data) => {
        if (Array.isArray(data)) {
          setUpcomingRaces(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error.response && error.status === 403) {
          alert("Unauthorized. Please login.");
        }
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="main-container">
      <h2>Upcoming Races</h2>
      {isLoading ? (
        <div>Loading...</div> // Show loading symbol while data is being fetched
      ) : (
        <div className="race-container">
          {upcomingRaces.map((race) => (
            <IndividualRace
              event={race.event}
              eventUrl={race.eventUrl}
              setCurrentRace={props.setCurrentRace}
              setCurrentEvent={props.setCurrentEvent}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MainPage;
