import React from 'react';
import { useTranslation } from 'react-i18next';

export const NoPage: React.FC = () => {
	const { t } = useTranslation('common');
	return <h1>{t('noPageMessage')}</h1>;
};
