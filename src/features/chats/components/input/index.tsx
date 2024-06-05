import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';
import { useChatsStore } from '../../../../store/chats';
import { TChat, TChatItem } from '../../../../api/types';

const ChatInput: React.FC = () => {
	const [form] = Form.useForm();
	const { data, setData } = useChatsStore();

	const handleFinish: FormProps['onFinish'] = (values) => {
		if (!values) return;
		if (!data) return;
		const date =
			Math.floor(
				new Date(
					`${new Date(Date.now()).getFullYear()}-${
						new Date(Date.now()).getMonth() + 1
					}-${new Date(Date.now()).getDate()}`
				).getTime()
			) / 1000;
		const newChat: TChatItem = {
			chat: values.message,
			sender: 'You',
			time: Date.now() / 1000,
			isNewMessage: false,
		};
		const keys = Object.keys(data?.chats || {});

		if (keys.some((item) => item === date.toString())) {
			const newDataChats = [...(data?.chats[date] || [])];

			newDataChats.push(newChat);
			setData({
				...data,
				chats: {
					...data.chats,
					[date]: newDataChats,
				},
			});
		} else {
			const newDataChats: TChat = {
				...(data?.chats || {}),
				[date]: [newChat],
			};

			setData({
				...data,
				chats: newDataChats,
			});
		}

		form.resetFields();
	};

	return (
		<div className="pl-[29px] pr-[11px]">
			<Form
				onFinish={handleFinish}
				form={form}
			>
				<div className="flex items-center gap-x-2">
					<Form.Item
						noStyle
						name="message"
					>
						<Input.TextArea
							className="h-[40px] border-[1px] border-[#333] placeholder:text-[#333]"
							placeholder="Type a new message"
						/>
					</Form.Item>

					<Button
						htmlType="submit"
						className="bg-[#2F80ED] text-white text-[14px] w-[76px] h-[40px]"
					>
						Send
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default ChatInput;
