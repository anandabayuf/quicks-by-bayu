import React from 'react';
import { ArrowDownwardIcon } from '../../../../icons';

const NewMessageSeparator: React.FC = () => {
	return (
		<>
			<div className="flex justify-center items-center">
				<hr className="h-0 w-full border-[#EB5757]" />
				<div className="flex items-center w-[50%] justify-center gap-x-2">
					<div className="text-[#EB5757] lato-bold font-[14px]">
						New Message
					</div>
					<div>
						<ArrowDownwardIcon />
					</div>
				</div>
				<hr className="h-0 w-full border-[#EB5757]" />
			</div>
		</>
	);
};

export default NewMessageSeparator;
