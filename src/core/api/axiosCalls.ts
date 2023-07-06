import { UserCredentials } from '../interfaces/userInterface';
import axiosInstance from './axiosInstance';

// ------------------------------------------------------------------------------------------------ //
// !Auth
export const logout = async (): Promise<any> => {
	const res = await axiosInstance.post('/logout');
	return res.data;
};

export const userLogin = async (data: UserCredentials): Promise<any> => {
	const res = await axiosInstance.post('/login', data);
	return res.data;
};

export const userForgotPassword = async (data: { email: string }): Promise<any> => {
	const res = await axiosInstance.post('/forgot-password', data);
	return res.data;
};

export const resetPassword = async (data: { key: string; email: string; password: string; password_confirmation: string }): Promise<any> => {
	const res = await axiosInstance.post(`/reset-password`, data);
	return res.data;
};

export const ChangePass = async (data: { old_password: string; password: string; password_confirmation: string }): Promise<any> => {
	const res = await axiosInstance.post(`/change-password`, data);
	return res.data;
};

// ------------------------------------------------------------------------------------------------ //
// !Teams CRUD
export const getAllTeams = async (page: number = 1, filter: { name: string; value: number; by: string; dir: string }, search: string) => {
	return await axiosInstance.get(`/teams?page=${page}&by=${filter.by}&dir=${filter.dir}&search=${search}`).then((res) => res.data.records);
};
export const getSystemUsers = async () => {
	return await axiosInstance.get(`/users/list-of/members`).then((res) => res.data.records);
};
export const createTeam = async (body) => {
	return await axiosInstance.post(`/teams`, body).then((res) => res.data);
};
export const assignTeamMembers = async (slug, body) => {
	return await axiosInstance.post(`/teams/assign-members/${slug}`, body).then((res) => res.data);
};
export const unassignTeamMember = async (slug, body) => {
	return await axiosInstance.post(`/teams/remove-member/${slug}`, body).then((res) => res.data);
};
export const getTeam = async (slug: string) => {
	return await axiosInstance.get(`/teams/${slug}`).then((res) => res.data);
};
export const updateTeam = async (slug: string, body) => {
	return await axiosInstance.post(`/teams/${slug}`, body).then((res) => res.data);
};
export const removeTeam = async (slug: string) => {
	return await axiosInstance.delete(`/teams/${slug}`).then((res) => res.data);
};
// ------------------------------------------------------------------------------------------------ //
// !Admin Profile
export const getAdminData = async (): Promise<any> => {
	let res = await axiosInstance.get('/user/get-data');
	return res.data;
};

export const getCountries = async (): Promise<any> => {
	let res = await axiosInstance.get('/countries');
	return res.data;
};

export const getCitiesbyId = async (id: number): Promise<any> => {
	let res = await axiosInstance.get(`/countries/get-cities/${id}`);
	return res.data;
};

export const changeAdminData = async (data: {
	about: string;
	name: string;
	gender: string;
	date_of_birth: string;
	city_id?: number | null;
	country_id?: number | null;
}): Promise<any> => {
	let res = await axiosInstance.post(`/user/set-data`, data);
	return res.data;
};

export const changeAdminPhoto = async (photo: FormData) => {
	let res = await axiosInstance.post('/user/set-photo', photo);
	return res.data;
};

// ------------------------------------------------------------------------------------------------ //
// !Users Crud

export const uplaodAdminPhoto = async (photo: FormData) => {
	let res = await axiosInstance.post('/user/set-photo', photo);
	return res.data;
};

export const getAllUsers = async (data: { page: number; filter: string; search: string }) => {
	return await axiosInstance.get(`/users/with/role/member`, { params: data }).then((res) => res.data.records);
};

interface createUserParams {
	about: string;
	name: string;
	gender: string;
	email: string;
	photo: any;
	date_of_birth: string;
	city_id?: number | null | undefined;
	country_id?: number | null | undefined;
}

export const createUser = async (formData) => {
	let res = await axiosInstance.post('/users', formData);
	return res.data;
};

export const updateUser = async (formData, slug) => {
	let res = await axiosInstance.post(`/users/${slug}`, formData);
	return res.data;
};

export const deleteUser = async (slug: string) => {
	let res = await axiosInstance.delete(`/users/${slug}`);
	return res.data;
};

// ------------------------------------------------------------------------------------------------ //
// !Help Center

export const getFAQs = async () => {
	let res = await axiosInstance.get('/faqs');
	return res.data;
};

export const deleteFAQ = async (slug: string) => {
	let res = await axiosInstance.delete(`/faqs/${slug}`);
	return res.data;
};

export const createFaq = async (data) => {
	let res = await axiosInstance.post('/faqs', data);
	return res.data;
};

export interface updateFaqParams {
	data: {
		question: string;
		answer: string;
	};
	slug: string | undefined;
}

export const updateFaq = async ({ data, slug }: updateFaqParams) => {
	let res = await axiosInstance.put(`/faqs/${slug}`, data);
	return res.data;
};

// ------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------ //

// !CUPS CRUD
export const getCupsPages = async (page: number = 1, value: string, search: string) => {
	const params = {
		page,
		search,
		status: value,
	};
	return await axiosInstance.get(`/cups`, { params }).then((res) => res.data.records);
};
export const deleteCup = async (slug: string) => {
	let res = await axiosInstance.delete(`/cups/${slug}`);
	return res.data;
};

export const getSystemTeams = async (filter: string) => {
	return await axiosInstance.get(`teams/list-of/teams`, { params: { type: filter } }).then((res) => res.data.records);
};
export const checkTeamsDups = async (body: { teams: number[] }) => {
	return await axiosInstance.post('/teams/get-repeated', body).then((res) => res.data);
};
export const createCup = async (data: FormData) => {
	return await axiosInstance.post('/cups', data).then((res) => res.data);
};
export const startCup = async (slug: string) => {
	return await axiosInstance.post(`cups/rounds/start-cup/${slug}`).then((res) => res.data);
};
export const updateCup = async (slug: string, data: FormData) => {
	return axiosInstance.post(`/cups/${slug}`, data).then((res) => res.data);
};
export const swapCupTeams = async ({ slug, data }) => {
	return axiosInstance.post(`/cups/replace-team/${slug}`, data).then((res) => res.data);
};

export const reAssignTeams = async (slug: string, data: { teams: (number | null)[]; teams_count: number | null }) => {
	return axiosInstance.post(`/cups/change-teams/${slug}`, data).then((res) => res.data);
};
export const getCupRounds = async (data, slug) => {
	let res = await axiosInstance.get(`/cups/rounds/of-cup/${slug}`, { params: data });
	return res.data;
};
// !CUP KNOCKOUTS
export const getCups = async () => {
	return await axiosInstance.get(`/cups-of-user`).then((res) => res.data);
};

export const getCupKnockouts = async (slug: string) => {
	return await axiosInstance.get(`/cups/get-standing/of/${slug}`).then((res) => res.data);
};

//Notificatios
export const getAllNotifications = async (page: number) => {
	return await axiosInstance.get(`notifications/sent-by/admin` , { params: {page} }).then((res) => res.data);
};

// !Tournments Crud
export const getAllTournments = async (data: { page: number; filter: string; search: string }) => {
	return await axiosInstance.get(`/tournaments`, { params: data }).then((res) => res.data.records);
};

export const createTournment = async (formData) => {
	let res = await axiosInstance.post('/tournaments', formData);
	return res.data;
};
export const updateTournment = async (formData, slug) => {
	let res = await axiosInstance.post(`/tournaments/${slug}`, formData);
	return res.data;
};

export const deleteTournment = async (slug: string) => {
	let res = await axiosInstance.delete(`/tournaments/${slug}`);
	return res.data;
};

export const endTournament = async (slug:string) => {
	let res = await axiosInstance.post(`/tournaments/end/${slug}`);
	return res.data;
};

export const getSystemMembers = async (data) => {
	return await axiosInstance.get(`teams/list-of/teams`, { params: data }).then((res) => res.data.records);
};


export const AssignTeamsToTournment = async (data: any, slug) => {
	let res = await axiosInstance.post(`/tournaments/assign-teams/${slug}`, data);
	return res.data;
};

export const getTournment = async (slug) => {
	let res = await axiosInstance.get(`/tournaments/${slug}`);
	return res.data;
};

export const getTournmentRounds = async (data, slug) => {
	let res = await axiosInstance.get(`/tournaments/rounds/of-tournament/${slug}`, { params: data });
	return res.data;
};

export const deleteTournmentRound = async (slug: string) => {
	let res = await axiosInstance.delete(`/tournaments/rounds/${slug}`);
	return res.data;
};

export const createRound = async (data) => {
	let res = await axiosInstance.post('tournaments/rounds', data);
	return res.data;
};

export const updateRound = async (data, slug) => {
	let res = await axiosInstance.put(`/tournaments/rounds/${slug}`, data);
	return res.data;
};

// !Tournaments standing
export const getTournaments = async () => {
	return await axiosInstance.get(`/tournaments-with-standing`).then((res) => res.data);
};

export const getTournamentStanding = async (slug) => {
	return await axiosInstance.get(`admin/get-standing/of/${slug}`).then((res) => res.data);
};


//  !COMMON ROUNDS ACTIONS
export const startTournamentRound = async (slug:string)=>{
	return await axiosInstance.post(`/tournaments/rounds/start-round/${slug}`)
}
// startCupRound
export const startCupRound = async (cupslug:string,params)=>{
	return await axiosInstance.post(`/cups/rounds/start-round/${cupslug}`,params)
}
export const publishRoundScores = async (type:string,slug:string)=>{
	return await axiosInstance.post(`/${type}/publish-result/of/${slug}`)
}
// !Activities

export const getAllActivities = async (data, body) => {
	let res = await axiosInstance.get(`/rounds/activities/of-round/${body.round}/${body.type}`, { params: data });
	return res.data;
};

export const deleteActivity = async (slug: string) => {
	let res = await axiosInstance.delete(`rounds/activities/${slug}`);
	return res.data;
};

export const getAssignees = async (slug) => {
	return await axiosInstance.get(`teams/${slug}`).then((res) => res.data);
};

export const createActivity = async (formData) => {
	let res = await axiosInstance.post('/rounds/activities', formData);
	return res.data;
};
export const updateActivity = async (formData, slug) => {
	let res = await axiosInstance.post(`/rounds/activities/${slug}`, formData);
	return res.data;
};
export const getAssignedTeams = async (slug:string)=>{
	return await axiosInstance.get(`/activities/scores/${slug}`).then((res) => res.data);
}

export const userActivityAnswer =async (id:number) => {
	return await axiosInstance.get(`/answers/${id}`).then((res) => res.data);
}

export const giveUserScore = async (id:number,score:number)=>{
	return await axiosInstance.post(`/answers/scores/${id}`,{score}).then((res) => res.data);

}
export const getActivityData = async (slug) => {
	return await axiosInstance.get(`rounds/activities/${slug}`).then((res) => res.data);
};

export const handelRemoveReqFile = async (id) => {
	return await axiosInstance.get(`rounds/remove/activity-file/${id}`).then((res) => res.data);
};

export const handelAddReqFile = async (slug, formData) => {
	return await axiosInstance.post(`rounds/add/activity-files/${slug}`, formData).then((res) => res.data);
};
