import React, {
  createContext,
  InputHTMLAttributes,
  PropsWithChildren,
  useEffect,
} from 'react';
import { DialogProps } from '../components/Dialog.type';
import useContextInScope from '../hooks/useContextInScope';
import useDialog from '../hooks/useDialog';
import { preventScroll } from '../utils/dom';

interface DialogContext extends InputHTMLAttributes<HTMLDivElement> {
  isOpened: boolean;
  inScope: boolean;
  openHandler(): void;
}

interface DialogProviderProps {
  value: DialogProps;
}

const DialogContext = createContext<DialogContext>({
  isOpened: false,
  inScope: false,
  openHandler() {},
});

DialogContext.displayName = 'Dialog';

export const useDialogContext = () => useContextInScope(DialogContext);

export default function DialogProvider(
  props: PropsWithChildren<DialogProviderProps>
) {
  const {
    value: { open, defaultOpen, scroll = false, onOpenChange },
    children,
  } = props;
  const { isOpened, openDialog, closeDialog } = useDialog(open ?? defaultOpen);

  const composedDialogState = open ?? isOpened;

  const openHandler = () => {
    isOpened ? closeDialog() : openDialog();
  };

  useEffect(() => {
    if (!scroll) preventScroll(composedDialogState);
  }, [scroll, composedDialogState]);

  useEffect(() => {
    onOpenChange?.(isOpened);
  }, [isOpened]);

  return (
    <DialogContext.Provider
      value={{
        isOpened: composedDialogState,
        inScope: true,
        openHandler,
      }}>
      {children}
    </DialogContext.Provider>
  );
}
