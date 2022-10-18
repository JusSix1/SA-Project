import { BrowserRouter as Router} from "react-router-dom";

import FullAppBar from "./components/FullAppBar";
import AppointmentCreate_UI from "./components/AppointmentCreate_UI";
import AppointmentTable_UI from "./components/AppointmentTable_UI";

export default function App() {

return (

  <Router>

   <div>

    <FullAppBar />
    <AppointmentCreate_UI/>
    <AppointmentTable_UI/>

   </div>

  </Router>

);

}
