const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/20 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen w-full p-4">
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 md:p-5 space-y-4 max-h-[70vh] overflow-y-auto">
            {children}
            {/* <p>A</p>
                        <p>A</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>A</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>A</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
