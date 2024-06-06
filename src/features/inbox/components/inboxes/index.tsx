import React from 'react';
import SearchBox from '../search-box';
import { useQuery } from '@tanstack/react-query';
import { getAllInboxes } from '../../../../api/inboxes';
import Loading from '../../../../components/loading';
import InboxesItem from '../inboxes-item';
import { TInboxes } from '../../../../api/types';
import { useInboxesStore } from '../../../../store';

const Inboxes: React.FC = () => {
	const { isFetching } = useQuery<TInboxes[]>({
		queryKey: ['getAllInboxes'],
		queryFn: getAllInboxes,
	});
	const { data } = useInboxesStore();

	return (
		<div className="absolute right-[34px] bottom-[110px] h-[737px] w-[734px] bg-white py-[24px] px-[32px] rounded-md">
			<SearchBox />

			{isFetching ? (
				<Loading loadingText="Loading Chats ..." />
			) : (
				data?.map((item, index) => (
					<InboxesItem
						key={index}
						data={item}
						isLastItem={index + 1 === data.length}
					/>
				))
			)}
		</div>
	);
};

export default Inboxes;
