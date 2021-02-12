import {ClassificationScopeModel} from './classification-scope.model';

export interface FrameworkModel {
  id: string;
  name: string;
  description?: string;
  views?: Set<ClassificationScopeModel>;
}
