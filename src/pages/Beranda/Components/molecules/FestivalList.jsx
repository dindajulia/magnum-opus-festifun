// import { BangunJowo, Ceremony, FBudaya, amikom } from "../../../../assets/main"
import CardComponent from "../../../../components/molecules/Card"
import  { useEffect, useState } from 'react';
import axios from 'axios';
function FestivalList() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/events/1')
      .then((res) => {
        const sortedData = res.data.data.sort((a, b) => b.eventID - a.eventID);
        setEvents(sortedData.slice(0, 4));
       
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
    <div className="card-container">
      {events.map((event) => (
        <CardComponent
          key={event.eventID}
          title={event.name}
          price={event.price}
        />
      ))}
    </div>
  </>
    // <div className="card-container">
    //  <CardComponent image={amikom} title="AMIKOM FEST 2023 BE YOUNG FOREVER" price='50.000'/>
    //   <CardComponent image={Ceremony} title="CLOSING CEREMONY - CONTINUE THE CHAPTER TO BECOME STONGER" price='50.000'/>
    //   <CardComponent image={FBudaya} title="FESTIVAL BUDAYA LERENG MERAPI PAKEM SLEMAN" price='50.000'/>
    //   <CardComponent image={BangunJowo} title="BANGUNJUWO FESTIFAL #2 SEKAR MATARAM" price='50.000'/>
    // </div>
  )
}

export default FestivalList