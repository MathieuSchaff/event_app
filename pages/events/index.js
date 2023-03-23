import Image from "next/image";
import Link from "next/link";

const Events = ({ data }) => {
  return (
    <div>
      <h1>Events</h1>
      <div>
        {data.map((ev) => {
          return (
            <Link href={`/events/${ev.id}`} key={ev.id}>
              <Image src={ev.image} alt={ev.title} width={300} height={200} />
              <h2>{ev.title}</h2>
              <p>{ev.description}</p>
            </Link>
          );
        })}{" "}
      </div>
    </div>
  );
};
export default Events;
export async function getStaticProps() {
  const { events_categories } = await import("/data/data.json");

  if (!events_categories) {
    return {
      props: {
        data: null,
      },
    };
  }
  return {
    props: {
      data: events_categories,
    },
  };
}
