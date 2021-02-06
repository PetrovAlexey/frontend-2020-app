import styled from "styled-components";
import EdiText from "react-editext";


const StyledEdiText = styled(EdiText)`
          button {
            border-radius: 5px;
          }
          button[editext="edit-button"] {
            color: #000;
            width: 100%;
          }
          button[editext="save-button"] {
            width: 100%;
            &:hover {
              background: greenyellow;
            }
          }
          button[editext="cancel-button"] {
            width: 100%;
            &:hover {
              background: crimson;
              color: #fff;
            }
          }
          input, textarea {
            font-size: 28pt;            
            font-weight: bold;
            font-family: "Times New Roman", Times, serif;
            border-radius: 5px;
          }
          div[editext="view-container"], div[editext="edit-container"] {
            font-size: 28pt;
            font-weight: bold;
            font-family: "Times New Roman", Times, serif;
            padding: 15px;
            border-radius: 5px;
        }`

const StyledEdiTextArea = styled(EdiText)`
          button {
            border-radius: 5px;
          }
          button[editext="edit-button"] {
            color: #000;
            width: 100%;
          }
          button[editext="save-button"] {
            width: 100%;
            &:hover {
              background: greenyellow;
            }
          }
          button[editext="cancel-button"] {
            width: 100%;
            &:hover {
              background: crimson;
              color: #fff;
            }
          }
          input, textarea {
            font-size: 18pt;            
            font-family: "Times New Roman", Times, serif;
            border-radius: 5px;
          }
          div[editext="view-container"], div[editext="edit-container"] {
            font-size: 18pt;
            font-family: "Times New Roman", Times, serif;
            padding: 15px;
            border-radius: 5px;
        }`

export {StyledEdiText, StyledEdiTextArea}