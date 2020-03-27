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
  platformFilter: FilterEntry[];

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
    this.platformFilter = [];
  }

  ngOnInit(): void {
  }

  filterOptions($event: MatSelectChange) {
    this.updatePlatformsFilter($event);
    this.filterPlatforms();
  }

  filterPlatforms() {
    this.filteredPlatforms = this.platforms.filter((platform) => {
      for (const entry of this.platformFilter) {
        const property: string[] = platform.getPropertyValueByFilterName(entry.name);
        if (property.filter(p => entry.values.has(p)).length <= 0) {
          return false;
        }
      }
      return true;
    });

    console.log(this.filteredPlatforms);
  }

  private updatePlatformsFilter($event: MatSelectChange) {
    this.platformFilter.forEach((entry, index) => {
      if (entry.name === $event.source.id) {
        this.platformFilter.splice(index, 1);
      }
    });
    if ($event.source.value.length > 0) {
      this.platformFilter.push(new FilterEntry($event.source.id, $event.source.value));
    }
  }
}

class FilterEntry {
  name: string;
  values: Set<string>;

  constructor(name: string, values: string[]) {
    this.name = name;
    this.values = new Set<string>(values);
  }
}

class SearchFilter {
  license: Set<string>;
  licenseType: Set<string>;
  installationType: Set<string>;
  targetHosts: Set<string>;
  codeAvailability: Set<string>;
  codeHostingPlatform: Set<string>;
  codeProgLanguage: Set<string>;
  interfaceTypes: Set<string>;
  appInterfaceOps: Set<string>;
  platformAdminOps: Set<string>;
  appDoc: Set<string>;
  platformDoc: Set<string>;
  qCodeSize: Set<string>;
  qPackageSize: Set<string>;
  qCpu: Set<string>;
  qMemory: Set<string>;
  qExecTime: Set<string>;
  qStorage: Set<string>;
}
