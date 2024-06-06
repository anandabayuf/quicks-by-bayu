import React from 'react';

type BookmarksIconProps = {
	isLightsUp?: boolean;
};

export const BookmarksIcon: React.FC<BookmarksIconProps> = ({ isLightsUp }) => {
	return isLightsUp ? (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15.4032 0.833374H7.52334C6.65742 0.833374 5.95681 1.58337 5.95681 2.50004H13.8288C14.6947 2.50004 15.4032 3.25004 15.4032 4.16671V15L16.9776 15.8334V2.50004C16.9776 1.58337 16.2691 0.833374 15.4032 0.833374ZM12.2545 5.83337V16.6417L8.94038 15.1334L8.31849 14.85L7.69661 15.1334L4.38249 16.6417V5.83337H12.2545ZM4.38245 4.16671H12.2545C13.1204 4.16671 13.8289 4.91671 13.8289 5.83337V19.1667L8.31845 16.6667L2.80804 19.1667V5.83337C2.80804 4.91671 3.51653 4.16671 4.38245 4.16671Z"
				fill="#2F80ED"
			/>
		</svg>
	) : (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15.4033 0.833374H7.5234C6.65748 0.833374 5.95687 1.58337 5.95687 2.50004H13.8289C14.6948 2.50004 15.4033 3.25004 15.4033 4.16671V15L16.9777 15.8334V2.50004C16.9777 1.58337 16.2692 0.833374 15.4033 0.833374ZM12.2546 5.83337V16.6417L8.94044 15.1334L8.31855 14.85L7.69667 15.1334L4.38255 16.6417V5.83337H12.2546ZM4.38251 4.16671H12.2545C13.1204 4.16671 13.8289 4.91671 13.8289 5.83337V19.1667L8.31851 16.6667L2.80811 19.1667V5.83337C2.80811 4.91671 3.51659 4.16671 4.38251 4.16671Z"
				fill="#828282"
			/>
		</svg>
	);
};