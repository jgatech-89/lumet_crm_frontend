export { Navbar } from "./Navbar/components/Navbar";
export { Footer } from "./Footer/components/Footer";

// modal
export {
	CustomModal,
	ConfirmModal,
} from './modal';
export type {
	CustomModalProps,
	ConfirmModalProps,
} from './modal';

// cargando
export {
	LinearLoader,
	AppSkeleton,
	LoadingButton,
	FullPageSpinner,
} from './loading';
export type {
	LinearLoaderProps,
	AppSkeletonProps,
	LoadingButtonProps,
} from './loading';

// botones
export {
	CustomButton,
	ActionIconButton,
	BUTTON_PRESETS,
	getButtonPreset,
} from './buttons';
export type {
	ButtonPreset,
	ButtonPresetKey,
} from './buttons';
