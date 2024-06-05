import React from 'react';
import { TChat } from '../../../../api/types';
import ChatBubble from '../bubble';
import ChatDateSeparator from '../date-separator';

type ChatBodyProps = {
	data?: TChat;
};

const ChatBody: React.FC<ChatBodyProps> = ({ data }) => {
	const keys = Object.keys(data || {});

	React.useEffect(() => {
		let body = document.getElementById('body');

		if (body) body.scrollTop = body.scrollHeight;
	}, [data]);

	return (
		<div className="pl-[29px] pr-[11px]">
			<div
				id="body"
				className="h-[592px] overflow-y-scroll flex flex-col"
			>
				{keys.map((item, index) => (
					<React.Fragment key={index}>
						<ChatDateSeparator date={item} />

						{(data || {})[item].map((chat, chatIndex) => (
							<ChatBubble
								key={`${index}-${chatIndex}`}
								data={chat}
							/>
						))}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default ChatBody;
