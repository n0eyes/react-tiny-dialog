# react-tiny-dialog

A Tiny, zero dependency dialog.

[![npm license](https://img.shields.io/npm/l/react-tiny-modal?style=flat-square)](https://github.com/Nfinished/react-tiny-modal/blob/master/LICENSE)
![requires react >=16.8](https://img.shields.io/npm/dependency-version/react-tiny-modal/peer/react?style=flat-square)

## Anatomy:

```tsx
import { Dialog } from 'react-tiny-dialog';

export default () => (
  <Dialog>
    <Dialog.Trigger />
    <Dialog.Portal>
      <Dialog.BackDrop />
      <Dialog.Content>
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog>
);
```

## API:

### Dialog

**Contains all the parts of a dialog.**

**defaultOpen** : `boolean`

The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.

**open** : `boolean`

The controlled open state of the dialog. Must be used in conjunction with `onOpenChange`.

**onOpenChange** : `function`

Event handler called when the open state of the dialog changes.

**scroll** : `boolean` | **default** : `false`

Prevent scroll when open the dialog.

---

### Trigger

**The button that opens the dialog.**

**asChild** : `boolean` | **default** : `false`

Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.

---

### Portal

**When used, portals your backdrop and content parts into the `body`.**

**container** : `HTMLElement` | **default** : `document.body`

Specify a container element to portal the content into.

---

### BackDrop

**A layer that covers the inert portion of the view when the dialog is open.**

**asChild** : `boolean` | **default** : `false`

Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.

---

### Content

**Contains content to be rendered in the open dialog.**

**asChild** : `boolean` | **default** : `false`

Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.

---

### Close

**The button that closes the dialog.**

**asChild** : `boolean` | **default** : `false`

Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.

---

## Usage:

```tsx
import { Dialog } from 'react-tiny-dialog';

export default function BankSelectDialog({
  onClick: selectBank,
}: BankSelectDialogProps) {
  return (
    <Dialog defaultOpen>
      <Dialog.Portal>
        <Dialog.BackDrop />
        <Dialog.Content asChild>
          <Styled.Content>
            {BANKS.map((bank) => (
              <Dialog.Close
                asChild
                key={bank.id}
                onClick={() => selectBank(bank)}>
                <Styled.Bank>
                  {bank.logo}
                  <Styled.BankLabel>{bank.label}</Styled.BankLabel>
                </Styled.Bank>
              </Dialog.Close>
            ))}
          </Styled.Content>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
```
