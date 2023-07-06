import React, { FC } from 'react';

export const SliderLoader: FC = () => (
	<div className="flex justify-between bg-white">
		{Array.from(new Array(5)).map((ele, i) => (
			<div key={i} role="status" className="h-48 w-48 animate-pulse rounded-2xl bg-gray-200"></div>
		))}
	</div>
);
