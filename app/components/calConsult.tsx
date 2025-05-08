import React from "react";
import { InlineWidget } from "react-calendly";

const App = () => {
  return (
    <div className="App">
      <InlineWidget url="https://calendly.com/appointments-freetaxhistory/30min" />
    </div>
  );
};

export default App;
