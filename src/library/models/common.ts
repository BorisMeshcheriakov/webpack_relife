export interface MenuItem {
	id: number;
	order: number;
	title: string;
	url: string;
	visible: true;
}

export interface PlatformSettings {
	exercices_library: boolean;
	upper_menu: MenuItem[];
}

export interface Settings {
	type: string;
	code: string;
	menu: string;
	order: number;
	library?: boolean;
}

export interface ModuleRead {
	id: number;
	permissions: string;
	settings: Settings;
	code: string;
	verbose_name: string;
}

export interface Scope {
	id: number;
	title: string;
}

export interface CommonSection {
	id: number;
	title: string;
	scope: Scope[];
}

export interface CommonTag {
	id: number;
	title: string;
	section: CommonSection;
}

export interface WebSettings {
	favicon: string | null;
	resource_name: string | null;
	logo: string | null;
	logo_url: string | null;
}

export interface CommonSettings {
	moderation: boolean;
	allow_coach_register: boolean;
	platform_domain: string | null;
}
