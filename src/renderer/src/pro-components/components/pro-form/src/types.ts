import type { FormProps } from './form';
import type { FormItemProps } from './form-item';

export type FormContext = FormProps & {
	// addField: (field: string) => void
};

export interface FormItemContext extends FormItemProps {
	hasLabel: boolean;
}
