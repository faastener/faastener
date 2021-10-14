import {Observable} from 'rxjs';
import {
  ClassificationCriterion,
  ClassificationFramework,
  ClassificationView,
  ClassificationViewCombination,
  CriteriaGrouping
} from '../../shared/interfaces/classification';
import {Technology, TechnologyCategory, TechnologyDossier} from '../../shared/interfaces/technology';
import {TechnologyFilterConfiguration} from '../../shared/interfaces/filtering';
import {
  ClassificationViewCombinationResponse,
  ClassificationViewResponse,
  CriteriaGroupingResponse
} from '../../shared/interfaces/responses';
import {InfoResourceSection} from '../../shared/interfaces/info';

export abstract class DataService {

  protected constructor() {
  }

  public abstract getCriteria(): Observable<ClassificationCriterion[]>;

  public abstract getGroupings(): Observable<CriteriaGrouping[]>;

  public abstract getViews(): Observable<ClassificationView[]>;

  public abstract getViewCombinations(): Observable<ClassificationViewCombination[]>;

  public abstract getFrameworks(): Observable<ClassificationFramework[]>;

  public abstract getFrameworkForCategory(techCategory: TechnologyCategory): Observable<ClassificationFramework>;

  public abstract getFrameworkForTechnologyType(category: string): Observable<ClassificationFramework>;

  public abstract getTechnologies(withDossier?: boolean): Observable<Technology[]>;

  public abstract getTechnologiesOfCategory(category: string, withDossier?: boolean): Observable<Technology[]>;

  public abstract getTechnology(id: string, withDossier?: boolean): Observable<Technology>;

  public abstract getDossier(technologyId: string): Observable<TechnologyDossier>;

  public abstract getDossiersOfCategory(category: string): Observable<TechnologyDossier[]>;

  public abstract getTechnologyFilter(category: TechnologyCategory): Observable<TechnologyFilterConfiguration>;

  public abstract getFrameworkGroupingsData(frameworkId: string): Observable<CriteriaGroupingResponse[]>;

  public abstract getDefaultViewCombinationData(frameworkId: string): Observable<ClassificationViewCombinationResponse>;

  public abstract getViewsData(viewCombinationId: string): Observable<ClassificationViewResponse[]>;

  public abstract getViewGroupingsData(viewId: string): Observable<CriteriaGroupingResponse[]>;

  public abstract getInfoResources(): Observable<InfoResourceSection[]>;


}

