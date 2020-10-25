import {Injectable} from '@angular/core';
import {FaaSPlatform, FaaSPlatformBuilder} from '../model/core/faas-platform.model';
import {HttpClient} from '@angular/common/http';
import {SearchCriteria} from '../model/core/search-criteria.model';

const platformData: string[] = [
  '/assets/data/aws-lambda.json',
  '/assets/data/azure-functions.json',
  '/assets/data/google-cloud-functions.json',
  '/assets/data/apache-openwhisk.json',
  '/assets/data/fission.json',
  '/assets/data/fn.json',
  '/assets/data/knative.json',
  '/assets/data/kubeless.json',
  '/assets/data/nuclio.json',
  '/assets/data/openfaas.json'
];

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  readonly platformLogoDir = '/assets/images/vendor/platforms/';
  platforms: FaaSPlatform[];
  platformsMap: Map<string, FaaSPlatform>;
  searchCriteria: SearchCriteria;

  constructor(private http: HttpClient) {
    this.platforms = [];
    this.platformsMap = new Map<string, FaaSPlatform>();
    this.searchCriteria = new SearchCriteria();
    this.queryPlatformsData();
  }

  queryPlatformsData() {
    // TODO: simplify querying the data
    platformData.forEach(path => {
      this.http.get<FaaSPlatform>(path)
        .subscribe(data => {
          const logoPath = this.platformLogoDir.concat(data.logoPath);
          const p = new FaaSPlatformBuilder()
            .platformName(data.platformName)
            .logoPath(logoPath)
            .description(data.description)
            .descriptionOfficial(data.descriptionOfficial)
            .businessView(data.businessView)
            .technicalView(data.technicalView)
            .build();
          this.platforms.push(p);
          this.platformsMap.set(p.id, p);
          this.populateSearchCriteria(p);
        });
    });
  }

  populateSearchCriteria(p: FaaSPlatform): void {
    this.searchCriteria.addLicensingCriteria(p.businessView.licensing);
    this.searchCriteria.addInstallationCriteria(p.businessView.installations);
    this.searchCriteria.addCodeCriteria(p.businessView.sourceCode);
    this.searchCriteria.addInterfaceCriteria(p.businessView.interfaces);
    this.searchCriteria.addDocumentationCriteria(p.businessView.documentation);
    this.searchCriteria.addQuotaCriteria(p.technicalView.development.quotas);
    this.searchCriteria.addDevelopmentCriteria(p.technicalView.development);
    this.searchCriteria.addVersioningCriteria(p.technicalView.versioning);
    this.searchCriteria.addEventSourcesCriteria(p.technicalView.eventSources);
  }

  getPlatforms(): FaaSPlatform[] {
    return this.platforms;
  }

  getPlatform(id: string) {
    return this.platformsMap.get(id);
  }

  getSearchCriteria(): SearchCriteria {
    return this.searchCriteria;
  }
}
