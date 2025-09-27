export interface Trigger {
  id: number;
  name: string;
  description?: string;
  times_fired: number;
  created_at?: string;
  updated_at?: string;
  all_conditions: PartialCondition[];
  any_conditions: PartialCondition[];
  conditions?: PartialCondition[];
  actions?: PartialAction[];
}

export interface PartialAction {
  id: number | string;
  action_id: number;
  action_value: {
    [key: TriggerActionInputConfig['name']]: string | number;
  };
}

export interface PartialCondition {
  id: number | string;
  condition_id: number;
  value: string | number;
  operator_id: number;
  match_type: 'all' | 'any';
}

export interface TriggerAction {
  id: number;
  display_name: string;
  name: string;
  aborts_cycle: boolean;
  updates_ticket: boolean;
  input_config?: {
    inputs: TriggerActionInputConfig[];
  };
}

export interface TriggerActionInputConfig {
  name: string;
  display_name: string;
  type: 'select' | 'textarea' | 'text';
  placeholder?: string;
  default_value?: string | number;
  select_options?: 'ticket:status' | 'agent:id' | 'category:tags';
}

export interface TriggerCondition {
  id: number;
  name: string;
  type: string;
  operators: TriggerOperator[];
  input_config?: {
    type: 'select' | 'textarea' | 'text';
    operators: string[];
    static?: boolean;
    select_options?: 'string' | {name: string; value: string | number}[];
    default_value?: string | number;
    placeholder?: string;
  }[];
}

export interface TriggerOperator {
  id: number;
  name: string;
  display_name: string;
  type: string;
  value_type: string;
  value_placeholder?: string;
  validation_rules?: string;
}
