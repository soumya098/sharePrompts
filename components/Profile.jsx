import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleEdit, handleDelete }) => {
	return (
		<div className="prompt_layout mt-10">
			{data.map((prompt) => (
				<PromptCard
					key={prompt._id}
					prompt={prompt}
					handleEdit={() => handleEdit && handleEdit(prompt)}
					handleDelete={() => handleDelete && handleDelete(prompt)}
				/>
			))}
		</div>
	);
};

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
	return (
		<section className="w-full">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{name} Profile</span>
			</h1>
			<p className="desc text-left">{desc}</p>

			<PromptCardList data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
		</section>
	);
};

export default Profile;
