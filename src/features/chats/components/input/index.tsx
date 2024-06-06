import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';
import { useChatsStore } from '../../../../store/chats';
import { TChat, TChatItem, TChats } from '../../../../api/types';
import {
	QueryObserverResult,
	RefetchOptions,
	useMutation,
} from '@tanstack/react-query';
import { editChatByInboxId } from '../../../../api/chats';
import ChatReply from '../reply';
import clsx from 'clsx';

type ChatInputProps = {
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<TChats, Error>>;
};

const ChatInput: React.FC<ChatInputProps> = ({ refetch }) => {
	const [form] = Form.useForm();
	const { data, selectedId, setSelectedId } = useChatsStore();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: (payload: any) =>
			editChatByInboxId(payload.id, payload.body),
	});

	const handleFinish: FormProps['onFinish'] = async (values) => {
		if (!values) return;
		if (!data) return;
		const message = values.message.trim();
		if (!message) return;
		const date =
			Math.floor(
				new Date(
					`${new Date(Date.now()).getFullYear()}-${
						new Date(Date.now()).getMonth() + 1
					}-${new Date(Date.now()).getDate()}`
				).getTime()
			) / 1000;
		const keys = Object.keys(data?.chats || {});

		if (keys.some((item) => item === date.toString())) {
			const newDataChats = [...(data?.chats[date] || [])].map((item) => {
				return {
					...item,
					isNewMessage: false,
				};
			});
			const newChat: TChatItem = {
				id: `${date}-${newDataChats.length + 1}`,
				replyId: selectedId || '',
				chat: message,
				sender: 'You',
				time: Date.now() / 1000,
				isNewMessage: false,
			};
			newDataChats.push(newChat);
			await mutateAsync({
				id: data.id,
				body: {
					...data,
					chats: {
						...data.chats,
						[date]: newDataChats,
					},
				},
			});
			await refetch();
		} else {
			const newChat: TChatItem = {
				id: `${date}-1`,
				replyId: selectedId || '',
				chat: message,
				sender: 'You',
				time: Date.now() / 1000,
				isNewMessage: false,
			};

			let newDataChats: TChat = {
				...(data?.chats || {}),
				[date]: [newChat],
			};

			for (let key of Object.keys(newDataChats)) {
				newDataChats[key] = newDataChats[key].map((item) => {
					return {
						...item,
						isNewMessage: false,
					};
				});
			}

			await mutateAsync({
				id: data.id,
				body: {
					...data,
					chats: newDataChats,
				},
			});
			await refetch();
		}

		form.resetFields();
		setSelectedId(null);
	};

	return (
		<div className="pl-[29px] pr-[11px]">
			{selectedId && <ChatReply />}
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
							className={clsx(
								selectedId && 'rounded-t-none',
								'h-[40px] border-[1px] border-[#828282] placeholder:text-[#333]'
							)}
							placeholder="Type a new message"
							onKeyDown={(e) => {
								if (e.code === 'Enter' && e.shiftKey == false) {
									e.preventDefault();
									handleFinish(form.getFieldsValue());
								}
							}}
						/>
					</Form.Item>

					<Button
						htmlType="submit"
						loading={isPending}
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
