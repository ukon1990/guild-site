import { Component, OnInit, Input } from '@angular/core';
import { GuildService } from '../../services/guild.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	@Input() guildName: string;
	guildRank = { score: 0, world_rank: 0, area_rank: 0, realm_rank: 0 };
	constructor(private guildSerivce: GuildService) { }

	ngOnInit() {
		this.guildSerivce.getGuildRank(this.guildName)
			.then(rank => this.guildRank = rank)
			.catch(error => console.log(error));
	}

}
