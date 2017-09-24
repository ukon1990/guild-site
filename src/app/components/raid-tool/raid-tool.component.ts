import { Component, OnInit } from '@angular/core';
import { GuildService } from '../../services/guild.service';

@Component({
	selector: 'app-raid-tool',
	templateUrl: './raid-tool.component.html',
	styleUrls: ['./raid-tool.component.css']
})
export class RaidToolComponent implements OnInit {
	members;

	constructor(private guildService: GuildService) {
		this.guildService.getMembers('Cannon fodder')
			.then(m => {
				this.members = m.json().members;
				console.log(m.json().members);
			})
			.catch(error => console.error('Unable to get guild members', error));
	}

	ngOnInit() {
	}

}
