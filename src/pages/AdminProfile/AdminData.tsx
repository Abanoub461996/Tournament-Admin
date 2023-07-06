import * as React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { classNames } from 'primereact/utils';

interface adminDataCollection {
	about: string;
	gender: string;
	date_of_birth: string;
	email: string;
	name: string;
	city: { name: string };
	country: { name: string };
}

interface adminDataProps {
	adminData: adminDataCollection;
}

const AdminData = ({ adminData }: adminDataProps) => {
	const { t } = useTranslation();

	return (
		<div className="userDataContainer">
			{adminData?.about && <RenderContent title={`${t('About me')}`} content={adminData?.about} />}
			<div className="tablet__view">
				<RenderContent title={`${t('Gender')}`} content={adminData?.gender} />
				<RenderContent classProps="birthday__tablet" title={`${t('Date of birth')}`} content={moment(adminData?.date_of_birth).format('D MMM,YYYY')} />
			</div>
			<div className="tablet__view">
				<RenderContent title={`${t('Email Address')}`} content={adminData?.email} />
				<RenderContent title={`${t('Location')}`} content={`${adminData?.city?.name},${adminData?.country?.name}`} />
			</div>
		</div>
	);
};

export default AdminData;

type RenderContentType = {
	title: string;
	content: string;
	classProps?: string;
};

const RenderContent = ({ title, content, classProps = 'desktop__view' }: RenderContentType) => {
	return (
		<div className={`infoContainer ${classProps}`}>
			<p className="title">{title}</p>
			<span className="content">{content}</span>
		</div>
	);
};
