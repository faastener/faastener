import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PlatformService} from '../../../services/platform.service';
import {SearchCriteria} from '../../../model/core/search-criteria.model';
import {FaaSPlatform} from '../../../model/core/faas-platform.model';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.scss']
})

export class FilterComponent implements OnInit {
  platforms: FaaSPlatform[];
  filteredPlatforms: FaaSPlatform[];
  searchCriteria: SearchCriteria;
  platformFilter: SearchFilter = new SearchFilter();

  license = new FormControl();
  licenseType = new FormControl();
  installationType = new FormControl();
  targetHosts = new FormControl();
  codeAvailability = new FormControl();
  codeHostingPlatform = new FormControl();
  codeProgLanguage = new FormControl();
  interfaceTypes = new FormControl();
  appInterfaceOps = new FormControl();
  platformAdminOps = new FormControl();
  appDoc = new FormControl();
  platformDoc = new FormControl();
  qCodeSize = new FormControl();
  qPackageSize = new FormControl();
  qCpu = new FormControl();
  qMemory = new FormControl();
  qExecTime = new FormControl();
  qStorage = new FormControl();

  constructor(private platformService: PlatformService) {
    this.platforms = platformService.getPlatforms();
    this.filteredPlatforms = this.platforms;
    this.searchCriteria = platformService.getSearchCriteria();
  }

  ngOnInit(): void {
  }

  showOptions($event: MatSelectChange) {
    this.platformFilter[$event.source.id] = $event.source.value;
    this.filterPlatforms();
  }

  filterPlatforms() {
    this.filteredPlatforms = this.platforms.filter(platform => {
      return this.platformFilter.license.includes(platform.businessView.licensing.license.value);
    });
  }
}

class SearchFilter {
  license: string[];
  licenseType: string[];
  installationType: string[];
  targetHosts: string[];
  codeAvailability: string[];
  codeHostingPlatform: string[];
  codeProgLanguage: string[];
  interfaceTypes: string[];
  appInterfaceOps: string[];
  platformAdminOps: string[];
  appDoc: string[];
  platformDoc: string[];
  qCodeSize: string[];
  qPackageSize: string[];
  qCpu: string[];
  qMemory: string[];
  qExecTime: string[];
  qStorage: string[];
}
