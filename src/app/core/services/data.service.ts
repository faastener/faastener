import {Observable} from 'rxjs';
import {ClassificationFramework} from '../../shared/interfaces/classification';
import {TechnologyInfo, TechnologyDossier, TechnologyType} from '../../shared/interfaces/dossier';
import {TechnologyFilterConfiguration} from '../../shared/interfaces/filtering';
import {InfoResourceSection} from '../../shared/interfaces/info';

export abstract class DataService {

  protected constructor() {
  }

  public abstract getFrameworks(): Observable<ClassificationFramework[]>;

  public abstract getFrameworksForTechnologyType(technologyType: TechnologyType): Observable<ClassificationFramework[]>;

  public abstract getLatestFrameworkForTechnologyType(technologyType: TechnologyType): Observable<ClassificationFramework>;

  public abstract getDossiers(withReviewData: boolean): Observable<TechnologyDossier[]>;

  public abstract getDossiersForTechnologyType(technologyType: TechnologyType, withReviewData: boolean): Observable<TechnologyDossier[]>;

  public abstract getDossier(technologyId: string, withReviewData: boolean): Observable<TechnologyDossier>;

  public abstract getReviewedTechnologies(): Observable<TechnologyInfo[]>;

  public abstract getReviewedTechnologiesOfType(technologyType: TechnologyType): Observable<TechnologyInfo[]>;

  public abstract getTechnologyFilter(technologyType: TechnologyType): Observable<TechnologyFilterConfiguration>;

  public abstract getInfoResources(): Observable<InfoResourceSection[]>;
}

