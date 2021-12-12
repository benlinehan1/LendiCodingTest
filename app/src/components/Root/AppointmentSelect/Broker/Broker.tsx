import axios from "axios";
import React, { useEffect, useState } from "react";


export type AppointmentType = {
  id: number; 
  brokerId: number; 
  date: string;
}


export type BrokerType = {
    name: string;
    id: number;
    appointments: AppointmentType [];
  };

export type SelectedBrokerAppointment = BrokerType & {
  selectedAppointment: AppointmentType;
}

export interface BrokerProps {
  broker: BrokerType;
  onAppointmentClick: (selectedBrokerAppointmen: SelectedBrokerAppointment) => void;
}



const Broker = ({ broker, onAppointmentClick }: BrokerProps) => {
  const [isAppointmentsVisible, setIsAppointmentsVisible] = useState(true)
  
  const handleClick = () => {
    
    setIsAppointmentsVisible(!isAppointmentsVisible)
  }

  const selectAppointment = (appointment: AppointmentType) => {

    onAppointmentClick({...broker, selectedAppointment: appointment})

  }


  return (

    <li>
      {broker.name}
      <br />
      appointments:
      <button onClick={handleClick} disabled={!broker.appointments.length}>Hide appointments</button>
      {isAppointmentsVisible && (
        <ul>
          {broker.appointments.map((appointment) => (
                <li key={appointment.id} onClick={() => selectAppointment(appointment)}>{appointment.date}</li>
          ))}
  
        </ul>
      )}
      
    </li>
  );
};

export default Broker;
