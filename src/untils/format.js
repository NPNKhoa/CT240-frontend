export const formatDate = (dateString) => {
	// console.log('dateString: ', dateString)
	if (!dateString) {
		return dateString
	} else {
		return dateString.split('T')[0].split('-').reverse().join('/')
	}
}
export const formatDateToSubmit = (dateString) => {
	// console.log('dateString: ', dateString)
	if (!dateString) {
		return dateString
	} else {
		return dateString.split('/').reverse().join('-')
	}
}
export const formatDateForTextField = (dateString) => {
	// console.log('dateString: ', dateString)
	if (!dateString) {
		return dateString
	} else {
		return dateString.split('T')[0].split('-').join('-')
	}
}