import * as actionConstants from './actionConstants';

//ASYNC THUNK


//ACTION CREATORS

export const loading = () => {
	return {
		type:actionConstants.LOADING
	}
}

export const stopLoading = () => {
	return {
		type:actionConstants.STOP_LOADING
	}
}

const registerSuccess = () => {
	return {
		type:actionConstants.REGISTER_SUCCESS
	}
}

export const registerFailed = (error) => {
	return {
		type:actionConstants.REGISTER_FAILED,
		error:error
	}
}