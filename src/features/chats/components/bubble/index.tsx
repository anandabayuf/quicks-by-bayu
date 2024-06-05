import React from 'react';
import { TChatItem } from '../../../../api/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import NewMessageSeparator from '../new-message-separator';
import { MoreIcon } from '../../../../icons';
import { Dropdown, MenuProps } from 'antd';

type ChatBubbleProps = {
	data: TChatItem;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ data }) => {
	const DROPDOWN_ITEMS = (): MenuProps['items'] => {
		if (data.sender !== 'You')
			return [
				{
					key: 'delete',
					label: <div className="text-[#EB5757]">Delete</div>,
				},
			];

		return [
			{
				key: 'edit',
				label: <div className="text-[#2F80ED]">Edit</div>,
			},
			{
				key: 'delete',
				label: <div className="text-[#EB5757]">Delete</div>,
			},
		];
	};

	return (
		<>
			{data.isNewMessage && <NewMessageSeparator />}
			<div className="m-[10px]">
				<div
					style={{
						color: data?.senderColor
							? data?.senderColor
							: data.sender === 'You'
							? '#9B51E0'
							: '#2F80ED',
					}}
					className={clsx(
						data.sender === 'You' ? 'justify-end' : 'justify-start',
						'flex lato-regular text-[14px] mb-[8.89px]'
					)}
				>
					{data.sender}
				</div>

				<div
					className={clsx(
						'flex',
						data.sender === 'You' ? 'justify-end' : 'justify-start'
					)}
				>
					<div
						className={clsx(
							'flex items-start gap-x-2',
							data.sender === 'You'
								? 'flex-row-reverse'
								: 'flex-row'
						)}
					>
						<div
							style={{
								backgroundColor: data?.bubbleColor
									? data.bubbleColor
									: data.sender === 'You'
									? '#EEDCFF'
									: '#F8F8F8',
							}}
							className="flex-col max-w-[518px] text-[#4F4F4F] p-[10px] rounded-[5px]"
						>
							<div className="mb-2">{data.chat}</div>
							<div className="text-[12px]">
								{format(data.time * 1000, 'HH:mm')}
							</div>
						</div>

						<Dropdown
							menu={{ items: DROPDOWN_ITEMS() }}
							trigger={['click']}
						>
							<a onClick={(e) => e.preventDefault()}>
								<MoreIcon />
							</a>
						</Dropdown>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatBubble;
