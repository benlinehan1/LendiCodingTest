import { useEffect, useState } from "react";
import Broker, { BrokerType, AppointmentType, SelectedBrokerAppointment } from "./Broker";
import axios from "axios";
import styled from "styled-components";





const Wrapper = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  width: 250px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 2 })`
  display: block;
  font-size: 20px;
`;

type BrokerAppointments = {
  id: number;
  name: string;
  appointments: { id: number; brokerId: number; date: string }[];
}[];

type AppointmentSelectProps = {
  selectedBrokerAppointment: SelectedBrokerAppointment,
  onSelectedBrokerAppointment: (selectedBrokerAppointment: SelectedBrokerAppointment) => void
}


const AppointmentSelect = ({ selectedBrokerAppointment, onSelectedBrokerAppointment}: AppointmentSelectProps) => {

  const [brokerAppointments, setBrokerAppointments] = useState([])

  

  useEffect(() => {
    async function fetchBrokers() {
      const [response1, response2] = await Promise.all([axios
        .get("http://localhost:8080/brokers"), axios
          .get("http://localhost:8080/appointments")]);
       
      const {data: brokers } = response1;
      const { data: appointments } = response2;
      

      setBrokerAppointments(brokers.map((broker: BrokerType) => ({
        id: broker.id,
          name: broker.name,
                  appointments: appointments.filter(({brokerId }) => brokerId === broker.id)
      })));
    }

    fetchBrokers()

  }, [])



 

  if(!brokerAppointments) {
    return null
  } 
  

  return (
    <Wrapper>
      <SideBar>
        <Heading>Amazing site</Heading>
        TODO: populate brokers
        <ul>
          {brokerAppointments.map((broker) => (
            <Broker key={broker.id} broker={broker} onAppointmentClick={onSelectedBrokerAppointment} />
          ))}
        </ul>
      </SideBar>
      <div>
        <Heading>Appointment details</Heading>
        {selectedBrokerAppointment && (
          <div>
            <h2>Appointment: {selectedBrokerAppointment.selectedAppointment.date}</h2>
            <h3>Broker Name: {selectedBrokerAppointment.name}</h3>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default AppointmentSelect;
