import type {
	Direction,
	PaneOnCollapse,
	PaneOnExpand,
	PaneOnResize,
	PaneResizeHandleOnDragging,
} from "$lib/internal/types.js";
import type { PaneGroupStorage } from "$lib/internal/utils/storage.js";
import type { WithChild, Without } from "svelte-toolbelt";
import type { HTMLAttributes } from "svelte/elements";

type Primitive<T> = Omit<T, "id" | "children"> & { id?: string | undefined };

export type PrimitiveDivAttributes = Primitive<HTMLAttributes<HTMLDivElement>>;

export type PanePropsWithoutHTML = WithChild<{
	/**
	 * The size of the pane when it is in a collapsed state.
	 */
	collapsedSize?: number | undefined;

	/**
	 * Whether the pane can be collapsed.
	 *
	 * @defaultValue `false`
	 */
	collapsible?: boolean | undefined;

	/**
	 * The default size of the pane in percentage.
	 */
	defaultSize?: number | undefined;

	/**
	 * The maximum size of the pane in percentage of the group's size.
	 *
	 * @defaultValue `100`
	 */
	maxSize?: number | undefined;

	/**
	 * The minimum size of the pane in percentage of the group's size.
	 *
	 * @defaultValue `0`
	 */
	minSize?: number | undefined;

	/**
	 * The order of the pane in the group.
	 * Useful for maintaining order when conditionally rendering panes.
	 */
	order?: number | undefined;

	/**
	 * A callback that is called when the pane is collapsed.
	 */
	onCollapse?: PaneOnCollapse | undefined;

	/**
	 * A callback that is called when the pane is expanded.
	 */
	onExpand?: PaneOnExpand | undefined;

	/**
	 * A callback that is called when the pane is resized.
	 */
	onResize?: PaneOnResize | undefined;

	/**
	 * A callback that receives an imperative API for the pane. You can assign
	 * this to a variable to programmatically control the pane.
	 */
	setPaneApi?: (api: PaneAPI) => void;
}>;

export type PaneProps = PanePropsWithoutHTML &
	Without<PrimitiveDivAttributes, PanePropsWithoutHTML>;

export type PaneGroupPropsWithoutHTML = WithChild<{
	/**
	 * The id to save the layout of the panes to in local storage.
	 */
	autoSaveId?: string | null | undefined;

	/**
	 * The direction of the panes.
	 *
	 * @required
	 */
	direction: Direction;

	/**
	 * The id of the pane group DOM element.
	 */
	id?: string | null | undefined;

	/**
	 * The amount of space to add to the pane group when the keyboard
	 * resize event is triggered.
	 */
	keyboardResizeBy?: number | null | undefined;

	/**
	 * A callback called when the layout of the panes within the group changes.
	 */
	onLayoutChange?: (layout: number[]) => void | null | undefined;

	/**
	 * The storage object to use for saving the layout of the panes in the group.
	 */
	storage?: PaneGroupStorage | undefined;

	/**
	 * A callback that receives an imperative API for the pane group. You can assign
	 * this to a variable to programmatically control the pane group.
	 */
	setPaneGroupApi?: (api: PaneGroupAPI) => void;
}>;

export type PaneGroupProps = PaneGroupPropsWithoutHTML &
	Without<PrimitiveDivAttributes, PaneGroupPropsWithoutHTML>;

export type PaneResizerPropsWithoutHTML = WithChild<{
	/**
	 * Whether the resize handle is disabled.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean;

	/**
	 * A callback that is called when the resize handle is being dragged.
	 */
	onDraggingChange?: PaneResizeHandleOnDragging;

	/**
	 * The tabIndex of the resize handle.
	 */
	tabIndex?: number;
}>;

export type PaneResizerProps = PaneResizerPropsWithoutHTML &
	Without<PrimitiveDivAttributes, PaneResizerPropsWithoutHTML>;

export type PaneAPI = {
	/* Collapse the panee to its minimum size */
	collapse: () => void;
	/* Expand the pane to its previous size */
	expand: () => void;
	/* Get the pane's id */
	getId: () => string;
	/** Get the panes size */
	getSize: () => number;
	/** Check if the pane is collapsed */
	isCollapsed: () => boolean;
	/** Check if the pane is expanded */
	isExpanded: () => boolean;
	/** Resize the pane to the specified size */
	resize: (size: number) => void;
};

export type PaneGroupAPI = {
	/** Get the ID of the PaneGroup */
	getId: () => string;
	/** Get the layout of the PaneGroup */
	getLayout: () => number[];
	/** Set the layout of the PaneGroup */
	setLayout: (layout: number[]) => void;
};

/**
 * Data attributes applied to the element rendered by
 * the [Pane](https://paneforge.com/docs/components/pane) component.
 */
export type PaneAttributes = {
	/** Applied to every pane element. */
	"data-pane": string;
	/** The ID of the pane. */
	"data-pane-id": string;
	/** The ID of the pane's group. */
	"data-pane-group-id": string;
};

export type PaneGroupAttributes = {
	/** Applied to every pane group element. */
	"data-pane-group": string;
	/** The direction of the pane group. */
	"data-direction": Direction;
	/** The ID of the pane group. */
	"data-pane-group-id": string;
};

export type PaneResizerAttributes = {
	/** Applied to all resizer elements */
	"data-pane-resizer": string;
	/** The direction of the pane group the resize handle belongs to. */
	"data-direction": Direction;
	/** The ID of the pane group the resize handle belongs to. */
	"data-pane-group-id": string;
	/** Whether the resize handle is active or not. */
	"data-active"?: "pointer" | "keyboard";
	/** Whether the resize handle is enabled or not. */
	"data-enabled"?: boolean;
	/** The ID of the resize handle. */
	"data-pane-resizer-id": string;
};
