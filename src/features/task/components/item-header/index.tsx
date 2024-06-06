import { Checkbox, Dropdown, Input, MenuProps } from 'antd';
import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, MoreTaskIcon } from '../../../../icons';
import { format, formatDistance } from 'date-fns';
import clsx from 'clsx';
import {
	QueryObserverResult,
	RefetchOptions,
	useMutation,
} from '@tanstack/react-query';
import { deleteTask, editTask } from '../../../../api/tasks';
import { TTask } from '../../../../api/types';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { LoadingOutlined } from '@ant-design/icons';

type TaskItemHeaderProps = {
	isActive: boolean;
	data: TTask;
	onCollapse: () => void;
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<TTask[], Error>>;
};

const TaskItemHeader: React.FC<TaskItemHeaderProps> = ({
	isActive,
	data,
	onCollapse,
	refetch,
}) => {
	const { mutateAsync: deleteTaskAsync } = useMutation({
		mutationFn: (id: string) => deleteTask(id),
	});
	const { mutateAsync: editTaskAsync, isPending } = useMutation({
		mutationFn: (payload: any) => editTask(payload.id, payload.body),
	});

	const handleDelete = async () => {
		await deleteTaskAsync(data.id);
		await refetch();
	};

	const DROPDOWN_ITEMS: MenuProps['items'] = [
		{
			key: 'delete',
			label: (
				<div
					className="text-[#EB5757]"
					onClick={handleDelete}
				>
					Delete
				</div>
			),
		},
	];

	const handleCheck: ((e: CheckboxChangeEvent) => void) | undefined = async (
		e
	) => {
		const newData: TTask = {
			...data,
			isDone: e.target.checked,
		};

		await editTaskAsync({ id: data.id, body: newData });
		await refetch();
	};

	return (
		<div className="flex items-baseline justify-between cursor-auto">
			<div className="flex items-start">
				{isPending ? (
					<LoadingOutlined />
				) : (
					<Checkbox
						checked={data.isDone}
						onChange={handleCheck}
					/>
				)}

				<div className="cursor-pointer ml-[22.5px] max-w-[335px]">
					{!data.name ? (
						<Input placeholder="Type Task Title" />
					) : (
						<div
							onClick={onCollapse}
							className={clsx(
								data.isDone
									? 'text-[#828282] line-through'
									: 'text-[#4F4F4F]',
								'lato-bold text-[14px]'
							)}
						>
							{data.name}
						</div>
					)}
				</div>
			</div>
			<div className="flex items-start">
				{!data.isDone && (
					<div className="text-[#EB5757]">
						{formatDistance(data.dueDate * 1000, Date.now(), {})}
					</div>
				)}
				<div className="ml-[19.75px] text-[#4F4F4F]">
					{format(data.dueDate * 1000, 'dd/MM/yyyy')}
				</div>
				<div
					className="cursor-pointer ml-[15.32px]"
					onClick={onCollapse}
				>
					{isActive ? <ArrowUpIcon /> : <ArrowDownIcon />}
				</div>
				<Dropdown
					trigger={['click']}
					placement="bottomRight"
					menu={{ items: DROPDOWN_ITEMS }}
					className="ml-[10px]"
				>
					<a onClick={(e) => e.preventDefault()}>
						<MoreTaskIcon />
					</a>
				</Dropdown>
			</div>
		</div>
	);
};

export default TaskItemHeader;
