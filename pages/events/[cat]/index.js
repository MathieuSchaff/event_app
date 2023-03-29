import CatEvent from "@/src/components/events/catEvent.jsx";
const EventsCatPage = ({ data, pageName }) => {
  console.log(data);
  console.log(pageName);
  return <CatEvent data={data} pageName={pageName} />;
};
export default EventsCatPage;
export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const paths = events_categories.map((ev) => ({
    params: { cat: ev.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { allEvents } = await import("/data/data.json");
  const data = allEvents.filter((ev) => ev.city.toLowerCase() === params.cat);
  return {
    props: {
      data,
      pageName: params.cat,
    },
  };
}
