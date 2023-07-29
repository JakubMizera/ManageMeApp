import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionalityService } from '../services/functionality.service';
import { Functionality } from '../types';

@Component({
  selector: 'app-functionality-view',
  templateUrl: './functionality-view.component.html',
  styleUrls: ['./functionality-view.component.scss'],
})
export class FunctionalityViewComponent implements OnInit {
  projectId!: number;
  functionalityId!: number;
  functionality!: Functionality | null;

  constructor(
    private route: ActivatedRoute,
    private functionalityService: FunctionalityService,
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.functionalityId = Number(this.route.snapshot.paramMap.get('functionalityId'));
    if(this.functionalityId === null) {
      throw new Error(`Cannot find functionality with id ${this.functionalityId}`);
    } else {
      this.functionality = this.functionalityService.getFunctionalityById(this.projectId, this.functionalityId);
    };
  };
}
