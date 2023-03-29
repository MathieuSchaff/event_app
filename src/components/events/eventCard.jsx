import React, { useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
const EventCard = ({ event }) => {
  const inputValue = useRef();
  const router = useRouter();
  console.log(router);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValue.current.value);
    console.log("submit");
    const emailValue = inputValue.current.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const eventID = router.query.id;
    if (emailValue.match(emailPattern)) {
      try {
        const response = await fetch(`http://localhost:3000/api/registration`, {
          method: "POST",
          body: JSON.stringify({ email: emailValue, eventID }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error(`Something went wrong ${response.status}`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="event_single_page">
      <Image src={event.image} alt={event.title} width={300} height={200} />
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <form onSubmit={onSubmit} className="email_registration">
        <label htmlFor="email">Register for this event</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          ref={inputValue}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default EventCard;
