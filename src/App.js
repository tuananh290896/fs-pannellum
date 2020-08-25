import React, {useState} from "react";
import ReactDOM from "react-dom";
import { Pannellum } from "pannellum-react";
import Logo from "./images/logo.png";
import data from './data/data.json'

import "./index.css";

function parseHTML(html) {
  var t = document.createElement('template');
  t.innerHTML = html;
  return t.content.cloneNode(true);
}

function App() {
  const [item, setImage] = useState(data)

  const renderHotspot = (hotSpotDiv, args) =>{
    hotSpotDiv.classList.add('custom-tooltip');
    var span = document.createElement('span');
    var toolTip = parseHTML(`<div class="pannellumn-tootip"><p>${args.title}</p></div>`)
    hotSpotDiv.appendChild(span);
    hotSpotDiv.appendChild(toolTip);
  }

  return (
    <div className="App">
      <Pannellum
        width="100%"
        height="100vh"
        image={item.image}
        pitch={item.pitch}
        yaw={item.yaw}
        hfov={200}
        autoLoad
        showZoomCtrl={false}
        onLoad={() => {
          console.log("panorama loaded");
        }}
      >
        {
          item.hotSpots && item.hotSpots.map((hotspot, index) =>{
            return <Pannellum.Hotspot
            type="custom"
            key={index}
            pitch={hotspot.pitch}
            yaw={hotspot.yaw}
            tooltip={renderHotspot}
            tooltipArg={{'title': hotspot.title }}
            handleClick={(evt , args) => setImage(args.item)}
            handleClickArg={{ "item": hotspot }}
          />
          })
        }
      </Pannellum>

      <div className="header">
          <img src={Logo}  alt="logo Fservice" className="header-brand__logo"/>
      </div>
    </div>
  );
}

export default App;
