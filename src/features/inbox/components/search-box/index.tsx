import { Input } from 'antd';
import React from 'react';
import { InboxSearchIcon } from '../../../../icons';
import './index.scss';

const SearchBox: React.FC = () => {
	return (
		<Input
			className="custom-search-box border-[#828282] px-[58.82px] py-[10.04px] placeholder-shown:!text-[#333333]"
			placeholder="Search"
			suffix={<InboxSearchIcon />}
		/>
	);
};

export default SearchBox;
