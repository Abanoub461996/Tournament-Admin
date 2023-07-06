import React, { useState } from "react";

import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";

import videoIcon from "../../../assets/icons/video-circle.svg";
import AudioIcon from "../../../assets/icons/Group171866.svg";
import DocumentIcon from "../../../assets/icons/Document.png";

type DraggableType = {
  imagesArr: any[];
};

const Draggable = ({ imagesArr }: DraggableType) => {
  const ref: any = React.createRef();
  const referancesList: any = imagesArr.map((_) => React.createRef());
  const [visible, setVisible] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState({});
  const [scrolling, setScrolling] = useState({
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  });
  const onMouseDown = (e) => {
    const slider = ref.current;
    setScrolling((prev) => ({
      ...prev,
      isScrolling: true,
      scrollX: slider.scrollLeft,
      clientX: e.clientX - slider.offsetLeft,
    }));
  };

  const onMouseUp = () => {
    setScrolling((prev) => ({
      ...prev,
      isScrolling: false,
    }));
  };

  const onMouseMove = (e) => {
    const slider = ref.current;

    if (!scrolling.isScrolling) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - scrolling.clientX; //scroll-fast
    slider.scrollLeft = scrolling.scrollX - walk;
  };

  const playFiles = (index) => {
    referancesList[index].current.requestFullscreen();
    referancesList[index].current.play();
  };

  const fileSizeTrancfere = (fileSize) => {
    if (fileSize <= 1000) {
      return `${fileSize}Kb`;
    } else {
      return `${Math.floor(fileSize / 1000).toFixed(1)} MB`;
    }
  };

  return (
    <div
      ref={ref}
      onMouseDown={(e) => onMouseDown(e)}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={(e) => onMouseMove(e)}
      className="sliderContainer"
    >
      {imagesArr.map((file, index) => (
        <div key={index} className={`fileContainer ${file.type}`}>
          {file.type === "audio" ? (
            <div
              className="audioContainer pointer "
              onClick={() => {
                setVisible(true);
                setAudioFile(file.file);
              }}
            >
              <img
                className="audioIcon pointer"
                key={index}
                src={AudioIcon}
                alt="img"
              />
              <p className="name">
                {file.file
                  .substring(file.file.length, file.file.lastIndexOf("/"))
                  .substring(1)}
              </p>
              <p className="size">{fileSizeTrancfere(file.size)}</p>
            </div>
          ) : file.type === "video" ? (
            <div className="videoContainer" style={{ height: "100%" }}  >
              <video
                ref={referancesList[index]}
                width="100%"
                height="100%"
                controls
                style={{ height: "100%" }}
                
              >
                <source
                  src={`${process.env.REACT_APP_STORAGE}${file.file}`}
                  type="video/mp4"
                />
              </video>
              <div className="full"></div>
              <img
                onClick={() => playFiles(index)}
                className="videoIcon pointer"
                key={index}
                src={videoIcon}
                alt="img"
              />
            </div>
          ) : file.type === "application" ? (
            <a
              href={`${process.env.REACT_APP_STORAGE}${file.file}`}
              target="_blank"
              download
              rel="noreferrer"
              key={index}
              className="audioContainer"
            >
              <img className="icon" src={DocumentIcon} alt="img" />
              <p className="name">
                {file.file
                  .substring(file.file.length, file.file.lastIndexOf("/"))
                  .substring(1)}
              </p>
              <p className="size">{fileSizeTrancfere(file.size)}</p>
            </a>
          ) : (
            <Image
              className="helperimg"
              src={`${process.env.REACT_APP_THUMBNAILS}${file.file}`}
              alt="Image"
              width="250"
                    preview
       
            />
          )}
        </div>
      ))}
      {visible && (
        <Dialog
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <audio className="audioDialog" controls>
            <source
              src={`${process.env.REACT_APP_STORAGE}${audioFile}`}
              type="audio/mp3"
            />
          </audio>
        </Dialog>
      )}
    </div>
  );
};

export default Draggable;
