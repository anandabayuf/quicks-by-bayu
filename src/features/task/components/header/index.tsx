import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import React from 'react';
import { useTaskStore } from '../../../../store';

const TaskHeader: React.FC = () => {
	const { data, setData } = useTaskStore();

	const MY_TASK_DROPDOWN_ITEMS: MenuProps['items'] = [
		{
			key: '1',
			label: 'Personal Errands',
		},
		{
			key: '2',
			label: 'Urgent To-Do',
		},
	];

	const handleAdd = () => {
		const newData = [...(data || [])];

		newData.push({
			description: '',
			isDone: false,
			name: '',
			dueDate: Date.now() / 1000,
			id: data?.length.toString() || '1',
		});

		setData(newData);
	};

	return (
		<div className="flex justify-between items-center pl-[85.23px] mb-[22px]">
			<Dropdown
				trigger={['click']}
				menu={{ items: MY_TASK_DROPDOWN_ITEMS }}
				placement="bottom"
			>
				<Button className="border-[#828282] h-[40px] text-[#4F4F4F]">
					<Space>
						My Task
						<DownOutlined />
					</Space>
				</Button>
			</Dropdown>
			<Button
				className="bg-[#2F80ED] text-white w-[98.8px] h-[40px]"
				onClick={handleAdd}
			>
				New Task
			</Button>
		</div>
	);
};

export default TaskHeader;
