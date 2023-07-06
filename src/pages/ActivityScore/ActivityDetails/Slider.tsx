import React, { useState, useEffect } from 'react';
import { useEffectOnce } from 'react-use';

import { Image } from 'primereact/image';
import { Dialog } from 'primereact/dialog';

import videoIcon from '../../../assets/icons/video-circle.svg';
import AudioIcon from '../../../assets/icons/Group171866.svg';
import DocumentIcon from '../../../assets/icons/Document.png';
import nextIcon from '../../../assets/icons/Group172562.png';
import prevIcon from '../../../assets/icons/Group172563.png';
import { SliderLoader } from './SLiderLoader';
import { Link } from 'react-router-dom';

type SliderType = {
	imagesArr: any[];
};

const Slider = ({ imagesArr }: SliderType) => {
	const [loader, setLoader] = useState(true);

	const ref: any = React.createRef();
	const referancesList: any = imagesArr.map((_) => React.createRef());
	const [visible, setVisible] = useState<boolean>(false);
	const [audioFile, setAudioFile] = useState({});
	const [active, setActive] = useState({ next: true, previous: false });
	const [scroll, setScroll] = useState(0);
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

	const handleScroll = (offset) => {
		if (ref.current) {
			ref.current.scrollLeft += offset;
			setScroll(scroll + offset);
		}
	};

	useEffect(() => {
		if (ref.current) {
			if (scroll === 0) {
				setActive((prev) => ({ next: true, previous: false }));
			}
			if (scroll > 0) {
				setActive((prev) => ({ ...prev, previous: true }));
			}

			if (scroll === (imagesArr.length - 4) * 245) {
				setActive((prev) => ({ ...prev, next: false }));
			}
			if (scroll > 0 && scroll < (imagesArr.length - 4) * 245) {
				setActive((prev) => ({ previous: true, next: true }));
			}
		}
	}, [scroll]);

	useEffectOnce(() => {
		setTimeout(() => {
			setLoader(false);
		}, 2000);
	});
	if (loader) {
		return <SliderLoader />;
	}

	return (
		<div className="align-items-center justify-content-center flex gap-2">
			{imagesArr.length > 4 && (
				<img className={`pointer w-[3em] ${!active.previous && 'disabled'} `} onClick={() => handleScroll(-245)} src={prevIcon} alt="prev" />
			)}
			<div ref={ref} className="sliderContainer">
				{imagesArr.map((file, index) => (
					<div key={index} className={`fileContainer ${file.type}`}>
						{file.type.includes('audio') ? (
							<div
								className="audioContainer pointer "
								onClick={() => {
									setVisible(true);
									setAudioFile(file.src);
								}}
							>
								<img className="audioIcon pointer" key={index} src={AudioIcon} alt="img" />
								<p className="name">{file.src.substring(file.src.length, file.src.lastIndexOf('/')).substring(1)}</p>
							</div>
						) : file.type.includes('video') ? (
							<div className="videoContainer" style={{ height: '100%' }}>
								<video ref={referancesList[index]} width="100%" height="100%" controls style={{ height: '100%' }}>
									<source src={`${import.meta.env.VITE_STORAGE}/${file.src}`} type="video/mp4" />
								</video>
								<div className="full"></div>
								<img onClick={() => playFiles(index)} className="videoIcon pointer" key={index} src={videoIcon} alt="img" />
							</div>
						) : file.type.includes('application') ? (
							<a
								href={`${import.meta.env.VITE_STORAGE}/${file.src}`}
								target="_blank"
								download
								rel="noreferrer"
								key={index}
								className="audioContainer file"
							>
								<img className="icon" src={DocumentIcon} alt="img" />
								<p className="name">{file.src.substring(file.src.length, file.src.lastIndexOf('/')).substring(1)}</p>
							</a>
						) : (
							<>
								<Image className="helperimg" src={`${import.meta.env.VITE_STORAGE}/${file.src}`} alt="Image" width="250" preview />
							</>
						)}
					</div>
				))}
			</div>
			{imagesArr.length > 4 && (
				<img className={`pointer w-[3em]  ${!active.next && 'disabled'} `} onClick={() => handleScroll(245)} src={nextIcon} alt="prev" />
			)}

			{visible && (
				<Dialog visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
					<audio className="audioDialog" controls>
						<source src={`${import.meta.env.VITE_STORAGE}/${audioFile}`} type="audio/mp3" />
					</audio>
				</Dialog>
			)}
		</div>
	);
};

export default Slider;
