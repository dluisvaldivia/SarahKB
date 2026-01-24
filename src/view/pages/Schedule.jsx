import React, {useEffect} from 'react';

export default function Schedule() {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);
      }, []);
    
      return (
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/sarahbuendia/curiosity-call"
          style={{ minWidth: "320px", height: "700px" }}
        />
      );
}