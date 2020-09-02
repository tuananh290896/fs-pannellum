import React, {useState} from "react";
import ReactDOM from "react-dom";
import { Pannellum } from "pannellum-react";
import Logo from "./images/logo.png";
import data from './data/data.json'
import "./index.css";
import Modal from './components/Modal';

const TYPE_SENCE = 'sence';
const TYPE_INFO = 'info';

function parseHTML(html) {
  var t = document.createElement('template');
  t.innerHTML = html;
  return t.content.cloneNode(true);
}

function App() {
  const [item, setImage] = useState(data);
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const renderHotspot = (hotSpotDiv, args) =>{
    hotSpotDiv.classList.add('custom-tooltip');
    if(args.type == TYPE_INFO){
      hotSpotDiv.classList.add('custom-tooltip-info');
    }
    var span = document.createElement('span');
    var toolTip = parseHTML(`<div class="pannellumn-tootip"><p>${args.title}</p></div>`)
    hotSpotDiv.appendChild(span);
    hotSpotDiv.appendChild(toolTip);
  }

  const actionModal = (status) => {
    setOpenModal(status)
  }

  const actionClickHotSpot = (args) => {
     let { hotspot } = args;
     
     if(hotspot.type == TYPE_INFO){
      actionModal(true);
      setDataModal({ title: hotspot.title, content: hotspot.content});
     }

     if(hotspot.type == TYPE_SENCE){
      setImage(hotspot)
     }
  }

  return (
    <div className="App">
      <Modal open={openModal} data={dataModal} action={actionModal}/>
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
            tooltipArg={{'title': hotspot.title, "content": hotspot.content, type: hotspot.type }}
            handleClick={(evt , args) => actionClickHotSpot(args)}
            handleClickArg={{ "hotspot": hotspot }}
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
