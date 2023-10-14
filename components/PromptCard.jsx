"use Client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const PromptCard = ({ prompt, handleTagClick, handleDelete, handleEdit }) => {
	const pathName = usePathname();
	const router = useRouter();
	const { data: session } = useSession();
	const [copied, setCopied] = useState("");

	const handleCopy = () => {
		setCopied(prompt.prompt);
		navigator.clipboard.writeText(prompt.prompt);
		setTimeout(() => setCopied(""), 3000);
	};

	const handleProfileClick = () => {
		if (prompt.creator._id === session?.user.id) return router.push("/profile");

		router.push(`/profile/${prompt.creator._id}?name=${prompt.creator.username}`);
	};

	return (
		<div className="prompt_card">
			<div className="flex justify-between gap-5 items-start">
				<div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
					<Image src={prompt.creator.image} alt="user_image" width={40} height={40} className="rounded-full object-contain" />
					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">{prompt.creator.username}</h3>
						<p className="font-inter text-sm text-gray-500">{prompt.creator.email}</p>
					</div>
				</div>

				<div className="copy_btn" onClick={handleCopy}>
					<Image src={copied == prompt.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"} width={12} height={12} alt="copy" />
				</div>
			</div>

			<p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
			<p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(prompt.tag)}>
				{prompt.tag}
			</p>

			{session?.user.id === prompt.creator._id && pathName === "/profile" && (
				<div className="mt-4 flex justify-between gap-4 border-t border-gray-100 pt-3">
					<p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
						Edit
					</p>
					<p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>
						Delete
					</p>
				</div>
			)}
		</div>
	);
};

export default PromptCard;
