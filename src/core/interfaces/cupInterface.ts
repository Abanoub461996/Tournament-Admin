export interface Team {
	name: string;
	slug: string;
	photo: string;
	members_count: number;
	id: number | null;
    slogan: string,
	type: string,
	cover: string,
	created_at: string,
}
export const teamInit: Team = {
	name: '',
	slug: '',
	photo: '',
	members_count: 0,
	id: null,
    slogan: '',
	type: '',
	cover: '',
	created_at: '',
	
};
export interface CupInterface {
	id: number | null;
	name: string;
	slug: string;
	status: string;
	type: string;
	photo: string;
	start_date: string;
	created_at: string;
	end_date: string;
	teams_count: null;
	teams?: Team;
}
export const cupinit = {
	id: null,
	name: '',
	slug: '',
	status: '',
	type: '',
	photo: '',
	start_date: '',
	created_at: '',
	end_date: '',
	teams_count: null,
};
