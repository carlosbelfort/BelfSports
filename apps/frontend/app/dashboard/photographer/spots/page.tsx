"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import SpotUpload from "@/components/SpotUpload";

export default function PhotographerSpotsPage() {
  const [events, setEvents] = useState([]);
  const [spots, setSpots] = useState([]);
  const [eventId, setEventId] = useState("");
  const [spotId, setSpotId] = useState("");

  useEffect(() => {
    api("/events").then(setEvents);
  }, []);

  useEffect(() => {
    if (eventId) {
      api(`/spots?eventId=${eventId}`).then(setSpots);
    }
  }, [eventId]);

  return (
    <div>
      <select onChange={e => setEventId(e.target.value)}>
        <option value="">Evento</option>
        {events.map(ev => (
          <option key={ev.id} value={ev.id}>{ev.title}</option>
        ))}
      </select>

      {eventId && (
        <select onChange={e => setSpotId(e.target.value)}>
          <option value="">Spot</option>
          {spots.map(sp => (
            <option key={sp.id} value={sp.id}>{sp.id}</option>
          ))}
        </select>
      )}

      {spotId && <SpotUpload spotId={spotId} />}
    </div>
  );
}