import {Value} from '../../shared/value.model';
import {WorkflowDefinition} from './workflow-definition.model';

export class FunctionOrchestration {
    orchestratorName: string;
    workflowDef: WorkflowDefinition;
    conFlowDocs: Value;
    quotas: Value[];

    constructor(orchestratorName: string,
                workflowDef: WorkflowDefinition,
                conFlowDocs: Value,
                orchestratorQuotas: Value[]) {
        this.orchestratorName = orchestratorName;
        this.workflowDef = workflowDef;
        this.conFlowDocs = conFlowDocs;
        this.quotas = orchestratorQuotas;
    }
}
