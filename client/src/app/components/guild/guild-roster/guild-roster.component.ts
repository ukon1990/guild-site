import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GuildService} from "@services/guild.service";
import {Subscription} from "rxjs";
import {Roster} from "@models/guild.model";
import {ColumnDescription} from "@models/table";
import {ColumnType} from "@enums/table";
import {FormControl, FormGroup} from "@angular/forms";
import {MemberFormModel, MemberSearchModel} from "@components/guild/guild-roster/member-form.model";

@Component({
  selector: 'app-guild-roster',
  templateUrl: './guild-roster.component.html',
  styleUrls: ['./guild-roster.component.scss']
})
export class GuildRosterComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  roster?: Roster;
  tableData: any[] = [];
  // From A Murder of Crows
  guildRanks = [
    {id: -1, name: 'Guild Master'},
    {id: -1, name: 'Officer'},
    {id: -1, name: 'Officer Alt'},
    {id: -1, name: 'Class leader'},
    {id: -1, name: 'Mythic Raider'},
    {id: -1, name: 'Raider'},
    {id: -1, name: 'Member'},
    {id: -1, name: 'Alt'},
    {id: -1, name: 'Earthworm'},
    {id: -1, name: 'Initiate'},
  ].map((rank, index) => ({
    id: index,
    name: rank.name
  }));
  private rankColumn = new ColumnDescription('rank', 'Rank', ColumnType.SELECT);
  columns: ColumnDescription[] = [
    new ColumnDescription('name', 'Name', ColumnType.TEXT),
    this.rankColumn,
    new ColumnDescription('class', 'Class', ColumnType.NUMBER),
    new ColumnDescription('race', 'Race', ColumnType.NUMBER),
    new ColumnDescription('level', 'Level', ColumnType.NUMBER),
  ];
  form: FormGroup = new FormGroup<MemberFormModel>({
    name: new FormControl<string | null>(null),
    rank: new FormControl<number | null>(null),
    minimumLevel: new FormControl<number | null>(null),
    playableClass: new FormControl<number | null>(null),
  });

  constructor(
    private route: ActivatedRoute,
    private service: GuildService
  ) {
    this.rankColumn.extraData = {
      key: 'name',
      disabled: true,
      data: this.guildRanks,
    };
    this.subscriptions.add(this.form.valueChanges.subscribe(change => this.filter(change)))
  }

  ngOnInit() {
    console.log('Roster', this.route.snapshot, history.state);
    this.subscriptions.add(
      this.service.active.subscribe(active => {
        this.roster = active?.roster;
        this.filter();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private filter(
    change: MemberSearchModel = this.form.value,
    members = this.roster?.members || []
  ) {
    console.log('FILTER', change)
    this.tableData = members
      .map(member => ({
        rank: member.rank,
        name: member.character.name,
        class: member.character.playable_class?.id,
        level: member.character.level,
        race: member.character.playable_race?.id,
      }))
      .filter(member => {
        if (change.name && member.name?.toLowerCase().indexOf(change.name?.toLowerCase()) === -1) return false;
        if (change.rank && change.rank !== member.rank) return false;
        if (change.minimumLevel && change.minimumLevel > member.level) return false;
        return !(change.playableClass && change.playableClass !== member.class);


      });
  }
}
