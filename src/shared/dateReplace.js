export const dateReplace = (date) => {
	const date_temp = String(date).split(' ');
	const date_array = [date_temp[3], date_temp[1], date_temp[2]];
	switch (date_array[1]) {
		case 'Jan':
			date_array[1] = '01';
			break;
		case 'Feb':
			date_array[1] = '02';
			break;
		case 'Mar':
			date_array[1] = '03';
			break;
		case 'Apr':
			date_array[1] = '04';
			break;
		case 'May':
			date_array[1] = '05';
			break;
		case 'Jun':
			date_array[1] = '06';
			break;
		case 'Jul':
			date_array[1] = '07';
			break;
		case 'Aug':
			date_array[1] = '08';
			break;
		case 'Sep':
			date_array[1] = '09';
			break;
		case 'Oct':
			date_array[1] = '10';
			break;
		case 'Nov':
			date_array[1] = '11';
			break;
		case 'Dec':
			date_array[1] = '12';
			break;
		default:
			break;
	}
	const _date = date_array.join('-');
	return _date;
};
