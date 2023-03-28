import AllEvents from "@/src/components/events/events-page";

const Events = ({ data }) => {
  return <AllEvents data={data} />;
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
