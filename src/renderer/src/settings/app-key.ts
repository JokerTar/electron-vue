/*
 * @Author: TRF
 * @Date: 2023-09-16 16:59:47
 * @LastEditors: TRF
 * @LastEditTime: 2023-09-18 09:28:59
 * @FilePath: \electron-vue\src\renderer\src\settings\app-key.ts
 * @Description:
 *
 */
/** 设备类型 */
export enum DeviceEnum {
	Mobile,
	Desktop,
}

/** 侧边栏打开状态常量 */
export const SIDEBAR_OPENED = 'opened';
/** 侧边栏关闭状态常量 */
export const SIDEBAR_CLOSED = 'closed';

export type SidebarOpened = typeof SIDEBAR_OPENED;
export type SidebarClosed = typeof SIDEBAR_CLOSED;

export const secretKey = 's39fbttba0fb3f2p';
