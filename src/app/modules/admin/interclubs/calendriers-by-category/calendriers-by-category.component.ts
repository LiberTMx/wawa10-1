import { Component, OnInit, Input } from '@angular/core';
import { AfttDivisionCategoryEntity } from '../model/aftt/aftt-division-category.entity';
import { AfttWeekByCategory } from '../model/aftt/aftt-week-by-category.entity';
import { AfttMatchEntity } from '../model/aftt/aftt-match.entity';
import { AfttTeamEntity } from '../model/aftt/aftt-team.entity';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-admin-calendriers-by-category',
  templateUrl: './calendriers-by-category.component.html',
  styleUrls: ['./calendriers-by-category.component.scss']
})
export class CalendriersByCategoryComponent implements OnInit {

  @Input()
  afttDivisionCategory: Array<AfttDivisionCategoryEntity>;

  @Input()
  afttWeeks: Array<AfttWeekByCategory>;

  @Input()
  afttMatches: Array<AfttMatchEntity>;

  @Input()
  afttTeams: Array<AfttTeamEntity>;
  
  selectedWeek: AfttWeekByCategory=null;
  selectedTeam: AfttTeamEntity=null;

  afttFilteredMatches: Array<AfttMatchEntity>;

  constructor() { }

  ngOnInit(): void 
  {
    console.log('matches pour cat ', this.afttDivisionCategory);
    const nb = this.afttMatches!== null && this.afttMatches!==undefined 
      ? this.afttMatches.length : 0;
    console.log('nb matches:'+nb);

    this.afttFilteredMatches = this.sortMatches(this.afttMatches);
  }

  onChangeWeek(event: MatSelectChange)
  {
    console.log('week changed:', event);
    this.selectedWeek = event.value;
    this.filterMatchesByWeekAndByTeam();
  }

  onChangeTeam(event: MatSelectChange)
  {
    console.log('team changed:', event);
    this.selectedTeam = event.value;
    this.filterMatchesByWeekAndByTeam();
  }

  filterMatchesByWeekAndByTeam()
  {
    console.log('Filtering matches for: - selected week:'+this.selectedWeek?.weekName
      +', selected team: '+this.selectedTeam?.Team);

    if(   (this.selectedWeek === null || this.selectedWeek === undefined)
      &&  (this.selectedTeam === null || this.selectedTeam === undefined) )
    {
      this.afttFilteredMatches = this.sortMatches(this.afttMatches);
    }
    else if ( (this.selectedWeek === null || this.selectedWeek === undefined) )
    {
      const matches = this.afttMatches
        .filter( m => m.homeTeamId === this.selectedTeam.TeamId || m.awayTeamId === this.selectedTeam.TeamId);
      this.afttFilteredMatches = this.sortMatches(matches);
    }
    else if ( (this.selectedTeam === null || this.selectedTeam === undefined) ) 
    {
      const matches = this.afttMatches
        .filter( m => m.WeekName === this.selectedWeek.weekName );
      this.afttFilteredMatches = this.sortMatches(matches);
    }
    else 
    {
      let matches = this.afttMatches
        .filter( m => m.homeTeamId === this.selectedTeam.TeamId || m.awayTeamId === this.selectedTeam.TeamId);
      matches = matches
        .filter( m => m.WeekName === this.selectedWeek.weekName );
      this.afttFilteredMatches = this.sortMatches(matches);
    }
  }

  onClearFilter()
  {
    this.selectedTeam=null;
    this.selectedWeek=null;
    this.afttFilteredMatches = this.sortMatches(this.afttMatches);
  }

  private sortMatches(matches: Array<AfttMatchEntity>): Array<AfttMatchEntity>
  {
    return matches.sort( (m1, m2) => {
      if(m1.WeekName < m2.WeekName) return -1;
      if(m1.WeekName > m2.WeekName) return +1;

      const mm1 = m1.HomeClub === 'BBW123' ? m1.HomeTeam : m1.AwayTeam;
      const mm2 = m2.HomeClub === 'BBW123' ? m2.HomeTeam : m2.AwayTeam;

      if( mm1 < mm2) return -1;
      if( mm1 > mm2 ) return +1;
      return 0;
    });
  }
}
