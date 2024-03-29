import { Fragment } from "react";
import { XIcon } from "~/assets/icons";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({
  children,
  onClose,
  open,
}: React.PropsWithChildren<{
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}>) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={onClose}>
      <Transition.Child
        as="div"
        enter="duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-200 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="duration-300 ease-out"
            enterFrom="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
            enterTo="translate-y-0 opacity-100 sm:scale-100"
            leave="duration-200 ease-in"
            leaveFrom="translate-y-0 opacity-100 sm:scale-100"
            leaveTo="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 px-4 pb-4 pt-5 transition-all sm:my-8 sm:w-full sm:max-w-screen-lg sm:p-6">
              <div className="absolute right-0 top-0 hidden pr-2.5 pt-2.5 sm:block">
                <button
                  type="button"
                  className="rounded-lg bg-neutral-900 text-neutral-400 transition hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-700"
                  onClick={() => onClose(false)}
                >
                  <XIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                    role="img"
                    aria-label="Close"
                  />
                </button>
              </div>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);

const { Title: ModalTitle, Description: ModalDescription } = Dialog;

export { Modal, ModalTitle, ModalDescription };
