export function resolvePath(...paths: string[]): string {
	let resolvedPath = '';
	for (const path of paths) {
		resolvedPath = resolvedPath ? resolvedPath + '/' + path : path;
	}

	// 处理相对路径和绝对路径的情况
	if (!resolvedPath.startsWith('/')) {
		// 获取当前文件的位置（假设当前文件在 main 文件夹下）
		const currentPath = window.location.pathname.split('/').slice(0, -1).join('/');
		resolvedPath = currentPath + '/' + resolvedPath;
	}

	// 处理相对路径中的 '..'
	const resolvedParts: string[] = [];
	const pathParts = resolvedPath.split('/').filter((part) => part !== '');
	for (const part of pathParts) {
		if (part === '..') {
			resolvedParts.pop();
		} else {
			resolvedParts.push(part);
		}
	}

	return '/' + resolvedParts.join('/');
}
