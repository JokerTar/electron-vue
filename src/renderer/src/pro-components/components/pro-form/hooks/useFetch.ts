import type { FetchConfig } from '../../../hooks/useFetch';
import type { FormSchema } from '../src/form';
import { useFetch as commonFetch } from '../../../hooks/useFetch';
import { set } from 'lodash-es';

export function useFetch(fetch: FetchConfig, schema: FormSchema) {
	console.log(fetch, schema);

	const { getData } = commonFetch(fetch);

	if (!fetch.to) {
		if (schema.props) {
			schema.props.options = getData();
		} else {
			schema.props = {
				options: getData(),
			};
		}
	} else {
		set(schema, fetch.to, getData());
	}

	return {};
}
