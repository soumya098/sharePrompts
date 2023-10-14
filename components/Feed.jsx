"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="prompt_layout mt-16">
			{data.map((prompt) => (
				<PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick} />
			))}
		</div>
	);
};

const feed = () => {
	const [searchText, setSearchText] = useState("");
	const [prompts, setPrompts] = useState([]);
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);

	useEffect(() => {
		const fetchPrompts = async () => {
			const res = await fetch("/api/prompt");
			const data = await res.json();
			setPrompts(data);
		};

		fetchPrompts();
	}, []);

	const filterPrompts = (text) => {
		const regex = new RegExp(text, "i"); // 'i' flag for case-insensitive search
		return prompts.filter((item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt));
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPrompts(e.target.value);
				setSearchedResults(searchResult);
			}, 500)
		);
	};

	const handleTagClick = (tag) => {
		setSearchText(tag);

		const searchResult = filterPrompts(tag);
		setSearchedResults(searchResult);
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input type="text" placeholder="Search" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
			</form>

			{searchText ? (
				<PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
			) : (
				<PromptCardList data={prompts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default feed;
