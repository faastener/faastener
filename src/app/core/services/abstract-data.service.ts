import {Observable} from 'rxjs';
import {ClassificationFramework} from '../../shared/interfaces/classification';
import {Technology, TechnologyType} from '../../shared/interfaces/technology';
import {InfoResourceSection} from '../../shared/interfaces/info';
import {TechnologyFilterConfiguration} from "../../shared/interfaces/filtering";

export abstract class AbstractDataService {
  protected constructor() {
  }

  public abstract getFrameworks(): Observable<ClassificationFramework[]>;

  public abstract getFrameworksForTechnologyType(technologyType: TechnologyType): Observable<ClassificationFramework[]>;

  public abstract getLatestFrameworkForTechnologyType(technologyType: TechnologyType): Observable<ClassificationFramework>;

  public abstract getTechnologies(): Observable<Technology[]>;

  public abstract getTechnology(technologyId: string): Observable<Technology>;

  public abstract getTechnologiesOfType(technologyType: TechnologyType): Observable<Technology[]>;

  /* public abstract getDossiers(withReviewData: boolean): Observable<TechnologyDossier[]>;

   public abstract getDossiersForTechnologyType(technologyType: TechnologyType, withReviewData: boolean): Observable<TechnologyDossier[]>;

   public abstract getDossier(technologyId: string, withReviewData: boolean): Observable<TechnologyDossier | undefined>;

   public abstract getReviewedTechnologies(): Observable<TechnologyInfo[]>;

   public abstract getReviewedTechnologiesOfType(technologyType: TechnologyType): Observable<TechnologyInfo[]>;*/

   public abstract getTechnologyFilter(technologyType: TechnologyType): Observable<TechnologyFilterConfiguration>;

  public abstract getInfoResources(): Observable<InfoResourceSection[]>;
}

