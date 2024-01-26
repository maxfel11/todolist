import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { getColorOption, getTextColorOption } from "../../utils/getColorOption";

const TaskModal = ({ children, isModalOpen, toggleModal, modalTheme }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" onClose={() => toggleModal()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 z-50">
          <div className="relative flex min-h-full items-center justify-center p-6 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`flex flex-col w-full max-w-[35rem]  p-4 rounded-lg relative shadow-lg ${
                  theme === "light" ? "bg-white" : "bg-neutral-800"
                }`}
                style={{
                  background: getColorOption(modalTheme),
                  color: getTextColorOption(modalTheme),
                }}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TaskModal;
