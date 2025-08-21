'use client';
/* eslint-disable */
// @ts-nocheck
import { Button } from '@repo/shadcn/button';
import { cn } from '@repo/shadcn/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/shadcn/popover';
import { ScrollArea } from '@repo/shadcn/scroll-area';
import { Separator } from '@repo/shadcn/separator';
import { useToolbar } from '@repo/shadcn/tiptap/toolbars/toolbar-provider';
import type { Extension } from '@tiptap/core';
import type { ColorOptions } from '@tiptap/extension-color';
import type { HighlightOptions } from '@tiptap/extension-highlight';
import { CheckIcon, PaintbrushVertical } from 'lucide-react';

type TextStylingExtensions =
  | Extension<ColorOptions, any>
  | Extension<HighlightOptions, any>;

const TEXT_COLORS = [
  { name: 'Default', color: 'var(--editor-text-default)' },
  { name: 'Gray', color: 'var(--editor-text-gray)' },
  { name: 'Brown', color: 'var(--editor-text-brown)' },
  { name: 'Orange', color: 'var(--editor-text-orange)' },
  { name: 'Yellow', color: 'var(--editor-text-yellow)' },
  { name: 'Green', color: 'var(--editor-text-green)' },
  { name: 'Blue', color: 'var(--editor-text-blue)' },
  { name: 'Purple', color: 'var(--editor-text-purple)' },
  { name: 'Pink', color: 'var(--editor-text-pink)' },
  { name: 'Red', color: 'var(--editor-text-red)' },
];

const HIGHLIGHT_COLORS = [
  { name: 'Default', color: 'var(--editor-highlight-default)' },
  { name: 'Gray', color: 'var(--editor-highlight-gray)' },
  { name: 'Brown', color: 'var(--editor-highlight-brown)' },
  { name: 'Orange', color: 'var(--editor-highlight-orange)' },
  { name: 'Yellow', color: 'var(--editor-highlight-yellow)' },
  { name: 'Green', color: 'var(--editor-highlight-green)' },
  { name: 'Blue', color: 'var(--editor-highlight-blue)' },
  { name: 'Purple', color: 'var(--editor-highlight-purple)' },
  { name: 'Pink', color: 'var(--editor-highlight-pink)' },
  { name: 'Red', color: 'var(--editor-highlight-red)' },
];

interface ColorHighlightButtonProps {
  name: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
  isHighlight?: boolean;
}

const ColorHighlightButton = ({
  name,
  color,
  isActive,
  onClick,
  isHighlight,
}: ColorHighlightButtonProps) => (
  <button
    onClick={onClick}
    className="flex w-full items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-gray-3"
    type="button"
  >
    <div className="flex items-center space-x-2">
      <div
        className="rounded-sm border px-1 py-px font-medium"
        style={isHighlight ? { backgroundColor: color } : { color }}
      >
        A
      </div>
      <span>{name}</span>
    </div>
    {isActive && <CheckIcon className="size-4" />}
  </button>
);

export const ColorHighlightToolbar = () => {
  const { editor } = useToolbar();

  const currentColor =
    editor?.getAttributes('textStyle').color ?? 'var(--editor-text-default)';
  const currentHighlight =
    editor?.getAttributes('highlight').color ??
    'var(--editor-highlight-default)';

  const handleSetColor = (color: string) => {
    editor
      ?.chain()
      .focus()
      .setColor(color === currentColor ? 'var(--editor-text-default)' : color)
      .run();
  };

  const handleSetHighlight = (color: string) => {
    editor
      ?.chain()
      .focus()
      .setHighlight(
        color === currentHighlight
          ? { color: 'var(--editor-highlight-default)' }
          : { color },
      )
      .run();
  };

  const isDisabled =
    !editor?.can().chain()?.setHighlight().run() ||
    !editor?.can().chain()?.setColor('').run();

  return (
    <Popover>
      <div className="relative h-full">
        <PopoverTrigger disabled={isDisabled} asChild>
          <Button
            variant="ghost"
            size="icon"
            style={{
              color: currentColor,
            }}
            className={cn('h-8 w-8 p-0 sm:h-9 sm:w-9')}
          >
            <PaintbrushVertical
              className="size-4"
              style={{
                backgroundColor: currentHighlight,
                color: currentColor,
              }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-56 p-1 dark:bg-gray-2">
          <ScrollArea className="max-h-80 overflow-y-auto pr-2">
            <div className="mb-2.5 mt-2 px-2 text-xs text-gray-11">Color</div>
            {TEXT_COLORS.map(({ name, color }) => (
              <ColorHighlightButton
                key={name}
                name={name}
                color={color}
                isActive={currentColor === color}
                onClick={() => handleSetColor(color)}
              />
            ))}

            <Separator className="my-3" />

            <div className="mb-2.5 w-full px-2 pr-3 text-xs text-gray-11">
              Background
            </div>
            {HIGHLIGHT_COLORS.map(({ name, color }) => (
              <ColorHighlightButton
                key={name}
                name={name}
                color={color}
                isActive={currentHighlight === color}
                onClick={() => handleSetHighlight(color)}
                isHighlight
              />
            ))}
          </ScrollArea>
        </PopoverContent>
      </div>
    </Popover>
  );
};
