class TimeConverter {
	static converter(date) {
		let time;
		let hr: any = '00';
		let sec = '00';
		let min = '00';
		if (date < 60) {
			min = date;
		} else if (date >= 60 && date < 1440) {
			min = `${date - 60}`;
			hr = `${Math.floor(date / 60)}`;
		}
		time = `${hr}:${min}:${sec}`;
		return time;
	}
}

export default TimeConverter;
