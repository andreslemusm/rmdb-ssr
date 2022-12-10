import { Fragment } from "react";
import { X } from "lucide-react";
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
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 px-4 pt-5 pb-4 transition-all sm:my-8 sm:w-full sm:max-w-screen-lg sm:p-6">
              <div className="absolute top-0 right-0 hidden pt-2.5 pr-2.5 sm:block">
                <button
                  type="button"
                  className="rounded-lg bg-neutral-900 text-neutral-400 transition hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-700"
                  onClick={() => onClose(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
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
