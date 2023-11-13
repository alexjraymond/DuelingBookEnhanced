import React from "react";
import yugiIcon from "../assets/images/yugi-icon.png";
import { BsDiscord } from 'react-icons/bs'

export const JoinDiscord: React.FC = () => {
	return (
		<aside className="bg-gray-700 w-full text-white p-4 mb-4 rounded-lg flex justify-center items-center align-middle text-lg space-x-4">
			<div className="flex items-center ">
				<img src={yugiIcon} alt="yugi icon" className="w-16 h-16 justify-center mb-2" />
			</div>
			<p className="">Join our Discord!</p>
			<button id="discord_button" className="bg-blue-500 font-bold flex justify-center items-center px-7 py-1 rounded-xl hover:bg-blue-400" onClick={() => window.open("https://discord.gg/hbGw3bDMfY", "_blank")}>
				<BsDiscord className="w-8 h-8 flex" />
			</button>
		</aside>
	);
};

export default JoinDiscord
