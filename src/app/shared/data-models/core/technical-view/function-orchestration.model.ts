import {WorkflowDefinition} from './workflow-definition.model';
import {CriterionValueModel} from '../../classification/criterion-value.model';

export class FunctionOrchestration {
    orchestratorName: string;
    workflowDef: WorkflowDefinition;
    conFlowDocs: CriterionValueModel;
    quotas: CriterionValueModel[];

    constructor(orchestratorName: string,
                workflowDef: WorkflowDefinition,
                conFlowDocs: CriterionValueModel,
                orchestratorQuotas: CriterionValueModel[]) {
        this.orchestratorName = orchestratorName;
        this.workflowDef = workflowDef;
        this.conFlowDocs = conFlowDocs;
        this.quotas = orchestratorQuotas;
    }
}
