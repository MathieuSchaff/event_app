import React from "react";

import Image from "next/image";
const EventCard = ({ event }) => {
  return (
    <div>
      <Image src={event.image} alt={event.title} width={300} height={200} />
      <h1>{event.title}</h1>
      <p>{event.description}</p>
    </div>
  );
};

export default EventCard;
