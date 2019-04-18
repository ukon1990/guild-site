import { Component, OnInit } from '@angular/core';
import { GuildService } from '../../services/guild.service';

@Component({
	selector: 'app-logs',
	templateUrl: './logs.component.html',
	styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
	reports: any[];

	constructor(private guildService: GuildService) {
		this.guildService.getGuildLogs()
		.then( result => {
			console.log(result);
			this.reports = result.sort( (a, b) => a.start < b.start ? 1 : -1 );
		}
		).catch( error => console.log(error));
	}

	ngOnInit() {
	}

	getLog(id: string): void {
		this.guildService.getGuildLogFights(id)
			.then(r => console.log(r))
			.catch(e => console.error(':(', e));
	}
}