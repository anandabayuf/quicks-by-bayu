import React from 'react';
import { ClockIcon, PencilIcon } from '../../../../icons';
import { DatePicker } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import dayjs from 'dayjs';

type TaskItemBodyProps = {
	dueDate: number;
	description: string;
};

const TaskItemBody: React.FC<TaskItemBodyProps> = ({
	description,
	dueDate,
}) => {
	return (
		<div className="pl-[36px]">
			<div className="flex items-center gap-x-[19.67px] mb-[24px]">
				<div>
					<ClockIcon />
				</div>

				<div>
					<DatePicker
						value={dayjs(dueDate * 1000)}
						format={{ format: 'DD/MM/YYYY' }}
						placeholder="Set Date"
					/>
				</div>
			</div>

			<div className="flex items-start gap-x-[32px]">
				<div>
					<PencilIcon />
				</div>

				<div className="w-full">
					<Paragraph
						className="max-w-[518px] lato-regular"
						editable={{
							enterIcon: null,
							text: description ? description : '',
							triggerType: ['text'],
						}}
					>
						{description || 'No Description'}
					</Paragraph>
				</div>
			</div>
		</div>
	);
};

export default TaskItemBody;
