import React from "react";
import styled from "styled-components";
import { SelectedBrokerAppointment } from "../AppointmentSelect/Broker";


const Wrapper = styled.div`
  background-color: #e7e7e7;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  padding: 24px 48px;
  box-shadow: 1px 1px 1px #b8b8b8;
  margin-bottom: 48px;
`;

type NavigationProps = {
  selectedBrokerAppointment: SelectedBrokerAppointment,
}



// console.log(selectedBrokerAppointment)

  const Navigation = ({ selectedBrokerAppointment }:NavigationProps) => {

    return (
      <Wrapper >
        {selectedBrokerAppointment && 
            (<strong>

              {`Currently selected appointment: ${selectedBrokerAppointment?.selectedAppointment?.date} with ${selectedBrokerAppointment?.name}`}
              </strong>
            )
        }
        
        <strong>Welcome to Lendi</strong>
      </Wrapper>
    );
  };


export default Navigation;
