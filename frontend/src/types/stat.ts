
export interface StatCardProps {
	icon: string;
	alt: string;
	bgMobile: string;
	bgDesktop: string;
	filterMobile: string;
	filterDesktop: string;
	title: string;
	value: string;
	valueClass: string;
	text: string;
	hrColor: string;
	textColor: string;
	isActive?: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}
