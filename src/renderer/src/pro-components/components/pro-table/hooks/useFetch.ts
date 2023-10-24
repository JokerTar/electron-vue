// import type { FetchConfig } from '../../../hooks/useFetch';
import { useFetch as commonFetch } from '../../../hooks/useFetch';
import type { TableProps } from '../src/table';

interface IResponse {
	// dataRef: Ref;
	reload: (fetchQuery?: Record<string, any>) => void;
	getData: () => any;
}

export function useFetch(props: TableProps): IResponse {
	// @ts-ignore
	const { reload, getData } = commonFetch(props.fetch);

	return { reload, getData };
}
