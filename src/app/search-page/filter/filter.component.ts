import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataService} from '../../core/services/data.service';
import {SearchCriteria} from '../../models/core/search-criteria.model';
import {FaaSPlatform} from '../../models/core/faas-platform.model';
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
  qPackageSize = new FormControl();
  qExecTime = new FormControl();
  devRuntimes = new FormControl();
  runtimeCustomization = new FormControl();
  devEditors = new FormControl();
  clientLibs = new FormControl();
  functionVersions = new FormControl();
  appVersions = new FormControl();
  syncEndpoint = new FormControl();
  asyncEndpoint = new FormControl();
  endpointCustomization = new FormControl();
  tls = new FormControl();
  fileDataStore = new FormControl();
  database = new FormControl();
  scheduler = new FormControl();
  messageQueue = new FormControl();
  streamProcessing = new FormControl();
  specService = new FormControl();
  integration = new FormControl();

  constructor(private platformService: DataService) {
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
