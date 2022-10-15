import React from "react";
import { useParams } from "react-router-dom";
import Carrousel from "../../components/Carrousel/Carrousel";
import Collapse from "../../components/Collapse/Collapse";
import Host from "../../components/Host/Host";
import Rate from "../../components/Rate/Rate";
import Tag from "../../components/Tag/Tag";
import data from "../../datas/logements.json";

export default function FicheLogement() {
	const params = useParams();
	const pickedAppart = data.find(({ id }) => id === params.id);
	const tags = pickedAppart.tags;
	const equipments = pickedAppart.equipments;
	const equip = equipments.map((item, index) => <li key={index} className="equipList">{item}</li>);
	return (
		<div key={params.id} className="fiche-container">
			<Carrousel />
			<div className="title-host-container">
				<div className="ficheTitleContainer">
					<h1>{pickedAppart.title}</h1>
					<h3>{pickedAppart.location}</h3>
				</div>
				<Host />
			</div>
			<div className="tags-container">
				{tags.map((tag) => (
					<Tag key={tag} tag={tag} />
				))}
			</div>
			<div className="rate-container">
				<Rate />
			</div>
			<div className="collapse-fiche-content">
				<Collapse
					aboutTitle="Description"
					aboutText={pickedAppart.description}
				/>
				<Collapse aboutTitle="Équipements" aboutText={equip} />
			</div>
		</div>
	);
}
